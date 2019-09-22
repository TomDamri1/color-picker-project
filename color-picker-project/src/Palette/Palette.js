import React, { Component } from 'react'
import ColorBox from '../ColorBox/ColorBox';
import NavBar from '../Navbar/Navbar';
import './Palette.css';




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
        const colorBoxes = this.props.palette.colors[this.state.level].map(color =>(
            <ColorBox background={color[this.state.format]} name={color.name} key={color.id}/>
        ))
        return (
            <div className="Palette">
                <NavBar level={this.state.level} changeLevel={this.changeLevel} handleChange={this.chagneFormt}/>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                <footer className='Palette-footer'>
                    {this.props.palette.paletteName}
                    <span className='emoji'>{this.props.palette.emoji}</span>
                </footer>
            </div>
        )
    }
}

export default Palette;
