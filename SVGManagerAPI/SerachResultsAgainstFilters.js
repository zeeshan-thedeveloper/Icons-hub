import { createNextState } from "@reduxjs/toolkit";
import GetRefinedKeyword from "./GetRefinedKeyword";
import { getFilteredIllustrationFromKeyword } from "./FilterIllustrations";
import { getFilteredDesignFromKeyword } from "./FilterDesigns";
export const SerachResultsAgainstFilters = async (
  searchValue = "",
  fetchedResultsFromAPI = {},
  categoryName = "",
  selectedTags = [],
  language = "",
  sortType = ""
) => {
  console.log("--------inside SerachResultsAgainstFilters---------");
  console.log(fetchedResultsFromAPI);
  let matchedResultsObject = {};
  let allMatchedResults = [];
  if (
    fetchedResultsFromAPI.illustrations != undefined &&
    fetchedResultsFromAPI.designs != undefined
  ) {
    //search in both
    let allMatchedDesigns = [];
    let allMatchedIllustration = [];
    getFilteredDesignFromKeyword(
      fetchedResultsFromAPI.designs,
      allMatchedDesigns,
      searchValue
    );
    if (allMatchedDesigns.length == 0) {
      console.log("--------------no direct results found");
      // go for refined keywords
      let refinedKeywords = GetRefinedKeyword(searchValue);
      console.log(refinedKeywords);
      refinedKeywords.map((word) => {
        getFilteredDesignFromKeyword(
          fetchedResultsFromAPI.designs,
          allMatchedDesigns,
          word
        );
      });
    }
    matchedResultsObject.designs = allMatchedDesigns;

    getFilteredIllustrationFromKeyword(
      fetchedResultsFromAPI.illustrations,
      allMatchedIllustration,
      searchValue
    );

    if (allMatchedIllustration.length == 0) {
      console.log("--------------no direct results found");
      // go for refined keywords
      let refinedKeywords = GetRefinedKeyword(searchValue);
      console.log(refinedKeywords);
      refinedKeywords.map((word) => {
        getFilteredIllustrationFromKeyword(
          fetchedResultsFromAPI.illustrations,
          allMatchedIllustration,
          word
        );
      });
    }

    matchedResultsObject.illustrations = allMatchedIllustration;
    return matchedResultsObject;
  } else if (fetchedResultsFromAPI.illustrations != undefined) {
    // do need to search in illustrations
    console.log("when illustrations are seleced");
    getFilteredIllustrationFromKeyword(
      fetchedResultsFromAPI.illustrations,
      allMatchedResults,
      searchValue
    );
    console.log("after filtered results");
    console.log(allMatchedResults);

    if (allMatchedResults.length == 0) {
      console.log("--------------no direct results found");
      // go for refined keywords
      let refinedKeywords = GetRefinedKeyword(searchValue);
      console.log(refinedKeywords);
      refinedKeywords.map((word) => {
        getFilteredIllustrationFromKeyword(
          fetchedResultsFromAPI.illustrations,
          allMatchedResults,
          word
        );
      });
    }

    //  getFilteredIllustrationsFromLanguageCategoryAndTags(
    //   allMatchedResults,
    //   language,
    //   selectedTags,
    //   categoryName
    // ).then(
    //   (resolve) => (matchedResultsObject.illustrations = resolve),
    //   (reject) => (matchedResultsObject.illustrations = allMatchedResults)
    // );
    // matchedResultsObject.illustrations = allMatchedResults;
    return matchedResultsObject;
  } else if (fetchedResultsFromAPI.designs != undefined) {
    // do serach in designs
    getFilteredDesignFromKeyword(
      fetchedResultsFromAPI.designs,
      allMatchedResults,
      searchValue
    );
    if (allMatchedResults.length == 0) {
      console.log("--------------no direct results found");
      // go for refined keywords
      let refinedKeywords = GetRefinedKeyword(searchValue);
      console.log(refinedKeywords);
      refinedKeywords.map((word) => {
        getFilteredDesignFromKeyword(
          fetchedResultsFromAPI.designs,
          allMatchedResults,
          word
        );
      });
    }
    matchedResultsObject.designs = allMatchedResults;
    return matchedResultsObject;
  }
};

