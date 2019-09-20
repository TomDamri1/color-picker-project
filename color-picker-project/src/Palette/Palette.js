import React, { Component } from 'react'
import ColorBox from '../ColorBox/ColorBox';
import './Palette.css';

export class Palette extends Component {
    render() {
        return (
            <div className="Palette">
                {/*NavBar here*/}
                <h1>Palette</h1>
                <div className="Palette-colors">
                    {
                        this.props.colors.map(color =>(
                            <ColorBox background={color.color} name={color.name} key={`${color.name}${color.color}`}/>
                        ))
                    }
                </div>
                {/*footer here*/}
            </div>
        )
    }
}

export default Palette
