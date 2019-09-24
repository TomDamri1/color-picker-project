import React, { Component } from 'react'
import './ColorBox.css'
import {Link} from 'react-router-dom';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import chroma from 'chroma-js';
import {withStyles} from '@material-ui/styles';

const myblack = 'rgba(0,0,0,0.7)'
const styles={
    ColorBox :{
        width: "20%",
        height: props => (props.showingFullPalette ? "25%" : "50%"),
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        "&:hover button":{
            opacity : 1,
        },
    },
    copyText:{
        color: props => chroma(props.background).luminance() >= 0.6 ? myblack : 'white'  ,
    },
    colorName:{
        color: props => chroma(props.background).luminance() <=0.1 ? 'white' : 'black',
    },
    seeMore: {
        color : props => chroma(props.background).luminance() >= 0.6 ? myblack : 'white',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        position: "absolute",
        border: "none",
        right : "0px",
        bottom: "0px",
        textTransform: "uppercase",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
    },
    copyButton:{
        color: props => chroma(props.background).luminance() >= 0.7 ? myblack : 'white' ,
        width : "100px",
        height: "30px",
        position: "absolute",
        display : "inline-block",
        top : "50%",
        left: "50%",
        marginLeft: "-50px",
        marginTop:" -15px",
        textAlign: "center",
        outline: "none",
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        fontSize: "1rem",
        lineHeight: "30px",
        textTransform: "uppercase",
        border: "none",
        cursor: "pointer",
        textDecoration: "none",
        opacity : '0',
    },
}

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
        const isDarkColor = chroma(background).luminance() <= 0.06;
        const isLightColor = chroma(background).luminance() >= 0.4;
        return (
            <CopyToClipboard 
            text={this.props.background}
            onCopy={this.changeCopyState}>
            <div className={classes.ColorBox} style={{backgroundColor :background}}>
                <div style={{backgroundColor :background}} className={`copy-overlay ${this.state.copied && 'show' }`}/>
                <div className={`copy-msg ${this.state.copied && 'show' }`}>
                    <h1 className={isLightColor && 'dark-text'}>Copied!</h1>
                    <p className={classes.copyText}>{name} , {this.props.background} </p>
                </div>

                <div className="copy-container">
                    <div className="box-content">
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
