import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {ChromePicker} from 'react-color';
import Button from '@material-ui/core/Button';
import DraggableColorBox from './DraggableColorBox/DraggableColorBox';
import {ValidatorForm , TextValidator} from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList/DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';


const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

class NewPaletteForm extends React.Component {
  state = {
    open: true,
    currentColor : 'teal',
    colors : [],
    newColorName:'',
    newPaletteName:'',
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  updateCurrentColor = (newColor) => {
    this.setState({currentColor : newColor})
  }

  handleSubmit = () =>{
    let newName = this.state.newPaletteName;
    const newPalette = {
      paletteName : newName,
      colors : this.state.colors,
      emoji: '🤣',
      id : newName.toLowerCase().replace(/ /g,'-'),

    }
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  }

  addNewColor = () => {
    const newColor = {
      color : this.state.currentColor,
      name : this.state.newColorName
    };
    this.setState({colors : [...this.state.colors , newColor]})
  }

  handleChange = (evt) =>{
    this.setState({[evt.target.name] : evt.target.value});
  }

  componentDidMount(){
    ValidatorForm.addValidationRule('isColorNameUnique' , value=>
      this.state.colors.every(
        ({name}) => name.toLowerCase() !== value.toLowerCase()
        )
    )

    ValidatorForm.addValidationRule('isColorUnique' , value=>
      this.state.colors.every(
        ({color}) => color !== this.state.currentColor
        )
    )

    ValidatorForm.addValidationRule('isPaletteNameUnique' , value=>
      this.props.palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
        )
    )
  }

  removeColor = (colorName)=>{
    this.setState({
      colors : this.state.colors.filter(color => color.name !== colorName )
    })
  }

  onSortEnd = ({oldIndex , newIndex}) => {
    this.setState(({colors}) => ({
      colors : arrayMove(colors, oldIndex ,newIndex),
    }));
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
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
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              New Color Palette
            </Typography>
            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator 
                onChange={this.handleChange}
                name='newPaletteName' 
                label='Palette Name' 
                value={this.state.newPaletteName}
                validators={['required','isPaletteNameUnique']}
                errorMessages={['This field is required','This name is already taken']}/>
              <Button variant='contained' color='primary' type='submit'>Save Palette</Button>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant='h4'>
            Design Your Palette
          </Typography>
          <div>
            <Button variant='contained' color='secondary'>Clear Palette</Button>
            <Button variant='contained' color='primary'>Random Color</Button>
          </div>

          <ChromePicker 
            color={this.state.currentColor} 
            onChangeComplete={(newColor) => this.updateCurrentColor(newColor.hex)}
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator 
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
              >
            Add Color</Button>
          </ValidatorForm>
          
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList 
            colors={this.state.colors}
            removeColor={this.removeColor}
            axis='xy'
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}


export default withStyles(styles, { withTheme: true })(NewPaletteForm);