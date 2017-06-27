const colors = require('material-ui/styles/colors');

const formatColorHash = (colorsObj) => {
  const temporaryStorage = [];
  for (let color in colors) {
    temporaryStorage.push([color, colors[color]]);
  }
  const colorHashTable = temporaryStorage.reduce((hashTable, currTuple) => {
    hashTable[currTuple[0]] = currTuple[1];
    return hashTable;
  }, { colors: {}});
  return colorHashTable;
};

const colorTable = formatColorHash(colors);

const getAllColorNames = (colorObj) => {
  const possibleColors = [];
  for (let name in colorObj) {
    possibleColors.push(name);
  }
  return possibleColors;
};

const allColors = getAllColorNames(colorTable);

const RandomColorPicker = () => {
  let possibilities = allColors.length;
  let choice = allColors[Math.floor(Math.random() * possibilities)];
  return {color: choice, hex: colorTable[choice]};
};

module.exports = RandomColorPicker;