import React, { Component } from 'react'
import ColorBox from '../ColorBox/ColorBox';
import NavBar from '../Navbar/Navbar';
import './Palette.css';
import PaletteFotter from '../PaletteFooter/PaletteFotter';
import { withStyles } from '@material-ui/core';

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
}




export class Palette extends Component {
    constructor(props){
        super(props);
        this.state = {
            level : 500,
            format : 'hex'
        }
        this.changeLevel=this.changeLevel.bind(this);
        this.chagneFormt=this.chagneFormt.bind(this);
    }
    chagneFormt(e){
        this.setState({format : e})
    }
    changeLevel(newLevel){
        this.setState({level : newLevel});
    }
  
    render() {
        const {colors , paletteName , emoji , id } = this.props.palette;
        const {classes} = this.props;
        const colorBoxes = colors[this.state.level].map(color =>(
            <ColorBox 
            background={color[this.state.format]} 
            name={color.name} 
            key={color.id}
            id={color.id}
            paletteId={this.props.palette.id}
            showingFullPalette={true}/>
        ))
        return (
            <div className={classes.Palette}>
                <NavBar 
                    level={this.state.level} 
                    changeLevel={this.changeLevel} 
                    handleChange={this.chagneFormt}/>
                <div className={classes.colors}>
                    {colorBoxes}
                </div>
                <PaletteFotter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default withStyles(styles)(Palette);
