import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import {withStyles} from '@material-ui/styles';
import styles from '../../Styles/ColorBoxStyles';

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
        const {name , background , classes} = this.props;
        const isLightColor = chroma(background).luminance() >= 0.4;
        return (
            <CopyToClipboard 
            text={this.props.background}
            onCopy={this.changeCopyState}>
            <div className={classes.ColorBox} style={{backgroundColor :background}}>
                <div 
                    style={{backgroundColor :background}} 
                    className={`
                        ${classes.copyOverlay} 
                        ${this.state.copied && classes.showOverlay }
                    `}/>
                <div className={`${classes.copyMessage} ${this.state.copied && classes.showCopyMessage }`}>
                    <h1 className={isLightColor ? 'dark-text' : undefined}>Copied!</h1>
                    <p className={classes.copyText}>{name} , {this.props.background} </p>
                </div>

                <div>
                    <div className={classes.boxContent}>
                        <span className={classes.colorName}>{name}</span>
                    </div>
                   <button className={classes.copyButton}>Copy!</button>
                </div>
                {this.props.showingFullPalette && (
                <Link to={`/palette/${this.props.paletteId}/${this.props.id}`} onClick={e => e.stopPropagation()}>
                    <span className={classes.seeMore}>More</span>
                </Link>
                )}
            </div>
            </CopyToClipboard>
        )
    }

}

export default withStyles(styles)(ColorBox);
