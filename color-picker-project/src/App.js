import React from 'react';
import Palette from './Palette/Palette'
import seedColors from './seedColors/seedColors';
import generatePalette from './seedColors/ColorScales';

function App() {  
  return (
    <div className="App">
      <Palette palette={generatePalette(seedColors[4])}/>
    </div>
  );
}

export default App;
