import {Route , Switch} from 'react-router-dom';
import React from 'react';
import Palette from './Palette/Palette'
import seedColors from './seedColors/seedColors';
import {findPalette}from './seedColors/seedColors';
import generatePalette from './seedColors/ColorScales';

function App() {  
  return (
    <Switch>
      <Route exact path='/' render={()=> <h1> Palette HERE</h1>}/>
      <Route 
      exact path='/palette/:id'
      render={routeProps => <Palette palette={generatePalette(findPalette(routeProps.match.params.id))}/>}
      />
    </Switch>
    /*<div className="App">
      <Palette palette={generatePalette(seedColors[4])}/>
    </div>*/
  );
}

export default App;
