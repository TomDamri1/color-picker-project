import React from 'react';
import {ChromePicker} from 'react-color';
import Button from '@material-ui/core/Button';
import {ValidatorForm , TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../Styles/ColorPickerFormStyles';

export class ColorPickerForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            currentColor:'teal',
            newColorName : '',
        }
    }
    componentDidMount(){
        ValidatorForm.addValidationRule('isColorNameUnique' , value=>
        this.props.colors.every(
          ({name}) => name.toLowerCase() !== value.toLowerCase()
          )
      )
  
      ValidatorForm.addValidationRule('isColorUnique' , value=>
        this.props.colors.every(
          ({color}) => color !== this.state.currentColor
          )
      )
    }
    handleChange = (evt) =>{
        this.setState({[evt.target.name] : evt.target.value});
    }
    updateCurrentColor = (newColor) => {
        this.setState({currentColor : newColor.hex})
    }
    handleSubmit = () =>{
        const newColor={
            color: this.state.currentColor,
            name : this.state.newColorName,
        };
        console.log(newColor)
        this.props.addNewColor(newColor)
        this.setState({newColorName:''})
    }
    
    render() {
        const {paletteIsFull} = this.props;
        return (
            <div >
            <ChromePicker 
            className={this.props.classes.picker}
            color={this.state.currentColor} 
            onChangeComplete={(newColor) => this.updateCurrentColor(newColor)}
          />
          <ValidatorForm onSubmit={this.handleSubmit}>
            <TextValidator 
              placeholder='Color Name'
              margin='normal'
              variant ='filled'
              className={this.props.classes.colorNameInput}
              onChange={this.handleChange}  
              name='newColorName'
              value={this.state.newColorName} 
              validators = {['required' , 'isColorNameUnique','isColorUnique']}
              errorMessages={['This Field is Required','Color Name is not Unique','Color is not Unique']}
            />
            
            <Button 
              type='submit'
              variant='contained' color='primary' 
              style={{backgroundColor : this.state.currentColor}}
              disabled = {paletteIsFull}
              className={this.props.classes.addColor}
            >
              {paletteIsFull ? 'Palette is Full' : 'Add color'}
            </Button>
          </ValidatorForm>
            </div>
        )
    }
}

export default withStyles(styles)(ColorPickerForm);
