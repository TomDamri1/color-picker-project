import React, { Component } from 'react'
import MiniPalette from '../MiniPalette/MiniPalette';
import {withStyles} from '@material-ui/styles';
import {CSSTransition , TransitionGroup} from 'react-transition-group'
import styles from '../Styles/PaletteListStyles';
import {Link} from 'react-router-dom';
import { palette } from '@material-ui/system';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import CheckIcon from '@material-ui/icons/Check'
import ClosekIcon from '@material-ui/icons/Close'
import Avatar from '@material-ui/core/Avatar'
import ListItemText from '@material-ui/core/ListItemText'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'

import DialogTitle from '@material-ui/core/DialogTitle';

class PaletteList extends Component {
    state={
        openDeleteDialog : false,
        deletingId:''
    }
    openDialog = (id) => {
        this.setState({openDeleteDialog : true , deletingId : id})
    }
    closeDialog = (id) =>{
        this.setState({openDeleteDialog : false })
    }
    goToPalette = (id)=>{
        this.props.history.push(`/palette/${id}`)
    }
    deletePalette = () => {
        this.props.deletePalette(this.state.deletingId);
        this.setState({openDeleteDialog : false})
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
                                //handleDelete ={this.props.deletePalette}
                                openDialog={this.openDialog}
                                key = {p.id}
                                id = {p.id}
                            />
                        </CSSTransition>
                    )}
                    </TransitionGroup>
                </div>
                <Dialog 
                    open={this.state.openDeleteDialog} 
                    aria-labelledby='delete-dialog'
                    onClose={this.closeDialog}
                >
                    <DialogTitle id='delete-dialog-title'>
                        Delete this palette?
                    </DialogTitle>
                    <List>
                        <ListItem button onClick={this.deletePalette}>
                            <ListItemAvatar>
                                <Avatar style={{backgroundColor : blue[200] ,color: blue[600]}}>
                                    <CheckIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Delete'/>
                        </ListItem>
                        <ListItem button onClick={this.closeDialog}>
                            <ListItemAvatar>
                            <Avatar style={{backgroundColor : red[200] , color: red[600]}}>
                                    <ClosekIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary='Cancel'/>
                        </ListItem>
                    </List>
                </Dialog>
                
                
            </div>
        )
    }
}
//<Link to={`/palette/${p.id}`}>{p.paletteName}</Link>
export default withStyles(styles)(PaletteList);

