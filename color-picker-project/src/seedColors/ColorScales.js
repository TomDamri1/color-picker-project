import chroma from 'chroma-js';
const levels = [50, 100 , 200 ,300 , 400 ,500 , 600 , 700 , 800 ,900];
const steps = 10;
function generatePalette(starterPalette){
  let newPalette = {
    paletteName: starterPalette.paletteName,
    id: starterPalette.id,
    emoji: starterPalette.emoji,
    colors: []
  }
  for(let level of levels){
    newPalette.colors[level]=[];
  }
  for(let color of starterPalette.colors){
    let scale= generateScale(color.color , steps).reverse();
    for(let c in scale){
      newPalette.colors[levels[c]].push(
        {
          name: `${color.name} ${levels[c]}`,
          id : `${color.name.toLowerCase().replace(/ /g, '-')}`,
          hex: scale[c],
          rgb: chroma(scale[c]).css(),
          rgba : chroma(scale[c]).css().replace('rgb' , 'rgba').replace(")",',1.0)'),
        }
      );
    }
  }
  return newPalette;
}
function getRange(hexColor){
  const end= "#fff";
  return [
    chroma(hexColor).darken(1.4).hex(),
    hexColor,
    end
  ];
}
function generateScale(hexColor , numberOfColors){
  return chroma
  .scale(getRange(hexColor))
  .mode('lab').colors(numberOfColors);
}

export default generatePalette;