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
            opacity : '1',
            transition: '0.5s',
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
    boxContent:{
        position: 'absolute',
        width: '100%',
        bottom: '0px',
        padding : '10px',
        color:'black',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        fontSize: '12px',
    },
    copyOverlay:{
        opacity: '0',
        zIndex: '0',
        width: '100%',
        height:' 100%',
        transition: 'transform 0.6s ease-in-out',
        transform: 'scale(0.1)',
    },
    showOverlay:{
        opacity: '1',
        transform: 'scale(50)',
        zIndex: '10',
        position: 'absolute',
    },
    copyMessage:{
        flexDirection: 'column',
        position: 'fixed',
        left: '0', 
        right: '0',
        bottom: '0',
        top: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '4rem',
        transform: 'scale(0.1)',
        opacity: '0',
        color: 'white',
        '& p' :{
            fontSize: '2rem',
            fontWeight: '100',
        },
        '& h1' :{
            textAlign: 'center',
            textShadow: '1px 2px black',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            width: '100%',
            textTransform: 'uppercase',
        }
    },
    showCopyMessage:{
        opacity: '1',
        transform: 'scale(1)',
        zIndex: '11',
        transition: 'all 0.4s ease-in-out',
        transitionDelay: '0.1s',
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
                <div style={{backgroundColor :background}} className={`${classes.copyOverlay} ${this.state.copied && classes.showOverlay }`}/>
                <div className={`${classes.copyMessage} ${this.state.copied && classes.showCopyMessage }`}>
                    <h1 className={isLightColor && 'dark-text'}>Copied!</h1>
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
