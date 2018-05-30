import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Coordinates from './Coordinates'
import CompoundModel from './CompoundModel'
import { observer } from 'mobx-react'
import Store from './Store'
import { Row, Col } from 'react-flexbox-grid'
import { RingLoader } from 'react-spinners'
import Config from './Config'

@observer
class App extends Component {

  // Handle a file drop/select
  async onDrop(acceptedFile, rejectedFile) {
    // acceptedFile is the file with the correct type of 'text/plain' or '.smi' extension
    // rejectedFile are all other file types

    // If the user uploads a 'rejectedFile' (wrong file type) we stop and let them know!
    if (rejectedFile.length !== 0) {
      Store.handleError(Config.invalidFiletypeError)
      return
    }
    else {
      // Proceed with handling/validating the upload
      Store.handleUpload(acceptedFile[0])
    }

  }

  render() {

    return (
      <div className="App">

        {/* Our App Title */}
        <Row center="xs">
          <h1>3D Compound Model Viewer</h1>
        </Row>

        {/* The Drag and Drop File Selector */}
        <Row>
          <Col xs={12}>
            <Row center="xs">
              {/* Allows plain .txt files or .smi files. Gets diabled when we are in the middle of an operation. Doesn't allow multiple files to upload at the same time */}
              <Dropzone className="dropzone" accept='text/plain, .smi' disabled={Store.loading} multiple={false} onDrop={this.onDrop.bind(this)}>
                <p> {Store.loading ? 'Processing..' : Config.dropboxText} </p>
              </Dropzone>
            </Row>
          </Col>
        </Row>

        {/* Loading SVG during API calls*/}
        <Row center="xs">
          <RingLoader color={'#2E4053'} loading={Store.loading} />
        </Row>


        <Row center="xs">
          {/* Outputs the 3D Model Box */}
          <CompoundModel />
          {/* Outputs the XYZ Coordinates */}
          {Store.xyzCoords !== '' && <Coordinates />}
        </Row>

      </div>
    )
  }
}

export default App
