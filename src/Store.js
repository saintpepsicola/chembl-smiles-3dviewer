import { observable, action } from 'mobx';
import axios from 'axios'
import Config from './Config'

// Setting API Config
axios.defaults.baseURL = Config.baseURL

class Store {

    // JS Decorators are supported thanks to a babel plugin (proposed for the next version of Javascript)
    // It will automatically take care of them when decorators come to native javascript
    @observable xyzCoords = ''
    @observable loading = false
    @observable smiles = ''


    @action async handleUpload(file) {
        try {

            // Read the file
            let fileContents = await this.readUploadedFile(file)
            // Remove whitespace from the beginning and/or end of the file string
            fileContents = fileContents.trim()

            // Check if the file contents are valid - Single line and not empty
            if (fileContents.length === 0 || fileContents.match(/\n/g)) {
                // Let the user know about the file being invalid
                this.handleError(Config.invalidFileContentError)
            }
            else {
                // File is valid so we'll output the contents to the console as described in the assignment
                console.log(fileContents)

                // Reset xyzCoords on a new request so that 3D Model Viewer and the XYZ Coordinates get hidden on a new request
                this.xyzCoords = ''

                // Store file contents in the Store
                this.smiles = fileContents

                // Begin conversion of smiles to xyz coordinates 
                this.smiles2xyz()
            }
        } catch (e) {
            this.handleError(e.message)
        }
    }

    @action async smiles2xyz() {
        // Get XYZ Coordinates using the ChEMBL API
        // To get the XYZ Coordinates we'll first have to convert SMILES to CTAB because I wasn't able to find a SMILES to XYZ method in the API

        // Let the app know that we're in the middle of a request
        // Tis will show us the loading spinner and disable our dropbox from accepting new files
        this.loading = true

        // SMILES to CTAB
        let ctab = await this.sendRequest(this.smiles, Config.smiles2ctab)

        // Now, we can convert from CTAB to XYZ
        // CTAB to XYZ
        let xyzCoords
        if (ctab)
            xyzCoords = await this.sendRequest(ctab, Config.ctab2xyz)
        if (xyzCoords) {
            this.xyzCoords = xyzCoords
            this.loading = false
        }

    }

    // Returns a Promise after reading the file
    readUploadedFile(file) {

        // FileReader API - IE10+
        const reader = new FileReader()

        return new Promise((resolve, reject) => {
            reader.onerror = () => {
                reader.abort()
                reject(new DOMException(Config.parseError))
            }

            reader.onload = () => {
                resolve(reader.result)
            }
            reader.readAsBinaryString(file)
        })

    }


    // We're using the axios library to handle HTTP requests
    // https://github.com/axios/axios
    async sendRequest(data, method) {
        try {
            const response = await axios.post(`${method}`, data, {
                mode: 'no-cors'
            })
            if (response.data) {
                return response.data
            }
            else {
                this.handleError('No data returned. Please ensure the accuracy of your file')
            }
        } catch (error) {
            this.handleError(error)
        }
    }

    // Handle Errors
    // Can improve this a lot depending on what we want to do programmatically and UX way
    @action handleError(msg) {
        this.loading = false
        alert(msg)
    }

}

export default new Store()