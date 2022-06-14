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
import { Fragment, useState,useEffect } from "react";
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
  ACTIVE_USERS,
  ADD_NEW_DESIGN,
  BLOCKED_USERS,
  DOWNLOAD_CSV,
  DOWNLOAD_HISTORY_DESIGNS,
  SORT_BY_ALL_TIME,
  SORT_BY_LAST_30_DAYS,
  SORT_BY_LAST_7_DAYS,
  SORT_BY_LAST_90_DAYS,
  VIEW_ALL_USERS,
} from "../../../../Values/strings";

import ViewAllUsers from "./Tabs/ViewAllUsers";

import produce from "immer";
import BlockedUsers from "./Tabs/BlockedUsers";
import ActiveUsers from "./Tabs/ActiveUsers";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ManageUsers(props) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [subCategories, setSubCategories] = useState([
    { name: VIEW_ALL_USERS, current: true },
    // { name: ACTIVE_USERS, current: false },
    // { name: BLOCKED_USERS, current: false },
    { name: DOWNLOAD_CSV, current: false },
  ]);
  const [sortOptions, setSortOptions] = useState([
    { name: SORT_BY_ALL_TIME, current: true },
    { name: SORT_BY_LAST_90_DAYS, current: false },
    { name: SORT_BY_LAST_30_DAYS, current: false },
    { name: SORT_BY_LAST_7_DAYS, current: false },
  ]);
  const [currentOpenTab, setCurrentOpenTab] = useState(<ViewAllUsers />);
  const [listOfUsers, setListOfUsers] = useState([]);

  const [shouldListReload, setShouldListReload] = useState(false);
  const [serverResponse, setServerResponse] = useState("Loading...");

  useEffect(() => {
    setShouldListReload(true);
  }, []);
  useEffect(() => {
    // Load designs.
    console.log("We are trying to relaoad the list.");
    if (shouldListReload) {
      fetch("/api/AdminPanel_api/download_downloading_history_of_user_api", {
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
            console.log("Loaded history");
            console.log(data.responsePayload);
            setServerResponse("");
            // setListOfAllIllustrations(data.responsePayload);
            let tempArray = [];
            data.responsePayload.forEach((item, index) => {
              let tempDownHist = [];
              let counter=0;
              item.dowloadedIllustrations.forEach((illus,illusIndex)=>{
                tempDownHist.push({
                  downloadId:counter,
                  downloadItemType:"Illustration",
                  downloadItemTitle:illus.illstrationTitle,
                  downloadDateAndTime:"-",
                })
                counter++;
              })

              item.dowloadedDesigns.forEach((design,illusIndex)=>{
                tempDownHist.push({
                  downloadId:counter,
                  downloadItemType:"Design",
                  downloadItemTitle:design.downloadedDesignTitle,
                  downloadDateAndTime:"-",
                })
                counter++;
              })

              tempArray.push({
                _id:item._id,
                downloadId:index,
                userEmail: item.email,
                userName: item.firstName,
                userCountry: item.country,
                userAccountStatus:item.userAccountStatus,
                userWebsite: item.websiteLink,
                userDownloadingHistor:tempDownHist
              });

             
            });
            setListOfUsers(tempArray);
          } else if (data.responseCode === 2) {
            console.log(data);
            setServerResponse(data.responseMessage);
          } else {
          }
        });
    }
  }, [shouldListReload]);



  const handelTabChange = (value) => {
    switch (value) {
      case VIEW_ALL_USERS:
        setCurrentOpenTab(<ViewAllUsers listOfUsers={listOfUsers} />);
        break;
      case BLOCKED_USERS:
        setCurrentOpenTab(<BlockedUsers />);
        break;
      case ACTIVE_USERS:
        setCurrentOpenTab(<ActiveUsers />);
        break;
      case DOWNLOAD_CSV:
        handelDownloadCSV();
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

  const handelDownloadCSV = () => {
    const title = "_all_users";
    let rows = [];
    listOfUsers.forEach((item) => {
      // userEmail: "abc@gmail.com",
      // userName: "ABC",
      // userAccountStatus: "Active",
      // userCountry: "Pakistan",
      // userWebsite: "something.com",
      rows.push([
        item.downloadId,
        item.userEmail,
        item.userName,
        item.userCountry,
        item.userAccountStatus,
        item.userWebsite
      ]);
    });

    let csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${title}.csv`);

    document.body.appendChild(link);
    link.click(); // This will download the data file named "my_data.csv".
    document.body.removeChild(link);
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
                  <h2 className="text-lg font-medium text-gray-900">Manage Users</h2>
                  
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
                <form className="mt-4 border-t border-gray-200">
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
                        onClick={(e)=>{
                            handelTabChange(e.target.outerText)
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
        <main className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-0 pb-6 border-b border-gray-200">
            <div></div>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort by the most downloaded designs/illustrations
                    <ChevronDownIcon
                      className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <div
                              style={{ cursor: "pointer" }}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",

                                "block px-4 py-2 hover:bg-gray-50 text-sm"
                              )}
                            >
                              {option.name}
                            </div>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

             
              <button
                type="button"
                className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Manage Users</span>
                <MenuIcon className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
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
                        onClick={(e)=>{
                            handelTabChange(e.target.outerText)
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
                {/* <div className="border-2 border-groove h-full border-gray-200 rounded-lg h-96 lg:h-full"> */}
                {currentOpenTab}
                {/* </div> */}
                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
