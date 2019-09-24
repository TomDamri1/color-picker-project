import React, { Component } from 'react'
import ColorBox from '../ColorBox/ColorBox';
import Navbar from '../Navbar/Navbar';
import {Link} from 'react-router-dom'
import PaletteFotter from '../PaletteFooter/PaletteFotter';

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
        const colorBoxes= this._shades.map(color=>
            <ColorBox 
            key={color.name} 
            name={color.name} 
            background={color[format]} 
            showingFullPalette={false}
            />)
        return (
            <div className='SingleColorPalette Palette'>
                <Navbar dontShowSlider={true} handleChange={this.chagneFormt}/>
                <div className='Palette-colors'>
                    {colorBoxes}
                    <div className="go-back ColorBox">
                        <Link to={`/palette/${id}`} className='back-button'>go back</Link>
                    </div>
                </div>   
                <PaletteFotter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default SingleColorPalette
