import React from 'react';
import Palette from './Palette/Palette'
import seedColors from './seedColors/seedColors';

function App() {
  return (
    <div className="App">
      <Palette {...seedColors[0]}/>
    </div>
  );
}

export default App;
