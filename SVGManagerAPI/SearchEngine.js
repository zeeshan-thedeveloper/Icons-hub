import { FeedLabel } from "semantic-ui-react";
import { FetchAllIllustrations, FetchAllDesigns } from "./helperFunctions";

const SearchEngine = async (type = "all") => {
  let matchedResults = {};
  // console.log("in serach engine " + type);
  if (type == "all") {
    return FetchAllIllustrations().then(
      (resolve) => {
        matchedResults.illustrations = resolve;
        return FetchAllDesigns().then(
          (resolve) => {
            matchedResults.designs = resolve;
            return matchedResults;
          },
          (reject) => console.log("reject")
        );
      },
      (reject) => console.log("reject")
    );
  } else if (type == "illustration") {
    // matchedResults.illustartions = FetchAllIllustrations();
    return FetchAllIllustrations().then(
      (resolve) => {
        // console.log("resolve");
        // console.log(resolve);
        matchedResults.illustrations = resolve;
        return matchedResults;
      },
      (reject) => console.log("reject")
    );
  } else if (type == "design") {
    return FetchAllDesigns().then(
      (resolve) => {
        // console.log("resolve");
        // console.log(resolve);
        console.log("in designs")
        matchedResults.designs = resolve;
        return matchedResults;
      },
      (reject) => console.log("reject")
    );
  }
};

export default SearchEngine;
