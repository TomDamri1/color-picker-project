import React, { Component } from 'react'
import Slider from 'rc-slider';
import ColorBox from '../ColorBox/ColorBox';
import 'rc-slider/assets/index.css';
import './Palette.css';




export class Palette extends Component {
    constructor(props){
        super(props);
        this.state = {
            level : 500,
        }
        this.changeLevel=this.changeLevel.bind(this);
    }

    changeLevel(newLevel){
        this.setState({level : newLevel});
    }
    render() {
        const colorBoxes = this.props.palette.colors[this.state.level].map(color =>(
            <ColorBox background={color.hex} name={color.name}/>
        ))
        return (
            <div className="Palette">
                {/*NavBar here*/}
                <h1>Palette</h1>
                <div className='slider'>
                    <Slider 
                    step={100}
                    defaultValue={this.state.level} 
                    min={100} max={900}
                    onAfterChange={this.changeLevel}/>
                </div>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                {/*footer here*/}
            </div>
        )
    }
}

export default Palette
