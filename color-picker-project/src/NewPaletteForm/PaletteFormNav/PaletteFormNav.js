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
import {withStyles} from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm/PaletteMetaForm'


const drawerWidth = 400;
const styles = theme => ({
    root:{
        display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      flexDirection : 'row',
        justifyContent : 'space-between',
        height: '64px',
        alignItems:'center',
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
    navBtns:{
        marginRight : '1rem',
        '& a':{
          textDecoration : 'none',
        },

    },
    button:{
      margin: '0 0.5rem',
    },


});
export class PaletteFormNav extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            newPaletteName : '',
            formShowing : false,
        }
    }
    
    handleChange = (evt) =>{
        this.setState({[evt.target.name] : evt.target.value});
      }
    showForm = () =>{
      this.setState({formShowing : true})
    }
    
    render() {
        const {classes , open , handleSubmit , handleDrawerOpen , palettes} = this.props;
        const { newPaletteName } =this.state
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
                    onClick={handleDrawerOpen}
                    className={classNames(classes.menuButton, open && classes.hide)}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                        Create A Palette
                    </Typography>
                    
                </Toolbar>
                <div className={classes.navBtns}>
                    <Link to='/'>
                        <Button className={classes.button} variant='contained' color='secondary'>Go Back</Button>
                    </Link>
                    <Button className={classes.button} variant="contained" color="primary" onClick={this.showForm}>
                      Save
                    </Button>
                    </div>
                </AppBar>
                {this.state.formShowing &&(
                <PaletteMetaForm
                      handleSubmit={handleSubmit}
                      palettes={palettes}
                />
                )}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
