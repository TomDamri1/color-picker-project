import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import MiniPalette from '../MiniPalette/MiniPalette';
class PaletteList extends Component {
    render() {
        return (
            <div>
                <h1>PaletteList</h1>
                <MiniPalette/>
                {this.props.palettes.map( p =>
                <div>
                    <MiniPalette {...p}/>
                </div>
                )}
            </div>
        )
    }
}
//<Link to={`/palette/${p.id}`}>{p.paletteName}</Link>
export default PaletteList

