import React, { Component } from 'react'
import ColorBox from '../ColorBox/ColorBox';
import Navbar from '../Navbar/Navbar';
import {Link} from 'react-router-dom'
import PaletteFotter from '../PaletteFooter/PaletteFotter';
import {withStyles} from '@material-ui/styles';

const styles= {
    Palette:{
        height: '97vh',
        width: '98.9vw',
        display: 'flex',
        flexDirection: 'column',
    },
    colors:{
        height: '90%',
    },
    goBack:{
        width: "20%",
        height: "50%",
        margin: "0 auto",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        marginBottom: "-3.5px",
        backgroundColor : 'black',
        position: 'relative',
        '& a':{
            color:'white' ,
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
        },
    },
}


export class SingleColorPalette extends Component {
    constructor(props){
        super(props);
        this._shades = this.gatherShades(this.props.palette , this.props.colorId);
        this.state = {
            format: 'hex'
        }
        this.chagneFormt = this.chagneFormt.bind(this);
    }
    gatherShades(palette , colorToFilterBy){
        let shades=[];
        let allColors = palette.colors;
        for(let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        return shades.slice(1);
    }
    chagneFormt(e){
        this.setState({format : e})
    }
    render() {
        const format = this.state.format;
        const {paletteName , emoji , id} = this.props.palette;
        const {classes} = this.props;
        const colorBoxes= this._shades.map(color=>
            <ColorBox 
            key={color.name} 
            name={color.name} 
            background={color[format]} 
            showingFullPalette={false}
            />)
        return (
            <div className={classes.Palette}>
                <Navbar dontShowSlider={true} handleChange={this.chagneFormt}/>
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`} className='back-button'>go back</Link>
                    </div>
                </div>   
                <PaletteFotter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);
