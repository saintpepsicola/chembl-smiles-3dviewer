import React, { Component } from 'react'
import Store from './Store'
import { observer } from 'mobx-react'
import { Col } from 'react-flexbox-grid'

// 3D Model View
@observer
class CompoundModel extends Component {
    render() {
        return (
            // We keep it hidden until we have the xyz coordinates
            <Col xs={6} style={{ 'display': Store.xyzCoords !== '' ? "block" : 'none' }} className='renderSection'>
                {/* Speck Library has an event listener on this button */}
                <button id="render-button">Render 3D Model</button>
                <div id="render-container">
                    <canvas data={Store.xyzCoords} id="renderer-canvas"></canvas>
                </div>
            </Col>
        )
    }
}

export default CompoundModel
