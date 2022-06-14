import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import ChipsList from "../../../Support/ChipsList";
import produce from "immer";
export default function SelectSecondaryLangaugeModal(props) {
  const [open, setOpen] = useState(false);
  const [listOfSelectedLanguages, setListOfSelectedLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [referLink, setReferLink] = useState(null);
  const [listOfLanguages, setListOfLanguages] = useState([]);

  
  useEffect(() => {
    
  }, []);

  useEffect(() => {
    setOpen(props.isOpen);
    setListOfSelectedLanguages(props.listOfSecondaryLanguages);
    // Loading catagories and tags.
    fetch("/api/AdminPanel_api/load_languges_api", {
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
          console.log("Loaded payload")
          console.log(data.responsePayload);
          setListOfLanguages(data.responsePayload);
        } else if (data.responseCode === 2) {
          console.log(data);
        } else {
        }
      });
    
  }, [props.isOpen]);

  const cancelButtonRef = useRef(null);

  const handeLanguageDropDown = (e) => {
    setSelectedLanguage(e.target.value);
  };
  const handelAddLanguage = (e) => {
    setListOfSelectedLanguages(
      produce(listOfSelectedLanguages, (draft) => {
        if (selectedLanguage != null && referLink != null)
          draft.push({ key: new Date().getTime(), label: selectedLanguage,referLink:referLink });
        return draft;
      })
    );
  };
  const handelSaveChange=()=>{
    props.setListOfSecondaryLanguages(listOfSelectedLanguages);
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setOpen(false);
          props.setIsOpen(false);
        }}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div>
                  <label
                    htmlFor="country"
                    className="block pb-4 text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                  >
                    Select Secondary langauges
                  </label>
                  <div className="sm:grid p-3 sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="titleLink"
                      className="block  text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Refer Link
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg  flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="titleLink"
                          id="titleLink"
                          value={referLink}
                          onChange={(e) => setReferLink(e.target.value)}
                          autoComplete="titleLink"
                          className="flex-1  block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:grid p-3 sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="titleLink"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Select Language
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex rounded-md shadow-sm">
                        <select
                          id="country"
                          name="country"
                          autoComplete="country"
                          className=" block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                          onChange={handeLanguageDropDown}
                        >
                          {listOfLanguages.map((item, index) => {
                            return (
                              <option id={index} key={index}>
                                {item.language_title}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div>
                      {" "}
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={(e) => {
                          handelAddLanguage(e);
                        }}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="overflow-y-auto mt-2" style={{height:'10rem'}}>
                    <ChipsList
                      data={listOfSelectedLanguages}
                      setData={setListOfSelectedLanguages}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                   
                    handelSaveChange();
                    props.setIsOpen(false);
                    setOpen(false);
                  }}
                >
                  Save changes
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                  onClick={() => {
                    props.setIsOpen(false);
                    setOpen(false);
                  }}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
