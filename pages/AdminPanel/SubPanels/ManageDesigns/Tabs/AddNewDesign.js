/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import produce from "immer";
import { useEffect, useState } from "react";
import ChipsList from "../../../Support/ChipsList";
import SelectSecondaryLangaugeModal from "./SelectSecondaryLangaugeModal";

export default function AddNewDesign() {
  
  const [listOfSelectedCatagories, setListOfSelectedCatagories] = useState([]);
  const [isAddSecondaryLanguageModalOpen, setIsAddSecondaryLaguageModalOpen] =
    useState(false);
  const [listOfSelectedTags, setListOfSelectedTags] = useState([]);
  const [listOfSecondaryLanguages, setListOfSecondaryLanguages] = useState([]);
  const [primaryLanguage, setPrimaryLanguage] = useState("English");
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [title, setTitle] = useState();
  const [referLink, setReferLink] = useState(null);
  const [description, setDescription] = useState(null);
  const [waitingMessage, setWaitingMessage] = useState("");
  const [shouldLoadList, setShouldLoadtist] = useState(false);
  const [listOfCatagories, setListOfCatagories] = useState([]);
  const [listOfTags, setListOfTags] = useState([]);

  
  useEffect(()=>{
    if(listOfCatagories.length!=0 && listOfTags!=0){
      
      setListOfSelectedCatagories(
        produce(listOfSelectedCatagories, (draft) => {
          draft.push({ key: new Date().getTime(), label: listOfCatagories[0].title});
          return draft;
        })
      );

      setListOfSelectedTags(
        produce(listOfSelectedTags, (draft) => {
          draft.push({ key: new Date().getTime(), label: listOfTags[0].title });
          return draft;
        })
      );
    }

   
  },[listOfCatagories,listOfTags]);

  useEffect(() => {
    // Loading catagories and tags.
    fetch("/api/AdminPanel_api/load_catagories_api", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
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
        console.log(data);
        if (data.responseCode === 1) {
          setListOfCatagories(data.responsePayload);
        } else if (data.responseCode === 2) {
          console.log(data);
        } else {
        }
      });
    fetch("/api/AdminPanel_api/load_tags_api", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
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
        console.log(data);
        if (data.responseCode === 1) {
          setListOfTags(data.responsePayload);
        } else if (data.responseCode === 2) {
          console.log(data);
        } else {
        }
      });
  }, []);

  const handelSelectCatagory = (event) => {
    let item = null;
    listOfCatagories.forEach((cat) => {
      if (cat.title === event.target.value) {
        item = cat;
      }
    });
    if (item != null) {
      setListOfSelectedCatagories(
        produce(listOfSelectedCatagories, (draft) => {
          draft.push({
            key:item._id,
            label: event.target.value,
          });
          return draft;
        })
      );
    }
  };

  const handeSelectTag = (event) => {
    let item = null;
    listOfTags.forEach((tag) => {
      if (tag.title === event.target.value) {
        item = tag;
      }
    });
    if (item != null) {
      setListOfSelectedTags(
        produce(listOfSelectedTags, (draft) => {
          draft.push({ key:item._id, label: event.target.value });
          return draft;
        })
      );
    }
  };

  const handelSave = () => {
    if (
      title != null &&
      referLink != null &&
      selectedThumbnail != null &&
      description != null &&
      listOfSelectedCatagories.length != 0 &&
      listOfSelectedTags.length != 0 &&
      listOfSecondaryLanguages.length != 0
    ) {
      setWaitingMessage("Please wait Inserting new tag");
      const data = {
        designTitle: title,
        designCanvaLink: referLink,
        designThumbnail: selectedThumbnail,
        designDescription: description,
        attachedCatagories: listOfSelectedCatagories,
        attachedTags: listOfSelectedTags,
        attachedLanguages: listOfSecondaryLanguages,
      };

      fetch("/api/AdminPanel_api/add_new_design_api", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
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
          console.log(data);
          if (data.responseCode === 1) {
            setShouldLoadtist(true);
            setWaitingMessage("Successfully inserted");
          } else if (data.responseCode === 2) {
            setWaitingMessage("Try again");
          } else {
          }
        });
    }
  };
  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              New Desing
            </h3>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="titleLink"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Title
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="titleLink"
                    id="titleLink"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoComplete="titleLink"
                    className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="canvaLink"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Refer Link
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="canvaLink"
                    id="canvaLink"
                    value={referLink}
                    onChange={(e) => setReferLink(e.target.value)}
                    autoComplete="canvaLink"
                    className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="about"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Description
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
                  
                />
                <p className="mt-2 text-sm text-gray-500">
                  Write a few sentences about designing
                </p>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Cover photo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <div>
                      {selectedThumbnail != null ? (
                        <div style={{ height: "12rem", width: "12rem" }}>
                          <img src={selectedThumbnail} />
                        </div>
                      ) : (
                        <div>
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="1 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={(e) => {
                            // setSelectedThumbnail(e.target.files[0])
                            var reader = new FileReader();
                            reader.readAsDataURL(e.target.files[0]);
                            reader.onload = function () {
                              setSelectedThumbnail(reader.result);
                            };
                            reader.onerror = function (error) {
                              console.log("Error: ", error);
                            };
                          }}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div className="sm:grid lg:grid lg:grid-cols-1 sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="catagory"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Select Catagory
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <select
                id="catagory"
                name="catagory"
                autoComplete="catagory"
                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                onChange={handelSelectCatagory}
              >
                {listOfCatagories.map((item, index) => {
                  return (
                    <option id={index} key={index}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <ChipsList
                data={listOfSelectedCatagories}
                setData={setListOfSelectedCatagories}
              />
            </div>
          </div>

          <div className="sm:grid lg:grid lg:grid-cols-1 sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Select tags
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <select
                id="country"
                name="country"
                autoComplete="country"
                className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                onChange={handeSelectTag}
              >
                {listOfTags.map((item, index) => {
                  return (
                    <option id={index} key={index}>
                      {item.title}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <ChipsList
                data={listOfSelectedTags}
                setData={setListOfSelectedTags}
              />
            </div>
          </div>

          <div className="sm:grid lg:grid lg:grid-cols-1 sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
            <div>{`Primary Language : ${primaryLanguage}`}</div>
            <div>
              {" "}
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={(e) => {
                  setIsAddSecondaryLaguageModalOpen(true);
                }}
              >
                Add/Remove Secondary langauge
              </button>
            </div>
            <div>
              <ChipsList
                isDeleteAllow={false}
                data={listOfSecondaryLanguages}
                setData={setListOfSecondaryLanguages}
              />
            </div>

            {
              <SelectSecondaryLangaugeModal
                listOfSecondaryLanguages={listOfSecondaryLanguages}
                setListOfSecondaryLanguages={setListOfSecondaryLanguages}
                isOpen={isAddSecondaryLanguageModalOpen}
                setIsOpen={setIsAddSecondaryLaguageModalOpen}
              />
            }
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={(e) => {
              handelSave(e);
            }}
          >
            Save
          </button>
          <div>{waitingMessage}</div>
        </div>
      </div>
    </form>
  );
}
