import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import Title from "./Components/title";
import TopSearchBarContainer from "./Components/topSearchBarContainer";
import Layout from "./Components/layout";
// routing
import Link from "next/link";
import { useRouter } from "next/router";
// modals
import ShowDesignModal from "./Components/showDesignModal";
import DownloadIllustrationModal from "./Components/downloadIllustrationModal";
import IllustrationCard from "./Components/illustrationCard";
import DesignCard from "./Components/designCard";
import CategoryCard from "./Components/categoryCard";
import resizeSVG from "../SVGManagerAPI/SVGSizeModifierAPI";
import primaryColors from "../SVGManagerAPI/PrimaryColors";
import SearchEngine from "../SVGManagerAPI/SearchEngine";

function Index(props) {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/FrontEnd_api/load_newest_illustrations_api", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(
        (resp) => {
          return resp.json();
        },
        (error) => {
          console.log(error);
        }
      )
      .then((data) => {
        if (data.responseCode == 1) {
          // console.log(data.responsePayload);
          setfetchedNewestIllustrationFromAPI(data.responsePayload);
        } else {
          console.log(data.responseMessage);
        }
      });
  }, []);
  useEffect(() => {
    fetch("/api/FrontEnd_api/load_newest_designs_api", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(
        (resp) => {
          return resp.json();
        },
        (error) => {
          console.log(error);
        }
      )
      .then((data) => {
        if (data.responseCode == 1) {
          console.log(data.responsePayload);
          setfetchedNewestDesignsFromAPI(data.responsePayload);
        } else {
          console.log(data.responseMessage);
        }
      });
  }, []);
  useEffect(() => {
    fetch("/api/FrontEnd_api/load_most_popular_illustrations_api", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(
        (resp) => {
          return resp.json();
        },
        (error) => {
          console.log(error);
        }
      )
      .then((data) => {
        if (data.responseCode == 1) {
          //  console.log(data.responsePayload);
          setfetchedPopularIllustrationFromAPI(
            data.responsePayload.map((item) => item.allFields)
          );
          // setfetchedPopularIllustrationFromAPI(data.responsePayload);
        } else {
          console.log(data.responseMessage);
        }
      });
  }, []);
  useEffect(() => {
    fetch("/api/FrontEnd_api/load_most_popular_designs_api", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(
        (resp) => {
          return resp.json();
        },
        (error) => {
          console.log(error);
        }
      )
      .then((data) => {
        if (data.responseCode == 1) {
          // console.log(data.responsePayload);
          setfetchedPopularDesignsFromAPI(
            data.responsePayload.map((item) => item.allFields)
          );
          // setfetchedPopularIllustrationFromAPI(data.responsePayload);
        } else {
          console.log(data.responseMessage);
        }
      });
  }, []);
  useEffect(() => {
    fetch("/api/FrontEnd_api/load_all_categories_api", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(
        (resp) => {
          return resp.json();
        },
        (error) => {
          console.log(error);
        }
      )
      .then((data) => {
        if (data.responseCode == 1) {
          // console.log("---------");
          // console.log(data.responsePayload);
          setFetchedCategoriesFromAPI(data.responsePayload);
        } else {
          console.log(data.responseMessage);
        }
      });
  }, []);
  // let iteraotor;

  // const [fetchedCategories, setFetchedCategories] = useState([]);

  // useEffect(() => {
  //   iteraotor = fetchMoreCategories();
  //   setFetchedCategories(iteraotor.next().value);
  //   console.log("in use effect");
  // });

  // //genratorfor categories
  // function* fetchMoreCategories() {
  //   let index = 9;
  //   while (index < categories.length) {
  //     yield categories.slice(index, index + 9);
  //     index = index + 9;
  //     console.log(index);
  //   }
  // }
  const [newIllustrations, setNewIllustrations] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ]);
  const [popularIllustrations, setPopularIllustrations] = useState([
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
  ]);
  const [
    fetchedNewestIllustrationFromAPI,
    setfetchedNewestIllustrationFromAPI
  ] = useState([]);
  const [fetchedNewestDesignsFromAPI, setfetchedNewestDesignsFromAPI] =
    useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
  const [
    fetchedPopularIllustrationFromAPI,
    setfetchedPopularIllustrationFromAPI
  ] = useState([]);
  const [fetchedPopularDesignsFromAPI, setfetchedPopularDesignsFromAPI] =
    useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
  const [fetchedCategoriesFromAPI, setFetchedCategoriesFromAPI] = useState([]);

  useEffect(() => {
    const EST_WIDTH = "300";
    const EST_HEIGHT = "200";
    const EST_VIEWBOX = `viewBox="40 -10 400 300"`;
    const MOBILEORDESKTOP = 1; // 1 for desktop, 0 for mobile

    let resizedDataForNewestIllustration = fetchedNewestIllustrationFromAPI.map(
      (illustration, index) => {
        //  console.log(illustration.originalIllustration)
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
          originalIllustration: illustration.originalIllustration
        };
      }
    );
    let resizedDataForPopularIllustartion =
      fetchedPopularIllustrationFromAPI.map((illustration, index) => {
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
          originalIllustration: illustration.originalIllustration
        };
      });
    setNewIllustrations([...resizedDataForNewestIllustration]);
    setPopularIllustrations([...resizedDataForPopularIllustartion]);
    setCurrentPrimaryColors(primaryColors);
  }, [fetchedNewestIllustrationFromAPI, fetchedPopularIllustrationFromAPI]);
  // local states

  const [currentPrimaryColors, setCurrentPrimaryColors] = useState([]);

  // handlers
  const handleSeeMoreCategoriesClick = () => {
    alert("show more");
    // setFetchedCategories((prev) => [...prev, ...iteraotor.next().value]);
  };

  const handleGetSerachText = (searchValue, type) => {
    router.push({
      pathname: "/Search",
      query: { type, searchValue }
    });
  };
  // return component
  return (
    <div className="mx-auto  lg:py-24">
      <div className="sm:px-44">
        <TopSearchBarContainer handleGetSerachText={handleGetSerachText} />
      </div>
      {/* categories*/}
      <div className="mt-40 bg-gray-900">
        <div className="sm:px-20 px-4  space-y-12 py-10">
          <Title title={`Categories`} color={`text-white`} />
          <ul
            role="list"
            className="space-y-4 grid grid-cols-2 gap-2 bg-gray-900 sm:space-y-0  lg:grid-cols-5 lg:gap-8"
          >
            {fetchedCategoriesFromAPI.map((category, index) => (
              <li
                key={`category_${index}`}
                className="py-10 px-4 border cursor-pointer bg-white text-center rounded-lg xl:px-4 xl:text-left"
              >
                <CategoryCard category={category} />
              </li>
            ))}
          </ul>
          <div className="space-y-5 pb-4 sm:space-y-4  md:max-w-xl lg:max-w-3xl xl:max-w-none"></div>
        </div>
      </div>

      {/*illutration */}
      <div className="space-y-12 mt-20">
        <div className="sm:px-20 px-4  space-y-12 py-10">
          <Title title={`New Illustration`} />
          <ul
            role="list"
            className="space-y-4 grid grid-cols-2 gap-2  sm:space-y-0 lg:grid-cols-5 lg:gap-8"
          >
            {newIllustrations.map((illustraion, index) => (
              <li
                key={`newIllustraion_${index}`}
                className="pb-6  border cursor-pointer  text-center rounded-lg  text-center"
              >
                <IllustrationCard
                  illustraion={illustraion}
                  primaryColors={currentPrimaryColors}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-15 mt-20 bg-gray-100">
        <div className="sm:px-20 px-4  space-y-12 py-10">
          <Title title={`Most Popular Illustration`} />
          <ul
            role="list"
            className="space-y-4 grid grid-cols-2 gap-2  sm:space-y-0 lg:grid-cols-5 lg:gap-8"
          >
            {popularIllustrations.map((illustraion, index) => (
              <li
                key={`popularIllustration_${index}`}
                className="pb-6  bg-white cursor-pointer  text-center rounded-lg  text-center"
              >
                <IllustrationCard
                  illustraion={illustraion}
                  primaryColors={currentPrimaryColors}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Designs */}
      <div className="space-y-12 mt-20 ">
        <div className="sm:px-20 sm:mx-20 mx-4 space-y-12 py-10 ">
          <Title title={`New Designs`} />
          <ul
            role="list"
            className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6  sm:space-y-0 lg:grid-cols-2 lg:gap-8"
          >
            {fetchedNewestDesignsFromAPI.map((design, index) => (
              <li
                key={`design_${index}`}
                className="pb-8  border cursor-pointer  text-center rounded-lg xl:text-left"
              >
                <DesignCard design={design} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-12 mt-20 bg-gray-900 pb-10">
        <div className="sm:px-20 sm:mx-20 mx-4  space-y-12 py-10 ">
          <Title title={`Most Popular Designs`} color={`text-white`} />
          <ul
            role="list"
            className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6  sm:space-y-0 lg:grid-cols-2 lg:gap-8"
          >
            {fetchedPopularDesignsFromAPI.map((design, index) => (
              <li
                key={`design_${index}`}
                className="pb-8 cursor-pointer bg-white  text-center rounded-lg xl:text-left"
              >
                <DesignCard design={design} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Index;

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