const getFilteredIllustrationsFromLanguageCategoryAndTags = async (
  allMatchedResults,
  language,
  selectedTags,
  categoryName
) => {
  console.log("--------------------------------------");
  let filteredResults = [];
  if (categoryName.toLowerCase() != "all") {
    console.log("category is not all");
    console.log("))))))))))))))))))))))))");
    filteredResults = await allMatchedResults.attachedCatagories.map(
      (category) => category.label.toLowerCase() == categoryName
    );
    console.log("))))))))))))))))))))))))");
    console.log(filteredResults);
    return filteredResults;
  } else {
    filteredResults = [...allMatchedResults];
    return filteredResults;
  }
  // if (selectedTags.length > 0) {
  //   allMatchedResults.forEach((item) => {
  //     let itemFound = false;
  //     selectedTags.forEach((tag) => {
  //       if (!itemFound) {
  //         item.attachedTags.forEach((itemTag) => {
  //           if (itemTag.label.toLowerCase() == tag) {
  //             filteredResults.push(item);
  //             itemFound = true;
  //           }
  //         });
  //       }
  //     });
  //   });
  // } else {
  //   filteredResults = [...allMatchedResults];
  // }
};

/**
 * import { createNextState } from "@reduxjs/toolkit";
import GetRefinedKeyword from "./GetRefinedKeyword";
import { getFilteredIllustrationFromKeyword } from "./FilterIllustrations";
import { getFilteredDesignFromKeyword } from "./FilterDesigns";
export const SerachResultsAgainstFilters = async (
  searchValue = "",
  fetchedResultsFromAPI = {},
  categoryName = "",
  selectedTags = [],
  language = "",
  sortType = ""
) => {
  console.log("--------inside SerachResultsAgainstFilters---------");
  console.log(fetchedResultsFromAPI);
  let matchedResultsObject = {};
  let allMatchedResults = [];
  if (
    fetchedResultsFromAPI.illustrations != undefined &&
    fetchedResultsFromAPI.designs != undefined
  ) {
    //search in both
    let allMatchedDesigns = [];
    let allMatchedIllustration = [];
    getFilteredDesignFromKeyword(
      fetchedResultsFromAPI.designs,
      allMatchedDesigns,
      searchValue
    );
    if (allMatchedDesigns.length == 0) {
      console.log("--------------no direct results found");
      // go for refined keywords
      let refinedKeywords = GetRefinedKeyword(searchValue);
      console.log(refinedKeywords);
      refinedKeywords.map((word) => {
        getFilteredDesignFromKeyword(
          fetchedResultsFromAPI.designs,
          allMatchedDesigns,
          word
        );
      });
    }
    matchedResultsObject.designs = allMatchedDesigns;

    getFilteredIllustrationFromKeyword(
      fetchedResultsFromAPI.illustrations,
      allMatchedIllustration,
      searchValue
    );

    if (allMatchedIllustration.length == 0) {
      console.log("--------------no direct results found");
      // go for refined keywords
      let refinedKeywords = GetRefinedKeyword(searchValue);
      console.log(refinedKeywords);
      refinedKeywords.map((word) => {
        getFilteredIllustrationFromKeyword(
          fetchedResultsFromAPI.illustrations,
          allMatchedIllustration,
          word
        );
      });
    }

    matchedResultsObject.illustrations = allMatchedIllustration;
    return matchedResultsObject;
  } else if (fetchedResultsFromAPI.illustrations != undefined) {
    // do need to search in illustrations
    console.log("when illustrations are seleced");
    getFilteredIllustrationFromKeyword(
      fetchedResultsFromAPI.illustrations,
      allMatchedResults,
      searchValue
    );
    console.log("after filtered results");
    console.log(allMatchedResults);

    if (allMatchedResults.length == 0) {
      console.log("--------------no direct results found");
      // go for refined keywords
      let refinedKeywords = GetRefinedKeyword(searchValue);
      console.log(refinedKeywords);
      refinedKeywords.map((word) => {
        getFilteredIllustrationFromKeyword(
          fetchedResultsFromAPI.illustrations,
          allMatchedResults,
          word
        );
      });
    }

    matchedResultsObject.illustrations = allMatchedResults;
    return matchedResultsObject;
  } else if (fetchedResultsFromAPI.designs != undefined) {
    // do serach in designs
    getFilteredDesignFromKeyword(
      fetchedResultsFromAPI.designs,
      allMatchedResults,
      searchValue
    );
    if (allMatchedResults.length == 0) {
      console.log("--------------no direct results found");
      // go for refined keywords
      let refinedKeywords = GetRefinedKeyword(searchValue);
      console.log(refinedKeywords);
      refinedKeywords.map((word) => {
        getFilteredDesignFromKeyword(
          fetchedResultsFromAPI.designs,
          allMatchedResults,
          word
        );
      });
    }
    matchedResultsObject.designs = allMatchedResults;
    return matchedResultsObject;
  }
};
 */
