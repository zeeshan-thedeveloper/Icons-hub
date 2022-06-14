import GetRefinedKeyword from "../SVGManagerAPI/GetRefinedKeyword";
import resizeSVG from "./SVGSizeModifierAPI";
import { FetchAllIllustrations } from "./helperFunctions";
const filterIllustrations = async (keyword) => {
  console.log("in filter illustration");
  return FetchAllIllustrations().then(
    (resolve) => {
      console.log("=-----------resolved =========");
      // console.log(resolve);
      // do filtering here
      let allMatchedIllustration = [];
      //   keywords.forEach((keyword) => {

      getFilteredIllustrationFromKeyword(
        resolve,
        allMatchedIllustration,
        keyword
      );
      if (allMatchedIllustration.length == 0) {
        console.log("--------------no direct results found");
        // go for refined keywords
        let refinedKeywords = GetRefinedKeyword(keyword);
        console.log(refinedKeywords);
        refinedKeywords.map((word) => {
          getFilteredIllustrationFromKeyword(
            resolve,
            allMatchedIllustration,
            word
          );
        });
      }
      console.log("----------------------al matched illustration-------------");
      console.log(allMatchedIllustration);
      const EST_WIDTH = "300";
      const EST_HEIGHT = "200";
      const EST_VIEWBOX = `viewBox="40 -10 400 300"`;
      const MOBILEORDESKTOP = 1; // 1 for desktop, 0 for mobile

      let resizedDataForIllustration = allMatchedIllustration.map(
        (illustration, index) => {
          return {
            id: illustration._id,
            name: illustration.IllustrationTitle,
            description: illustration.IllustrationDescription,
            languages: illustration.attachedLanguages,
            uploadDate: illustration.uploadDate,
            downloadingHistory: illustration.downloadingHistory,
            attachedCatagories: illustration.attachedCatagories,
            attachedTags: illustration.attachedTags,
            data: resizeSVG(
              illustration.IllustrationThumbnail,
              EST_WIDTH,
              EST_HEIGHT,
              EST_VIEWBOX,
              MOBILEORDESKTOP
            ),
            originalIllustration: illustration.originalIllustration,
          };
        }
      );
      return resizedDataForIllustration;
    },
    (reject) => {
      console.log("reject");
    }
  );
};

export const getFilteredIllustrationFromKeyword = (
  resolve,
  allMatchedIllustration,
  keyword
) => {
  resolve.forEach((illustartion) => {
    let isIllustrationAdded = false;
    if (illustartion.IllustrationTitle.toLowerCase() == keyword) {
      allMatchedIllustration.push(illustartion);
      isIllustrationAdded = true;
    }
    if (!isIllustrationAdded) {
      // serach in title sub string
      let foundWord = illustartion.IllustrationTitle.toLowerCase()
        .split(" ")
        .filter((word) => word == keyword);
      if (foundWord.length > 0) allMatchedIllustration.push(illustartion);
      isIllustrationAdded = true;
    }
    if (!isIllustrationAdded) {
      let temp = illustartion.attachedTags.filter(
        (tag) => tag.label.toLowerCase() == keyword
      );
      if (temp.length > 0) {
        allMatchedIllustration.push(illustartion);
        isIllustrationAdded = true;
      }
    }
    if (!isIllustrationAdded) {
      let temp = illustartion.attachedCatagories.filter(
        (category) => category.label.toLowerCase() == keyword
      );
      if (temp.length > 0) {
        allMatchedIllustration.push(illustartion);
        isIllustrationAdded = true;
      }
    }
    // });
  });
};

export default filterIllustrations;
