let Config = {
    baseURL: 'https://www.ebi.ac.uk/chembl/api/utils', // APi URL
    smiles2ctab: '/smiles2ctab', // method name for smiles to ctab conversion
    ctab2xyz: '/ctab2xyz', // method name for ctab to xyz conversion
    parseError: 'Problem parsing input file.' // message when the FileReader APi is unable to parse the file
    invalidFiletypeError: 'Sorry, we only accept .txt or .smi files :)', // message when a user selects a non .txt or .smi file
    invalidFileContentError: 'Invalid File. The text file should contain a single line with a single string :)',  // message if the file is empty or contains more than one line
    dropboxText: `Try dropping a SMILES text file here, or click inside the box to browse your file.
    (.smi and .txt files are supported)` // DropBox text 
}

export default Config 