import React from 'react';
import {withStyles} from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import {SortableElement} from 'react-sortable-hoc';
import styles from '../../Styles/DraggableColorBoxStyles';


const DraggableColorBox= SortableElement((props) => {
    const {classes} = props
    return (
        <div className={classes.root} style={{backgroundColor : props.color}}>
            <div className={classes.boxContent}>
                <span>{props.name}</span>
                <DeleteIcon className={classes.deleteIcon} onClick={props.handleClick}/>
            </div>
        </div>
    )
})

export default withStyles(styles)(DraggableColorBox)

