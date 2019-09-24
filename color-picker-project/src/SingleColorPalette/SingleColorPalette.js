import React, { Component } from 'react'
import ColorBox from '../ColorBox/ColorBox';
import Navbar from '../Navbar/Navbar';
import {Link} from 'react-router-dom'
import PaletteFooter from '../PaletteFooter/PaletteFooter';
import {withStyles} from '@material-ui/styles';
import styles from '../Styles/SingleColorPaletteStyles';
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
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);
