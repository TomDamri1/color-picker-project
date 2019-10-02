import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import {ValidatorForm , TextValidator} from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';

export class PaletteFormNav extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            newPaletteName : '',
        }
    }
    componentDidMount(){
        ValidatorForm.addValidationRule('isPaletteNameUnique' , value=>
      this.props.palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
        )
    )
    }
    handleChange = (evt) =>{
        this.setState({[evt.target.name] : evt.target.value});
      }
    
    render() {
        const {classes , open , handleSubmit , handleDrawerOpen} = this.props;
        const { newPaletteName } =this.state
        return (
            <div>
                <CssBaseline />
                <AppBar
                color= 'default'
                position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                >
                <Toolbar disableGutters={!open}>
                    <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    onClick={handleDrawerOpen}
                    className={classNames(classes.menuButton, open && classes.hide)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                    New Color Palette
                    </Typography>
                    <ValidatorForm onSubmit={()=> handleSubmit(newPaletteName)}>
                    <TextValidator 
                        onChange={this.handleChange}
                        name='newPaletteName' 
                        label='Palette Name' 
                        value={this.state.newPaletteName}
                        validators={['required','isPaletteNameUnique']}
                        errorMessages={['This field is required','This name is already taken']}/>
                    <Button variant='contained' color='primary' type='submit'>Save Palette</Button>
                    <Link to='/'>
                        <Button variant='contained' color='secondary'>Go Back</Button>
                    </Link>
                    </ValidatorForm>
                </Toolbar>
                </AppBar>
            </div>
        )
    }
}

export default PaletteFormNav