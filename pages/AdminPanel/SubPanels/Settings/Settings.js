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
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  FilterIcon,
  MinusSmIcon,
  PlusSmIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  MANAGE_TAGS,
  MANAGE_COLORS,
  SORT_BY_ALL_TIME,
  SORT_BY_LAST_30_DAYS,
  SORT_BY_LAST_7_DAYS,
  SORT_BY_LAST_90_DAYS,
  MANAGE_CATAGORIES,
} from "../../../../Values/strings";

import Catagories from "./Tabs/Catagories";
import Colors from "./Tabs/Colors";
import Tags from "./Tabs/Tags";
import produce from "immer";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Settings() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [subCategories, setSubCategories] = useState([
    { name: MANAGE_CATAGORIES, current: true },
    { name: MANAGE_TAGS, current: false },
    { name: MANAGE_COLORS, current: false },
  ]);

  const [sortOptions, setSortOptions] = useState([
    { name: SORT_BY_ALL_TIME, current: true },
    { name: SORT_BY_LAST_90_DAYS, current: false },
    { name: SORT_BY_LAST_30_DAYS, current: false },
    { name: SORT_BY_LAST_7_DAYS, current: false },
  ]);
  const [currentOpenTab, setCurrentOpenTab] = useState(<Catagories />);
  const handelTabChange = (value) => {
    switch (value) {
      case MANAGE_CATAGORIES:
        setCurrentOpenTab(<Catagories />);
        break;
      case MANAGE_TAGS:
        setCurrentOpenTab(<Tags />);
        break;
      case MANAGE_COLORS:
        setCurrentOpenTab(<Colors />);
        break;
      default:
        break;
    }
    setSubCategories(
      produce(subCategories, (draft) => {
        draft.map((item) => {
          if (item.name === value) item.current = true;
          else item.current = false;
          return item;
        });
        return draft;
      })
    );
  };

  return (
    <div className="">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                <div className="px-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Settings</h2>
                  <button
                    type="button"
                    className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form>
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200"
                  >
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <div
                          style={{ cursor: "pointer" }}
                          className={classNames(
                            category.current
                              ? "font-lg  text-blue-900 underline"
                              : "text-gray-500",
                            "block px-4 py-2 hover:bg-gray-50 text-sm"
                          )}
                          onClick={(e) => {
                            handelTabChange(e.target.outerText);
                          }}
                        >
                          {category.name}
                        </div>
                      </li>
                    ))}
                  </ul>
                </form>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="pt-2 text-right">
              <button
                type="button"
                className="p-2  -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <MenuIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
         
          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="text-sm font-medium text-gray-900 space-y-4 pb-6 border-b border-gray-200"
                >
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <div
                        style={{ cursor: "pointer" }}
                        className={classNames(
                          category.current
                            ? "font-lg  text-blue-900 underline"
                            : "text-gray-500",
                          "block px-4 py-2 hover:bg-gray-50 text-sm"
                        )}
                        onClick={(e) => {
                          handelTabChange(e.target.outerText);
                        }}
                      >
                        {category.name}
                      </div>
                    </li>
                  ))}
                </ul>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Replace with your content */}
                <div className="border-2 p-2 border-groove h-full border-gray-200 rounded-lg h-96 lg:h-full">
                  {currentOpenTab}
                </div>
                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
