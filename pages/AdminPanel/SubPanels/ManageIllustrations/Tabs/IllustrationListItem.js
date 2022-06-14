import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import EditIllustrationModal from "./EditIllustrationModal";
import DeleteIllustrationModal from "./DeleteIllustrationModal";
import IllustrationDownloadingHistory from "./IllustrationDownloadingHistory";
import { Markup } from "interweave";
import resizeSVG from "../../../../../SVGManagerAPI/SVGSizeModifierAPI";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function IllustrationListItem(props) {
  const [selectedItem, setSelectedItem] = useState({});
  const [svgToDisplay,setSvgToDisplay]=useState(null);
  const [isEditIllustrationModalOpen, setIsEditIllustrationModalOpen] =
    useState(false);
  const [isDeleteIllustrationModalOpen, setIsDeleteIllustrationModalOpen] =
    useState(false);
  const [isDownloadHistroyModalOpen, setIsDownloadHistroyModalOpen] =
    useState(false);
  useEffect(() => {
    setSelectedItem(props.item);
  }, [props.item]);

  useEffect(()=>{
    if(Object.keys(selectedItem).length != 0)
    {
      setSvgToDisplay(selectedItem)
    }
  },[selectedItem])

  return (
    <div
      className="
    transform  hover:bg-white-500 transition duration-400 hover:scale-110 shadow-lg 
    relative p-4  bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col"
    >
      <div className="pb-1 grid grid-cols-2">
        <div className="w-40 pb-1">
          <p className="text-lg mt-0">{selectedItem.IllustrationTitle}</p>
        </div>
        <div className="text-right">
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
                          window.open(
                            selectedItem.IllustrationCanvaLink,
                            "_blank"
                          );
                        }}
                      >
                        View Illustration
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
                          setIsEditIllustrationModalOpen(true);
                        }}
                      >
                        Edit Illustration
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
                          setIsDeleteIllustrationModalOpen(true);
                        }}
                      >
                        Delete Illustration
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
      <div>
        <div
          className="cursor-pointer"
          style={{ marginLeft: "0rem" }}
          onClick={() => {
            setIsEditIllustrationModalOpen(true);
          }}
        >
          {
            (svgToDisplay!=null) ? (<div>
              <div
                dangerouslySetInnerHTML={{
                  __html: resizeSVG(svgToDisplay.IllustrationThumbnail),
                }}
              />
            </div>) : (<div></div>)
          } 
        </div>
      </div>
      {
        <IllustrationDownloadingHistory
          selectedItem={selectedItem}
          isOpen={isDownloadHistroyModalOpen}
          setIsOpen={setIsDownloadHistroyModalOpen}
        />
      }
      {
        <DeleteIllustrationModal
          selectedItem={selectedItem}
          isOpen={isDeleteIllustrationModalOpen}
          setIsOpen={setIsDeleteIllustrationModalOpen}
        />
      }
      {
        <EditIllustrationModal
          selectedItem={selectedItem}
          isOpen={isEditIllustrationModalOpen}
          setIsOpen={setIsEditIllustrationModalOpen}
        />
      }
    </div>
  );
}

export default IllustrationListItem;
