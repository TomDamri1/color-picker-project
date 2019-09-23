import React, { Component } from 'react'
import ColorBox from '../ColorBox/ColorBox';
import Navbar from '../Navbar/Navbar';

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
        const colorBoxes= this._shades.map(color=>
            <ColorBox 
            key={color.name} 
            name={color.name} 
            background={color[format]} 
            showLink={false}
            />)
        return (
            <div className='Palette'>
                <Navbar dontShowSlider={true} handleChange={this.chagneFormt}/>
                <div className='Palette-colors'>{colorBoxes}</div>   
            </div>
        )
    }
}

export default SingleColorPalette
