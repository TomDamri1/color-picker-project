import React, { Component } from 'react'
import MiniPalette from '../MiniPalette/MiniPalette';
import {withStyles} from '@material-ui/styles';
import styles from '../Styles/PaletteListStyles';
import {Link} from 'react-router-dom';

class PaletteList extends Component {
    goToPalette(id){
        this.props.history.push(`/palette/${id}`)
    }
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>Palette List</h1>
                        <Link to='/palette/new'>New Palette</Link>
                    </nav>
                    <div className={classes.palettes}>
                    {this.props.palettes.map( p =>
                        <div>
                            <MiniPalette {...p} handleClick={()=> {this.goToPalette(p.id)}}/>
                        </div>
                    )}
                    </div>
                </div>
                
                
                
            </div>
        )
    }
}
//<Link to={`/palette/${p.id}`}>{p.paletteName}</Link>
export default withStyles(styles)(PaletteList);

