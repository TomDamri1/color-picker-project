import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm/PaletteMetaForm';
import styles from '../../Styles/PaletteFormNavStyles';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
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
    hideForm = () =>{
      this.setState({formShowing : false})
    }
    render() {
        const {classes , open , handleSubmit , handleDrawerOpen , palettes} = this.props;
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
                    <ChevronRightIcon />
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
                      hideForm={this.hideForm}
                      handleSubmit={handleSubmit}
                      palettes={palettes}
                />
                )}
            </div>
        )
    }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
