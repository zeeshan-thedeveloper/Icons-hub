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
import { Markup } from "interweave";

import ColorPicker from "./ColorPicker";
import { TouchAppRounded } from "@mui/icons-material";
import resizeSVG from "../../../../../SVGManagerAPI/SVGSizeModifierAPI";
import {
  findPrimaryColorPosition,
  getPrimaryColorKey,
  SVGColorReplacer,
} from "../../../../../SVGManagerAPI/SVGColorReplacerAPI";
import { hexToRgb } from "../../../../../SVGManagerAPI/HexaToRgbCovertor";
export default function AddNewIllustration() {
  const [listOfSelectedCatagories, setListOfSelectedCatagories] = useState([]);
  const [listOfSelectedTags, setListOfSelectedTags] = useState([]);
  const [listOfSelectedLanguage, setListOfSelectedLanguage] = useState([]);
  const [
    listOfUniqueDetectedPrimaryColors,
    setListOfUniqueDetectedPrimaryColors,
  ] = useState(null);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [listOfCatagories, setListOfCatagories] = useState([]);
  const [listOfTags, setListOfTags] = useState([]);
  const [svgToDisplay, setSvgToDisplay] = useState(null);
  const [originalSVG, setOriginal] = useState(null);
  const [primaryColorsPosition, setPrimaryColorsPosition] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [waitingMessage, setWaitingMessage] = useState("");

  const [targetColor, setTargetColor] = useState({
    currentValue: null,
    prevValue: null,
    colorKey: null,
  });

  const [primaryColors, setPrimaryColors] = useState([
    {
      colorValue: "#68E1FD",
      colorKey: "PC1",
    },
    {
      colorValue: "#CE8172",
      colorKey: "PC2",
    },
    {
      colorValue: "#FFBC0E",
      colorKey: "PC3",
    },
    {
      colorValue: "#FFBC0E",
      colorKey: "PC4",
    },
  ]);

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

  useEffect(() => {
    if (targetColor.currentValue != null) {
      setSvgToDisplay(
        SVGColorReplacer(
          selectedThumbnail,
          svgToDisplay,
          primaryColors,
          primaryColorsPosition,
          targetColor
        )
      );
    }
  }, [targetColor]);

  useEffect(() => {
    if (selectedFile != null) {
      try {
        var file = selectedFile.target.files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function (progressEvent) {
          let tempStoage = [];
          let tempPrimaryColorPosition = findPrimaryColorPosition(
            this.result,
            primaryColors
          ).map((item, index) => {
            let isAlreadyPresent = false;
            tempStoage.filter((innerItem, index) => {
              if (innerItem.colorValue === item.colorValue) {
                isAlreadyPresent = true;
              }
            });
            tempStoage.push(item);
            if (!isAlreadyPresent) return item;
          });
          tempPrimaryColorPosition = tempPrimaryColorPosition.filter(function (
            element
          ) {
            return element !== undefined;
          });
          setSvgToDisplay(resizeSVG(this.result));
          // setSelectedThumbnail(resizeSVG(this.result));
          setSelectedThumbnail(this.result);
          setListOfUniqueDetectedPrimaryColors(tempPrimaryColorPosition);
          setPrimaryColorsPosition(
            findPrimaryColorPosition(this.result, primaryColors)
          );
        };
      } catch (e) {}
    }
  }, [selectedFile]);

  const handelSelectCatagory = (event) => {
   
    setListOfSelectedCatagories(
      produce(listOfSelectedCatagories, (draft) => {
        draft.push({ key: new Date().getTime(), label: event.target.value });
        return draft;
      })
    );
  };

  const handeSelectTag = (event) => {
    setListOfSelectedTags(
      produce(listOfSelectedTags, (draft) => {
        draft.push({ key: new Date().getTime(), label: event.target.value });
        return draft;
      })
    );
  };

  const handleFileUpload = (e) => {
    setSelectedFile(e);
  };

  const hanelColorChange = (e) => {
    console.log("Color which is under edit.");
    console.log(e.target.id)
    // setTargetColor(
    //   produce(targetColor, (draft) => {
    //     draft.colorKey = e.target.id;
    //     draft.currentValue = e.target.value;
    //     return draft;
    //   })
    // );

    setTargetColor((prevValue)=>{
      return produce(targetColor,draft=>{
        draft.colorKey=e.target.id;
        draft.currentValue=e.target.value;
        draft.prevValue=prevValue.currentValue
        console.log("Updated taget color ");
        console.log(draft);
        return draft;
      }) 
    })
  };

  const handelSave = () => {
    if (
      title != null &&
      svgToDisplay != null &&
      description != null &&
      listOfSelectedCatagories.length != 0 &&
      listOfSelectedTags.length != 0
    
    ) {
      setWaitingMessage("Please wait Inserting new tag");
      const data = {
        IllustrationTitle: title,
        IllustrationThumbnail: svgToDisplay,
        IllustrationDescription: description,
        attachedCatagories: listOfSelectedCatagories,
        attachedTags: listOfSelectedTags,
        originalIllustration:selectedThumbnail
      };

      fetch("/api/AdminPanel_api/add_new_illustration_api", {
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
            setWaitingMessage("Successfully inserted");
          } else if (data.responseCode === 2) {
            setWaitingMessage("Try again");
          } else {
          }
        });
    }
  };

  // console.log(svgToDisplay);

  return (
    <form className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              New Illustration
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
                  defaultValue={""}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Write a few sentences about desing.
                </p>
              </div>
            </div>

            <hr />

            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Illustration
            </label>

            <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                <div className="flex justify-center">
                  {selectedThumbnail != null ? (
                    <div>
                      <p className="pb-2">Detected colors</p>
                      {listOfUniqueDetectedPrimaryColors != null ? (
                        <div>
                          {listOfUniqueDetectedPrimaryColors.map(
                            (item, index) => {
                              let rgb = hexToRgb(item.colorValue);
                              let fondColor = getPrimaryColorKey(primaryColors,item.colorValue);
                              console.log("Found color key")
                              console.log(fondColor);
                              return (
                                <div key={index}>
                                  {/* <ColorPicker
                                    colorsConverted={rgb}
                                    hanelColorChange={hanelColorChange}
                                    id={item.colorKey}
                                  /> */}
                                  <ColorPicker
                                    colorsConverted={rgb}
                                    hanelColorChange={hanelColorChange}
                                    id={fondColor.colorKey}
                                  />
                                </div>
                              );
                            }
                          )}
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="flex justify-center">
                  {/* Svg here */}
                  <div style={{ marginTop: "2rem" }}>
                    <div dangerouslySetInnerHTML={{ __html: svgToDisplay }} />
                  </div>
                </div>
                <div className="flex justify-center">
                  {/* File upload here */}

                  <div>
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="blue"
                      fill="none"
                      viewBox="1 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 01 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className=" text-sm text-gray-600">
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
                          if (e) handleFileUpload(e);
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
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
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handelSave}
          >
            Save
          </button>
          {waitingMessage}
        </div>
      </div>
    </form>
  );
}
