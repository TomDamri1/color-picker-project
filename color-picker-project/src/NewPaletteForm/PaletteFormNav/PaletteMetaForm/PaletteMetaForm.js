import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import {ValidatorForm , TextValidator} from 'react-material-ui-form-validator';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
export class PaletteMetaForm extends Component {
    state = {
        stage : 'form',
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
        this.props.hideForm();
      };
      handleChange = (evt) =>{
        this.setState({[evt.target.name] : evt.target.value});
      }
      showEmojiPicker = () =>{
          this.setState({stage : 'emoji'})
      }
      savePalette = (emoji) => {
          const newPalette ={
              paletteName : this.state.newPaletteName,
              emoji : emoji.native
          }
          this.props.handleSubmit(newPalette);
      }
    
      render() {
          const {newPaletteName } = this.state;
          const {handleSubmit} = this.props;
        return (
          <div>
            <Dialog 
                open={this.state.stage === 'emoji'} 
                onClose={this.handleClose}>
                <DialogTitle>
                Pick a Palette Emoji
                </DialogTitle>
                <Picker 
                    onSelect={this.savePalette}
                    title=""
                />
            </Dialog>
            <Dialog
              open={this.state.stage === 'form'}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Save your palette</DialogTitle>
                <ValidatorForm onSubmit={this.showEmojiPicker}>
                    <DialogContent>
                        <DialogContentText>
                        Please enter a palette name. Make sure the name is unique.
                        </DialogContentText>
                        
                        <TextValidator 
                            onChange={this.handleChange}
                            name='newPaletteName' 
                            label='Palette Name' 
                            fullWidth
                            margin='normal'
                            value={newPaletteName}
                            validators={['required','isPaletteNameUnique']}
                            errorMessages={['This field is required','This name is already taken']}
                        />              
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button variant='contained' color='primary' type='submit'>Save Palette</Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
          </div>
        );
      }
}

export default PaletteMetaForm
