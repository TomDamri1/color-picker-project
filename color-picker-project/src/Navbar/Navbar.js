import React, { Component } from 'react'
import Slider from 'rc-slider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import 'rc-slider/assets/index.css';
import { Link } from 'react-router-dom';
import {withStyles} from '@material-ui/styles';
import styles from '../Styles/NavbarStyles';

export class Navbar extends Component {
    constructor(props){
        super(props);
        this.state={
            format : 'hex',
            open : true,
        }
        this.handleChange=this.handleChange.bind(this);
        this.closeSnackbar=this.closeSnackbar.bind(this);
    }
    handleChange(e){
        this.setState({format : e.target.value , open : true});
        this.props.handleChange(e.target.value);
    }
    closeSnackbar(){
        this.setState({open: false});
    }
    render() {
        const {classes} = this.props
        return (
            <header className={classes.Navbar}>
                <div className={classes.logo}>
                    <Link to="/"><i className={`fas fa-palette ${classes.icon}`}></i>Color Picker</Link>
                </div>
                {!this.props.dontShowSlider &&
                <div>
                    <span>Level: {this.props.level}</span>
                    <div className={classes.slider}>
             
                        <Slider 
                        step={100}
                        defaultValue={this.props.level} 
                        min={100} max={900}
                        onAfterChange={this.props.changeLevel}/>
                        
                    </div>
                </div>
                }
                <div className={`select-container ${classes.selectContainer}`}>
                    <Select value={this.state.format} onChange={this.handleChange}>
                        <MenuItem value="hex">HEX - #ffffff</MenuItem>
                        <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                        <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar 
                anchorOrigin={{vertical: "bottom" , horizontal : "left"}}
                open={this.state.open}
                autoHideDuration={3000}
                message={<span id='message-id'>Format Changed to {this.state.format}</span>}
                ContentProps={{
                    'aria-describedby':'message-id'
                }}
                onClose={this.closeSnackbar}
                action={[
                    <IconButton 
                    onClick={this.closeSnackbar} 
                    key='close'
                    aria-label='close'
                    >
                        <CloseIcon/>
                    </IconButton>
                ]}
                />
            </header>
        )
    }
}

export default withStyles(styles)(Navbar);
