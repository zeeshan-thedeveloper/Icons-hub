import GetRefinedKeyword from "../SVGManagerAPI/GetRefinedKeyword";

import { FetchAllDesigns } from "./helperFunctions";
const filterDesigns = async (keyword) => {
  console.log("in filter illustration");
  return FetchAllDesigns().then(
    (resolve) => {
      console.log("=-----------resolved =========");

      let allMatchedDesigns = [];
      //   keywords.forEach((keyword) => {

      getFilteredDesignFromKeyword(resolve, allMatchedDesigns, keyword);
      if (allMatchedDesigns.length == 0) {
        console.log("--------------no direct results found");
        // go for refined keywords
        let refinedKeywords = GetRefinedKeyword(keyword);
        console.log(refinedKeywords);
        refinedKeywords.map((word) => {
          getFilteredDesignFromKeyword(resolve, allMatchedDesigns, word);
        });
      }
      console.log("----------------------al matched Designs-------------");
      console.log(allMatchedDesigns);

      return allMatchedDesigns;
    },
    (reject) => {
      console.log("reject");
    }
  );
};

export const getFilteredDesignFromKeyword = (resolve, allMatchedDesigns, keyword) => {
  resolve.forEach((design) => {
    let isDesignAdded = false;
    if (design.designTitle.toLowerCase() == keyword) {
      allMatchedDesigns.push(design);
      isDesignAdded = true;
    }
    if (!isDesignAdded) {
      // serach in title sub string
      let foundWord = design.designTitle.toLowerCase()
        .split(" ")
        .filter((word) => word == keyword);
      if (foundWord.length > 0) allMatchedDesigns.push(design);
      isDesignAdded = true;
    }
    if (!isDesignAdded) {
      let temp = design.attachedTags.filter(
        (tag) => tag.label.toLowerCase() == keyword
      );
      if (temp.length > 0) {
        allMatchedDesigns.push(design);
        isDesignAdded = true;
      }
    }
    if (!isDesignAdded) {
      let temp = design.attachedCatagories.filter(
        (category) => category.label.toLowerCase() == keyword
      );
      if (temp.length > 0) {
        allMatchedDesigns.push(design);
        isDesignAdded = true;
      }
    }
    // });
  });
};

export default filterDesigns;
