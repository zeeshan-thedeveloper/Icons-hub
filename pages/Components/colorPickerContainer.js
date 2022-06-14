import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import ColorPickerForAll from "./colorPickerForAll";
import hexToRgb from "../../SVGManagerAPI/helperFunctions";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ColorPickerContainer({
  handleColorChange,
  currentPrimaryColors=[],
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
          Colors
          <span className="ml-4">
            <img src="https://img.icons8.com/fluency/24/000000/rgb-circle-2.png" />
          </span>
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
          className="origin-top-right absolute
         right-0 mt-2 w-36 text-center rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            {currentPrimaryColors.map((color, index) => {
              const colorsConverted = hexToRgb(color.colorValue);
              return (
                <ColorPickerForAll
                  hanelColorChange={handleColorChange}
                  id={color.colorKey}
                  colorsConverted={colorsConverted}
                  key={color.colorKey}
                />
              );
            })}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
