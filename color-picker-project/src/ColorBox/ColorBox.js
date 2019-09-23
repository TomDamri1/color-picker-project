import React, { Component } from 'react'
import './ColorBox.css'
import {Link} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';

export class ColorBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            copied: false,
        }
        this.changeCopyState= this.changeCopyState.bind(this);
    }
    changeCopyState(){
        this.setState({copied : true} , ()=> {
        setTimeout(() => {
            this.setState({copied : false})
        }, 1000)})
    
    }
    
    render() {
        const {name , background } = this.props
        return (
            <CopyToClipboard 
            text={this.props.background}
            onCopy={this.changeCopyState}>
            <div className="ColorBox" style={{backgroundColor :background}}>
                <div style={{backgroundColor :background}} className={`copy-overlay ${this.state.copied && 'show' }`}/>
                <div className={`copy-msg ${this.state.copied && 'show' }`}>
                    <h1>Copied!</h1>
                    <p>{name} , {this.props.background} </p>
                </div>

                <div className="copy-container">
                    <div className="box-content">
                        <span>{name}</span>
                    </div>
                   <button className="copy-button">Copy!</button>
                </div>
                {this.props.showLink && (
                <Link to={`/palette/${this.props.paletteId}/${this.props.id}`} onClick={e => e.stopPropagation()}>
                    <span className="see-more">More</span>
                </Link>
                )}
            </div>
            </CopyToClipboard>
        )
    }

}

export default ColorBox
