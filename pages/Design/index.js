import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import Title from "../Components/title";
import Layout from "../Components/layout";
// routing
import Link from "next/link";
import DesignCard from "../Components/designCard";
import filterDesigns from "../../SVGManagerAPI/FilterDesigns";

function Index(props) {
  const [fetchedNewestDesignsFromAPI, setfetchedNewestDesignsFromAPI] =
    useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
  const [fetchedPopularDesignsFromAPI, setfetchedPopularDesignsFromAPI] =
    useState([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);
  const [searchValue, setSearchValue] = useState("");
  const [fetchedSerachResults, setFetchedSerachResults] = useState([]);
  const [serachMessage, setSearchMessage] = useState("");

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
          console.log(data.responsePayload);
          setfetchedPopularDesignsFromAPI(
            data.responsePayload.map((item) => item.allFields)
          );
          // setfetchedPopularIllustrationFromAPI(data.responsePayload);
        } else {
          console.log(data.responseMessage);
        }
      });
  }, []);
  // handlers
  const handleSeeMoreCategoriesClick = () => {
    alert("show more");
    // setFetchedCategories((prev) => [...prev, ...iteraotor.next().value]);
  };

  const handleSerachValueChange = (event) => {
    setSearchValue(event.target.value.toLowerCase());
  };
  const handleSerachButtonClick = (event) => {
    event.preventDefault();
    if (searchValue != "") {
      filterDesigns(searchValue).then(
        (resolve) => {
          console.log("======from Designs page-------------------");
          console.log(resolve);
          setFetchedSerachResults(resolve);
          if (resolve.length == 0) setSearchMessage("no results found");
        },
        (reject) => {
          console.log(reject);
        }
      );
    }
  };
  // return component
  return (
    <div className="mx-auto  lg:py-10">
      <div className="sm:px-20 px-4 ">
        <div className="sm:pb-10 pb-5 pt-5 sm:pt-1">
          <Title title={"Design"} fontSize={"text-6xl"} />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          className={`-ml-px  sm:w-96 w:full inline-flex items-center 
      px-4 py-2 border border-gray-300 bg-white text-sm font-medium 
      text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none 
      focus:ring-1 focus:ring-gray-500 focus:border-gray-500`}
          placeholder="Search..."
          value={searchValue}
          onChange={handleSerachValueChange}
        />
        <button
          type="submit"
          className={`-ml-px inline-flex
       items-center px-10 py-2 rounded-r-md border 
       bg-gray-900 text-white
       border-gray-300 bg-white text-sm font-medium 
      `}
          onClick={handleSerachButtonClick}
        >
          Search
        </button>

        {fetchedSerachResults.length == 0 && (
          <span className="text-gray-500 ml-5"> {serachMessage}</span>
        )}
      </div>

      {fetchedSerachResults.length > 0 && (
        <div className="space-y-12 mt-20 ">
          <div className="sm:px-20 sm:mx-20 mx-4  space-y-12 py-10 ">
            <Title title={`Designs`} />
            <ul
              role="list"
              className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6  sm:space-y-0 lg:grid-cols-2 lg:gap-8"
            >
              {fetchedSerachResults.map((design, index) => (
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
      )}
      {/* Designs */}
      {fetchedSerachResults.length == 0 && (
        <div className="space-y-12 mt-20 ">
          <div className="sm:px-20 sm:mx-20 mx-4  space-y-12 py-10 ">
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
      )}

      {fetchedSerachResults.length == 0 && (
        <div className="space-y-12 mt-20 bg-gray-100 pb-10">
          <div className="sm:px-20 sm:mx-20 mx-4  space-y-12 py-10 ">
            <Title title={`Most Popular Designs`} />
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
      )}
    </div>
  );
}

export default Index;

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
