import React, { Component } from 'react'
import PersistentDrawerLeft from './Drawer/PersistentDrawerLeft'


export class NewPaletteForm extends Component {
    constructor(props){
        super(props);
        this.state={
            open : true,
            currentColor : 'teal',
            colors:['purple' , '#e12345'],
        }
        this.changeCurrentColor = this.changeCurrentColor.bind(this);
        this.addNewColor = this.addNewColor.bind(this);
    }
    addNewColor(){
        this.setState({colors : [...this.state.colors , this.state.currentColor]})
    }
    changeCurrentColor(color){
        this.setState({currentColor : color})
    }
    render() {
        return (
            <div>
                <PersistentDrawerLeft {...this.state} 
                    changeCurrentColor={(color) => this.changeCurrentColor(color)}
                    addNewColor={this.addNewColor}/>
            </div>
        )
    }
}

export default NewPaletteForm;
