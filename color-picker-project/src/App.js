import React from 'react';
import Palette from './Palette/Palette'
import seedColors from './seedColors/seedColors';
import generatePalette from './seedColors/ColorScales';

function App() {
  let colors = generatePalette(seedColors[4]).colors.map( color =>{
    console.log(color);
  })
  
    
  return (
    <div className="App">
      <Palette palette={generatePalette(seedColors[4])}/>
    </div>
  );
}

export default App;
