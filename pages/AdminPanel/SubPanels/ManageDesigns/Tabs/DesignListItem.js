import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import EditDesignModal from "./EditDesignModal";
import DeleteDesignModal from "./DeleteDesignModal";
import DesignDownloadingHistory from "./DesignDownloadingHistory";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function DesignListItem({setShouldListReload,...props}) {
  const [selectedItem, setSelectedItem] = useState({});
  const [isEditDesignModalOpen, setIsEditDesignModalOpen] = useState(false);
  const [isDeleteDesignModalOpen, setIsDeleteDesignModalOpen] = useState(false);
  const [isDownloadHistroyModalOpen, setIsDownloadHistroyModalOpen] =
    useState(false);
  useEffect(() => {
    setSelectedItem(props.item);
  }, [props.item]);

  return (
    <div
      className="
    transform  hover:bg-white-500 transition duration-400 hover:scale-110 shadow-lg 
    relative p-4  bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col
    "
    >
      <div className="pb-1 grid grid-cols-2">
        <div className="w-40 pb-1">
          <p className="text-sm mt-0">{selectedItem.designTitle}</p>
        </div>

        <div className="text-right ml-10">
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="inline-flex justify-center">
                <DotsVerticalIcon
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
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        style={{ cursor: "pointer" }}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={() => {
                          window.open(selectedItem.designCanvaLink, "_blank");
                        }}
                      >
                        View Design
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        style={{ cursor: "pointer" }}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={() => {
                          setShouldListReload(false);
                          setIsEditDesignModalOpen(true);
                        }}
                      >
                        Edit design
                      </div>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <div
                        style={{ cursor: "pointer" }}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={() => {
                          setIsDeleteDesignModalOpen(true);
                        }}
                      >
                        Delete design
                      </div>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <div
                        style={{ cursor: "pointer" }}
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                        onClick={() => {
                          setIsDownloadHistroyModalOpen(true);
                        }}
                      >
                        Downloading history
                      </div>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div
        className="p-4 lg:p-2 cursor-pointer md:p-2 sm:p-2"
        onClick={(e) => {
          setIsEditDesignModalOpen(true);
        }}
      >
        <img width={"90%"} src={selectedItem.designThumbnail} />
      </div>
      {
        <DesignDownloadingHistory
          selectedItem={selectedItem}
          isOpen={isDownloadHistroyModalOpen}
          setIsOpen={setIsDownloadHistroyModalOpen}
        />
      }
      {
        <DeleteDesignModal
          selectedItem={selectedItem}
          isOpen={isDeleteDesignModalOpen}
          setIsOpen={setIsDeleteDesignModalOpen}
        />
      }
      {
        <EditDesignModal
          selectedItem={selectedItem}
          isOpen={isEditDesignModalOpen}
          setIsOpen={setIsEditDesignModalOpen}
          setShouldListReload={setShouldListReload}
        />
      }
    </div>
  );
}

export default DesignListItem;
