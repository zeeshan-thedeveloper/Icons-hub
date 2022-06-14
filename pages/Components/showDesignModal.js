import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon, XIcon } from "@heroicons/react/outline";
import SvgOrPngDialog from "./svgOrPngDialog";
import SelectLanguageDialog from "./selectLanguageDialog";

export default function ShowDesignModal({
  open = false,
  handleClose,
  selectedDesign = {},
}) {
  //const [open, setOpen] = useState(true)

  // local states
  const [openSelectLanguageDialog, setOpenSelectLanguageDialog] =
    useState(false);
  // handlers
  const handleUseDesignClick = (event) => {
    event.preventDefault();
    if (selectedDesign.attachedLanguages.length > 1) {
      // ask to select language first
      setOpenSelectLanguageDialog(true);
    } else {
      // redirect to canva link
      window.open(selectedDesign.designCanvaLink);
    }
  };
  const handleSelectLanguageDialogClose = () => {
    setOpenSelectLanguageDialog(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleClose}
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
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5
             pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8
              sm:align-middle w-1/2 sm:p-6"
            >
              {/*Language dialog*/}
              <SelectLanguageDialog
                open={openSelectLanguageDialog}
                handleClose={handleSelectLanguageDialogClose}
                // languages={selectedDesign.languages}
                languages={selectedDesign.attachedLanguages}
              />
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500
                   focus:outline-none "
                  onClick={handleClose}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    {selectedDesign.designTitle}
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <img
                          src={selectedDesign.designThumbnail}
                          className="h-50 w-50 rounded-t  xl:w-96 xl:h-96"
                        />
                      </div>
                      <div className="">
                        <div className="flex justify-between">
                          <h1 className="text-3xl"> Steps</h1>
                        </div>
                        <div className="text-gray-500 mb-2 mt-2">
                          {/*<ul className="list list-decimal list-outside ml-4">
                           {selectedDesign.steps.map((step, index) => {
                            <li className="mt-1" key={`designSteps_${index}`}>
                              {step}
                            </li>;
                          }
                          </ul>)} */}
                          <ul className="list list-decimal list-outside ml-4">
                            {selectedDesign.designDescription}
                            {/* {" "}
                            <li className="mt-1">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </li>
                            <li className="mt-1">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </li>
                            <li className="mt-1">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border
                   border-transparent shadow-sm px-4 py-2 bg-blue-800 text-base font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleUseDesignClick}
                >
                  Use Design
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
