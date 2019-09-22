import React, { Component } from 'react'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Navbar.css';
export class Navbar extends Component {
    render() {
        return (
            <header className="Navbar">
                <div className="logo">
                    <a href="#"><i class="fas fa-palette"></i>Color Picker</a>
                </div>
                <div className='slider-container'>
                    <span>Level: {this.props.level}</span>
                    <div className="slider">
                        <Slider 
                        step={100}
                        defaultValue={this.props.level} 
                        min={100} max={900}
                        onAfterChange={this.props.changeLevel}/>
                    </div>
                </div>
            </header>
        )
    }
}

export default Navbar
