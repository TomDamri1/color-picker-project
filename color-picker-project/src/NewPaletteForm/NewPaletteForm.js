import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import DraggableColorList from './DraggableColorList/DraggableColorList';
import { arrayMove } from 'react-sortable-hoc';
import PaletteFormNav from './PaletteFormNav/PaletteFormNav';
import ColorPickerForm from './ColorPickerForm/ColorPickerForm';


const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
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
    display : 'flex',
    alignItems : 'center',
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
  container:{
    width:'90%',
    height:'100%',
    display: 'flex',
    flexDirection : 'column',
    justifyContent:'center',
    alignItems:'center',
  },
  buttons:{
    width: '100%',
  },
  button:{
    width: '50%',
  }
});

class NewPaletteForm extends React.Component {
  static defaultProps = {
    maxColors : 20,
  }
  state = {
    open: true,
    currentColor : 'teal',
    colors : [...this.props.palettes[0].colors],
    newColorName:'',
    newPaletteName:'',
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };


  handleSubmit = (Palette) =>{
    const newPalette = {
      paletteName : Palette.paletteName,
      colors : this.state.colors,
      emoji: Palette.emoji,
      id : Palette.paletteName.toLowerCase().replace(/ /g,'-'),

    }
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  }

  addNewColor = (newColor) => {
    this.setState({
      colors : [...this.state.colors , newColor],
      newColorName : '',
    })
  }

  handleChange = (evt) =>{
    this.setState({[evt.target.name] : evt.target.value});
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

  clearColors = () => {
    this.setState({colors : []});
  }

  addRandomColor = () => {
    const allColors = this.props.palettes.map( p => p.colors)
    let randomArrayPicker = Math.floor(Math.random() * allColors.length);
    let randomColorPicker = Math.floor(Math.random() * allColors[randomArrayPicker].length);
    let randomColor = allColors[randomArrayPicker][randomColorPicker];
    this.setState({colors : [...this.state.colors , randomColor]})
  }

  render() {
    const { classes , palettes } = this.props;
    const { open } = this.state;
    const paletteIsFull = this.state.colors.length >= this.props.maxColors;

    return (
      <div className={classes.root}>
        <PaletteFormNav 
          open={open} 
          palettes={palettes}
          handleSubmit={this.handleSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
        />
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
          <div className={classes.container}>
          <Typography variant='h4' gutterBottom>
            Design Your Palette
            
          </Typography>
          <div className={classes.buttons}>
            <Button 
              variant='contained' 
              color='secondary' 
              onClick={this.clearColors}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button 
              variant='contained' 
              color='primary' 
              className={classes.button}
              onClick={this.addRandomColor}
              disabled = {paletteIsFull}
            >
              Random Color
            </Button>
          </div>

          
          <ColorPickerForm 
            paletteIsFull={paletteIsFull}
            addNewColor={this.addNewColor}
            colors = {this.state.colors}
          />
          </div>
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