import {Route , Switch} from 'react-router-dom';
import React from 'react';
import Palette from './Palette/Palette'
import seedColors from './seedColors/seedColors';
import {findPalette}from './seedColors/seedColors';
import generatePalette from './seedColors/ColorScales';
import PaletteList from './PaletteList/PaletteList';
import SingleColorPalette from './SingleColorPalette/SingleColorPalette';
import NewPaletteForm from './NewPaletteForm/NewPaletteForm';


function App() {  
  return (
    <Switch>
      <Route exact path='/palette/new' render={()=> <NewPaletteForm/>}/>
      <Route 
      exact path='/' 
      render={(routeProps)=> <PaletteList palettes={seedColors} {...routeProps}/>}/>
      <Route 
      exact path='/palette/:id'
      render={routeProps => <Palette palette={generatePalette(findPalette(routeProps.match.params.id))}/>}
      />
      <Route 
      exact path='/palette/:paletteId/:colorId'
      render={routeProps=>
      <SingleColorPalette
        colorId={routeProps.match.params.colorId}
        palette={generatePalette(
          findPalette(routeProps.match.params.paletteId))}
      />}/>
    </Switch>
    /*<div className="App">
      <Palette palette={generatePalette(seedColors[4])}/>
    </div>*/
  );
}

export default App;
