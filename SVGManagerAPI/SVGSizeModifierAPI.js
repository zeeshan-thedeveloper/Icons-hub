
const resizeSVG = (
  icon = "",
  EST_WIDTH = "300",
  EST_HEIGHT = "200",
  EST_VIEWBOX =`viewBox="40 -10 400 300"`,
  MOBILEORDESKTOP = 1
) => {
  // fixed constants for resizing svg
  // const FIXED_HEIGHT = "200";
  // const FIXED_WIDTH = "300";
  // const FIXED_VIEWBOX = `viewBox="40 -10 400 300"`;
  const newHeight = icon.replace(
    icon.match(/height="\d+[px]*"/g)[0].match(/\d+/)[0],
    EST_HEIGHT
  );

  const newWidth = newHeight.replace(
    newHeight.match(/width="\d+[px]*"/g)[0].match(/\d+/)[0],

    EST_WIDTH

  );

  const newIcon = newWidth.replace(
    newWidth.match(/viewBox="[\s*\d\s-.]+"/g)[0],

    EST_VIEWBOX

  );
   
  return newIcon;
};


export default resizeSVG;

