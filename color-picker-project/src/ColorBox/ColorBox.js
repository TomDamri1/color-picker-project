import React, { Component } from 'react'
import './ColorBox.css'
export class ColorBox extends Component {
    render() {
        return (
            <div 
            className="ColorBox" 
            style={{backgroundColor : this.props.background}}>
                <div className="copy-container">
                    <div className="box-content">
                        <span>{this.props.name}</span>
                    </div>
                    <button className="copy-button">Copy!</button>
                </div>
                <span className="see-more">More</span>
            </div>
        )
    }
}

export default ColorBox
