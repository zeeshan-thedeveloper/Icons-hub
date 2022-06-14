import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationIcon, XIcon } from "@heroicons/react/outline";
import SvgOrPngDialog from "./svgOrPngDialog";
import produce from "immer";
import ColorPickerForAll from "./colorPickerForAll";
import hexToRgb from "../../SVGManagerAPI/helperFunctions";
import primaryColors from "../../SVGManagerAPI/PrimaryColors";

import {
  SVGColorReplacer,
  findPrimaryColorPosition,
} from "../../SVGManagerAPI/SVGColorReplacerAPI";

export default function DownloadIllustrationModal({
  open = false,
  handleClose,
  selectedIllustration = null, //{ svgToDisplay, name,description, primaryColorsPosition })
}) {
  const [svgToDisplay, setSvgToDisplay] = useState(null);
  const [originalSVG, setOriginalSVG] = useState(null);
  const [primaryColorsPosition, setPrimaryColorsPosition] = useState(null);
  const [openSvgOrPngDialog, setOpenSvgOrPngDialog] = useState(false);
  const [currentColors, setCurrentColors] = useState([]);
  const [currentUniqeColors, setCurrentUniqueColors] = useState([]);
  const [targetColor, setTargetColor] = useState({
    currentValue: null,
    prevValue: null,
    colorKey: null,
  });

  const handleColorChange = (e) => {
    let newCurrentColors = currentColors.map((color) => {
      if (color.colorKey == e.target.id) {
        setTargetColor(
          produce(targetColor, (draft) => {
            draft.colorKey = color.colorKey;
            draft.prevValue = color.colorValue;
            draft.currentValue = e.target.value;
            return draft;
          })
        );
        return { colorValue: e.target.value, colorKey: color.colorKey };
      } else return color;
    });
    setCurrentColors(newCurrentColors);
  };

  //remove duplicates
  useEffect(() => {
    if (currentColors.length > 0) {
      console.log("trying to remove duplicate colors");
      console.log(currentColors);
      const uniqueColors = Array.from(
        new Set(currentColors.map((a) => a.id))
      ).map((id) => {
        return currentColors.find((a) => a.id === id);
      });
      setCurrentUniqueColors(uniqueColors);
    }
  }, [currentColors]);

  useEffect(() => {
    if (selectedIllustration != null && svgToDisplay != null) {
      setCurrentColors(
        selectedIllustration.primaryColorsPosition.map((item) => {
          return {
            colorKey: item.colorKey,
            colorValue: svgToDisplay
              .slice(item.colorStartIndex, item.colorEndIndex)
              .slice(6, 13),
          };
        })
      );
    }
  }, [svgToDisplay]);

  useEffect(() => {
    if (selectedIllustration != null) {
      //console.log("inside----------------------------")
      setSvgToDisplay(selectedIllustration.svgToDisplay);
      setOriginalSVG(selectedIllustration.svgToDisplay);
      setPrimaryColorsPosition(selectedIllustration.primaryColorsPosition);
    }
  }, [selectedIllustration]);

  useEffect(() => {
    if (targetColor != null && primaryColorsPosition != null) {
      // whenever there will be a change in target color we will update the SVG.
      setSvgToDisplay(
        SVGColorReplacer(
          originalSVG,
          svgToDisplay,
          primaryColors,
          primaryColorsPosition,
          targetColor
        )
      );
    }
  }, [targetColor, primaryColorsPosition]);

  // handlers
  const handleOpenSvgOrPngDialog = () => {
    setOpenSvgOrPngDialog(true);
  };
  const handleCloseSvgOrPngDialog = () => {
    setOpenSvgOrPngDialog(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => {
          handleClose();
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
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 
            text-left overflow-auto shadow-xl transform transition-all
            sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            >
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500
                   focus:outline-none "
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                {selectedIllustration != null && (
                  <SvgOrPngDialog
                    open={openSvgOrPngDialog}
                    handleClose={handleCloseSvgOrPngDialog}
                    selectedIllustration={svgToDisplay}
                    selectedIllustrationTitle={selectedIllustration.name}
                    selectedIllustrationDescription={
                      selectedIllustration.description
                    }
                    selectedOriginalIllustration={
                      selectedIllustration.originalIllustration
                    }
                    selectedIllustrationId={selectedIllustration.id}
                    fileName={selectedIllustration.name}
                  />
                )}
              </div>
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title className="text-3xl leading-6 font-medium text-gray-900 mb-5">
                    {selectedIllustration != null && selectedIllustration.name}
                  </Dialog.Title>
                  <hr />
                  <div className="mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      {selectedIllustration != null && svgToDisplay != null ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: svgToDisplay,
                          }}
                        />
                      ) : (
                        <div> </div>
                      )}
                      <div className="">
                        <div className="text-gray-700">
                          {selectedIllustration != null &&
                            selectedIllustration.description}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:flex ">
                <div className="flex justify-between mt-5">
                  {currentUniqeColors.length > 0 &&
                    currentUniqeColors.map((color, index) => {
                      const colorsConverted = hexToRgb(color.colorValue);
                      return (
                        <div key={index}>
                          <ColorPickerForAll
                            hanelColorChange={handleColorChange}
                            id={color.colorKey}
                            colorsConverted={colorsConverted}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border
                  float-left
                   border-transparent shadow-sm px-4 py-2 bg-blue-800 text-base
                    font-medium text-white hover:bg-blue-900 focus:outline-none
                     focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleOpenSvgOrPngDialog()}
                >
                  Download
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
