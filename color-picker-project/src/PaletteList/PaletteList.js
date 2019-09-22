import React, { Component } from 'react'
import {Link} from 'react-router-dom';
class PaletteList extends Component {
    render() {
        return (
            <div>
                <h1>PaletteList</h1>
                {this.props.palettes.map( p =>
                <div>
                    <Link to={`/palette/${p.id}`}>{p.paletteName}</Link>
                </div>
                )}
            </div>
        )
    }
}

export default PaletteList

