import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { ExclamationIcon, XIcon } from "@heroicons/react/outline";
/* This example requires Tailwind CSS v2.0+ */
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function SelectLanguageDialog({
  open = false,
  handleClose,
  languages = [],
}) {
  const cancelButtonRef = useRef(null);
  const [selectedLanguage, setSelectedLanguage] = useState({});
  useEffect(() => {
    setSelectedLanguage(languages[0]);
  }, [languages]);
  const handleGotoDesignLink = () => {
    window.open(selectedLanguage.referLink);
    handleClose();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto "
        initialFocus={cancelButtonRef}
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
            <Dialog.Overlay className="fixed inset-0 bg-gray-300 bg-opacity-20 transition-opacity" />
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
              className="inline-block 
            align-bottom bg-white rounded-lg px-1 w-1/4 pt-5 pb-4 
            text-left overflow-hidden shadow-xl transform 
            transition-all sm:my-8 sm:align-middle sm:p-6"
            >
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
              <div>
                <div className="mt-1 mb-2 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium"
                  >
                    Select Language
                  </Dialog.Title>
                  <div className=" mt-2">
                    <Menu
                      as="div"
                      className=" relative inline-block text-left "
                    >
                      <div>
                        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                          {selectedLanguage != {}
                            ? selectedLanguage.label
                            : Language}
                          <ChevronDownIcon
                            className="-mr-1 ml-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items
                          className="origin-top-right 
                         absolute   right-0 mt-2 w-56 rounded-md shadow-lg  
                         bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                        >
                          {languages.map((language, index) => (
                            <div className="py-1" key={`language_${index}`}>
                              <Menu.Item
                                onClick={(e) => {
                                  e.preventDefault();
                                  setSelectedLanguage(language);
                                }}
                              >
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    {language.label}
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
              <div className="mt-20 text-center">
                <button
                  type="button"
                  className="w-3/4 inline-flex  justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-800 text-base font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:col-start-2 sm:text-sm"
                  onClick={handleGotoDesignLink}
                >
                  Continue
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
