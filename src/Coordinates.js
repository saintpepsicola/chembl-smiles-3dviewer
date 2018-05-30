import React, { Component } from 'react'
import Store from './Store'
import { observer } from 'mobx-react'
import { Col } from 'react-flexbox-grid'

// XYZ Coordinates View
@observer
class Coordinates extends Component {
    render() {
        return (
            <Col xs={6} className='xyzcoords'>
                <h2>XYZ Coordinates</h2>
                {/* p has the css styles to select all and to cater for newlines when rendering */}
                <p>{Store.xyzCoords}</p>
            </Col>
        )
    }
}

export default Coordinates
