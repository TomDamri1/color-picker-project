import React, { Component } from 'react'
import './ColorBox.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';

export class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            copied: false,
        }
    }
    render() {
        return (
            <CopyToClipboard 
            text={this.props.background}>
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
            </CopyToClipboard>
        )
    }
}

export default ColorBox
