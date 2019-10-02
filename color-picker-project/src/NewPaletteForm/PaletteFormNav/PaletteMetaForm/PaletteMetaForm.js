import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import {ValidatorForm , TextValidator} from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export class PaletteMetaForm extends Component {
    state = {
        open: false,
        newPaletteName : '',
      };
      componentDidMount(){
        ValidatorForm.addValidationRule('isPaletteNameUnique' , value=>
      this.props.palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
        )
    )
    }
    
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
      handleChange = (evt) =>{
        this.setState({[evt.target.name] : evt.target.value});
      }
    
      render() {
          const {newPaletteName } = this.state;
          const {handleSubmit } = this.props;
        return (
          <div>
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              Open form dialog
            </Button>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  To subscribe to this website, please enter your email address here. We will send
                  updates occasionally.
                </DialogContentText>
                <ValidatorForm onSubmit={()=> handleSubmit(newPaletteName)}>
                    <TextValidator 
                        onChange={this.handleChange}
                        name='newPaletteName' 
                        label='Palette Name' 
                        value={newPaletteName}
                        validators={['required','isPaletteNameUnique']}
                        errorMessages={['This field is required','This name is already taken']}/>
                    <Button variant='contained' color='primary' type='submit'>Save Palette</Button>
              </ValidatorForm>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleClose} color="primary">
                  Subscribe
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        );
      }
}

export default PaletteMetaForm
