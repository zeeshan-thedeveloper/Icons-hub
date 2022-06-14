/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/outline";
import ColorPicker from "./ColorPicker";
import { hexToRgb } from "../../../../../SVGManagerAPI/HexaToRgbCovertor";
export default function UpdatingRow_ForColor({seletedItem={},updatedColor="#F17013",updatedColorTitle="",setUpdateColorTitle,setUpdatedColor,updateColorInList,...props}) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [convertedColor,setConvertedColor]=useState(null);

  const [serverResponse,setServerResponse]=useState("");
 
  useEffect(() => { 
    setOpen(props.isOpen);
    if(Object.keys(seletedItem).length != 0 ){
      console.log("Selected item for updated ")
      console.log(seletedItem)
      setConvertedColor(hexToRgb(seletedItem.color))
    }
  }, [props.isOpen]);
  
  const handelUpdate = () => {
    setServerResponse("Updating.. Please wait")
    console.log("Selected item")
    console.log(seletedItem);
    const data = {
      title: updatedColorTitle,
      color: updatedColor,
      _id:seletedItem._id,
    };
    console.log(data);

    fetch("/api/AdminPanel_api/update_colors_api", {
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
          props.setIsOpen(false);
          setOpen(false);
          updateColorInList();
          setServerResponse("");
        } else if (data.responseCode === 2) {
          setServerResponse("Try again")
        } else {
          setServerResponse("Fatal Error")
        }
      });
  };

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
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                  <XCircleIcon
                    className="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="mt-3  sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    Update
                  </Dialog.Title>
                  <div className="mt-2 text-center">
               
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Color Title
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="email"
                          id="email"
                          value={updatedColorTitle}
                          onChange={(e) => setUpdateColorTitle(e.target.value)}
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Example: Social Media"
                        />
                      </div>
                    </div>
                    <div style={{height:'20rem'}}>
                      {
                        (convertedColor!=null) ? (
                          <ColorPicker intialColor={convertedColor} setHexColor={setUpdatedColor}/>   
                        ) : (<div></div>)
                      }
                    </div>
                    <div>
                      {serverResponse}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={(e) => {
                    // setOpen(false);
                    // props.setIsOpen(false);
                    // props.updateColorInList(e);
                    handelUpdate()
                  }}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={(e) => {
                    setOpen(false);
                    props.setIsOpen(false);
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
