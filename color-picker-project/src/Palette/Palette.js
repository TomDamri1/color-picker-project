import React, { Component } from 'react'
import ColorBox from '../ColorBox/ColorBox';
import './Palette.css';
import seedColors from '../seedColors/seedColors';


export class Palette extends Component {
    render() {
        const colorBoxes = this.props.palette.colors[500].map(color =>(
            <ColorBox background={color.hex} name={color.name}/>
        ))
        return (
            <div className="Palette">
                {/*NavBar here*/}
                <h1>Palette</h1>
                <div className="Palette-colors">
                    {colorBoxes}
                </div>
                {/*footer here*/}
            </div>
        )
    }
}

export default Palette
