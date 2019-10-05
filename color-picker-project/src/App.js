import {Route , Switch} from 'react-router-dom';
import React, {Component} from 'react';
import {TransitionGroup , CSSTransition} from 'react-transition-group';
import Palette from './Palette/Palette'
import PaletteList from './PaletteList/PaletteList';
import SingleColorPalette from './Palette/SingleColorPalette/SingleColorPalette';
import NewPaletteForm from './NewPaletteForm/NewPaletteForm';
import Page from './Page/Page';
import generatePalette from './seedColors/ColorScales';
import seedColors from './seedColors/seedColors';


class App extends Component {  
  constructor(props){
    super(props);
    let storedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    let palettesToShow = () =>{
      if (storedPalettes) 
        return storedPalettes;
      else return [...seedColors]
    }
    this.state = {
      palettes: palettesToShow() ,
    }

    console.log(this.state.palettes)
  }
  findPalette = (id) => {
    return this.state.palettes.find(function(palette){
      return palette.id===id
    });
  }
  savePalette = (NewPalette) =>{
    this.setState({palettes : [...this.state.palettes , NewPalette]} , this.syncLocalStorage);
    
  }
  syncLocalStorage = () => {
    window.localStorage.setItem('palettes' , JSON.stringify(this.state.palettes));
  }
  deletePalette = (id) =>{
    this.setState(
      st => ({palettes : st.palettes.filter( palette => 
        palette.id !== id
      )})
    , this.syncLocalStorage)
  }

  render(){
  return (
    <Route
      render={({location}) =>(
      <TransitionGroup>
        <CSSTransition
          key={location.key}
          classNames='page'
          timeout={500}
        >
          <Switch location={location}>
            <Route 
              exact path='/palette/new' 
              render={(routeProps)=>
                <Page>
                  <NewPaletteForm 
                    palettes={this.state.palettes}
                      savePalette={this.savePalette}
                      {...routeProps}
                    />
                  </Page>
                }
              />
            <Route 
            exact path='/' 
            render={(routeProps)=> 
              <Page>
                <PaletteList 
                  palettes={this.state.palettes} 
                  deletePalette ={this.deletePalette}
                  {...routeProps}
                />
                </Page>
            }/>
            <Route 
            exact path='/palette/:id'
            render={routeProps => 
              <Page>
                <Palette palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>
              </Page>
              }
            />
            <Route 
            exact path='/palette/:paletteId/:colorId'
            render={routeProps=>
              <Page>
              <SingleColorPalette
                colorId={routeProps.match.params.colorId}
                palette={generatePalette(
                  this.findPalette(routeProps.match.params.paletteId))}/>
              </Page>
            }/>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
      )}/>
  );}
}

export default App;
