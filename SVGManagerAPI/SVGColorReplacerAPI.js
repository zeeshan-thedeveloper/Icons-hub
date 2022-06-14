import produce from "immer";

const SVGColorReplacer = (
  originalSVG = "",
  updatedSVG = "",
  primaryColors = [],
  primaryColorsPosition = [],
  targetColor = {}
) => {
  //We have the position of each primary color key.
 // console.log("SVG to  update ");
  //console.log(updatedSVG);
  primaryColorsPosition.forEach((item, index) => {
    if (item.colorKey === targetColor.colorKey) {
      let replacement = `fill="` + targetColor.currentValue + `"`;
      let endString = updatedSVG.slice(item.colorEndIndex);
      let startString = updatedSVG.slice(0, item.colorStartIndex);
      updatedSVG = startString + replacement + endString;
    }
  });
  //console.log("SVG  updated ");
  //console.log(updatedSVG);
  return updatedSVG;
};

const findPrimaryColorPosition = (originalSVG = "", primaryColors = []) => {
  const regexp = new RegExp('fill="#[0-9a-zA-Z]*"', "g");
  let foundPrimaryColorsPosition = [];
  const matches = originalSVG.matchAll(regexp);
  for (const match of matches) {
    // console.log(
    //   `Found ${match[0]} start=${match.index} end=${
    //     match.index + match[0].length
    //   }.`
    // );
    let foundColors = getPrimaryColorKey(
      primaryColors,
      match[0].slice(6, match[0].lastIndexOf('"'))
    );
    if (foundColors != null) {
      if (foundColors.colorKey != null) {
        foundPrimaryColorsPosition.push({
          colorValue: foundColors.colorValue,
          colorKey: foundColors.colorKey,
          colorStartIndex: match.index+3,
          colorEndIndex: match.index + match[0].length+3,
        });
      }
    }
  }
  return foundPrimaryColorsPosition;
};

const getPrimaryColorKey = (primaryColors = [], color) => {
  let colorKey = null;
  let colorValue = null;
  primaryColors.forEach((item, index) => {
    if (color.toLowerCase() == item.colorValue.toLowerCase()) {
      colorKey = item.colorKey;
      colorValue = item.colorValue;
    }
  });
  let foundColor = {
    colorKey,
    colorValue,
  };
  if (colorKey != null) return foundColor;
  else return null;
};

export { SVGColorReplacer, findPrimaryColorPosition,getPrimaryColorKey };
