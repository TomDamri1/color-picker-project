import React, { Component } from 'react'
import MiniPalette from '../MiniPalette/MiniPalette';
import {withStyles} from '@material-ui/styles';
import {CSSTransition , TransitionGroup} from 'react-transition-group'
import styles from '../Styles/PaletteListStyles';
import {Link} from 'react-router-dom';
import { palette } from '@material-ui/system';

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
                        <h1 className={classes.heading}><i class="fas fa-palette"></i> Color Picker</h1>
                        <Link to='/palette/new'>New Palette</Link>
                    </nav>
                    <TransitionGroup className={classes.palettes}>
                    {this.props.palettes.map( p =>
                        <CSSTransition
                            key={palette.id}
                            classNames='fade'
                            timeout={500}
                        >
                            <MiniPalette 
                                {...p} 
                                handleClick={()=> {this.goToPalette(p.id)}}
                                handleDelete ={this.props.deletePalette}
                                key = {p.id}
                                id = {p.id}
                            />
                        </CSSTransition>
                    )}
                    </TransitionGroup>
                </div>
                
                
                
            </div>
        )
    }
}
//<Link to={`/palette/${p.id}`}>{p.paletteName}</Link>
export default withStyles(styles)(PaletteList);

