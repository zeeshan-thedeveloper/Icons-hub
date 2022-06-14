/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  const colors = require('tailwindcss/colors')
  
  module.exports = {
    // ...
    theme: {
      extend: {
        colors: {
          cyan: colors.cyan,
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import "tailwindcss/tailwind.css";
import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/outline";
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import produce, { current } from "immer";
import {
  HOME,
  MANAGE_ADMIN_USERS,
  MANAGE_USERS,
  MANAGE_DESIGNS,
  MANAGE_ILLUSTRATIONS,
  SETTINGS,
  PROFILE,
  PROFILE_SETTINGS,
} from "../../../Values/strings";
 
import Home from "./Home/Home";
import ManageAdminUsers from "./ManageAdminUsers/ManageAdminUsers";
import ManageUsers from "./ManageUsers/ManageUsers";
import ManageDesigns from "./ManageDesigns/ManageDesigns";
import ManageIllustrations from "./ManageIllustrations/ManageIllustrations";
import Settings from "./Settings/Settings";
import Profile from "./Profile/Profile";
import ProfileSettings from "./ProfileSettings/ProfileSettings";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const backgroundColor_value = "#111827";
export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentOpenPanel, setCurrentOpenPanel] = useState(<Home/>);
  const [currentOpenPanelTitle,setCurrentOpenPanelTitle]=useState("");
  const [navigation, setNavigation] = useState([
    { name: HOME, icon: HomeIcon, current: true },
    { name: MANAGE_DESIGNS, icon: ClockIcon, current: false },
    { name: MANAGE_ILLUSTRATIONS, icon: ScaleIcon, current: false },
    // { name: MANAGE_ADMIN_USERS, icon: CreditCardIcon, current: false },
    { name: MANAGE_USERS, icon: UserGroupIcon, current: false },
  ]);
  const [secondaryNavigation, setSecondaryNavigation] = useState([
    { name: SETTINGS, icon: HomeIcon, current: false },
  ]);

  const handelSideBarOption = (value) => {
    switch (value) {
      case HOME:
           setCurrentOpenPanelTitle(""  );
           setCurrentOpenPanel(<Home/>)
      break;
      case MANAGE_ADMIN_USERS:
           setCurrentOpenPanelTitle("Manage Admins")
           setCurrentOpenPanel(<ManageAdminUsers/>)
      break;
      case MANAGE_USERS:
          setCurrentOpenPanelTitle("Manage Users")
          setCurrentOpenPanel(<ManageUsers/>)
      break;
      case MANAGE_DESIGNS:
          setCurrentOpenPanelTitle("Manage Designs")
          setCurrentOpenPanel(<ManageDesigns/>)
      break;
      case MANAGE_ILLUSTRATIONS:
          setCurrentOpenPanelTitle("Manage Illustrations");
          setCurrentOpenPanel(<ManageIllustrations/>)
      break;

      case SETTINGS:
          setCurrentOpenPanelTitle("Settings");
          setCurrentOpenPanel(<Settings/>)
      break;
      
      default:
        break;
    }
    setNavigation(
      produce(navigation, (draft) => {
        draft.map((item) => {
          if (item.name === value) item.current = true;
          else item.current = false;
          return item;
        });
        return draft;
      })
    );
    setSecondaryNavigation(
      produce(secondaryNavigation, (draft) => {
        draft.map((item) => {
          if (item.name === value) item.current = true;
          else item.current = false;
          return item;
        });
        return draft;
      })
    );
  };

  const handelProfileDropDownOption = (value) => {
    switch (value) {
      case PROFILE:
          setCurrentOpenPanelTitle("My Profile");
          setCurrentOpenPanel(<Profile/>)
        break;
      case PROFILE_SETTINGS:
          setCurrentOpenPanelTitle("My Profile Settings");
          setCurrentOpenPanel(<ProfileSettings/>)
        break;
      default:
          localStorage.setItem("userName",null);
          location.reload();
        break;
    }
  };

  return (
    <div className="relative h-screen flex overflow-hidden bg-gray-100">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setSidebarOpen}
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
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 " style={{backgroundColor:`${backgroundColor_value}`}}>
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 flex items-center px-4">
                {/* <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg"
                  alt="Easywire logo"
                /> */}
              </div>
              <nav
                className="mt-5 flex-shrink-0 h-full divide-y divide-cyan-100 overflow-y-auto"
                aria-label="Sidebar"
              >
                <div className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <div
                      key={item.name}
                      className={classNames(
                        item.current
                          ? "bg-cyan-800 text-white"
                          : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        console.log(e);
                        handelSideBarOption(e.target.outerText);
                      }}
                    >
                      <item.icon
                        className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6">
                  <div className="px-2 space-y-1">
                    {secondaryNavigation.map((item) => (
                      <div
                        style={{ cursor: "pointer" }}
                        key={item.name}
                        className={classNames(
                          item.current
                            ? "bg-cyan-800 text-white"
                            : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                          "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                        )}
                        onClick={(e) => {
                          console.log(e);

                          handelSideBarOption(e.target.outerText);
                        }}
                      >
                        <item.icon
                          className="mr-4 h-6 w-6 text-cyan-200"
                          aria-hidden="true"
                        />
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}

      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow  pt-5 pb-4 overflow-y-auto" style={{backgroundColor:`${backgroundColor_value}`}}>
            <div className="flex items-center flex-shrink-0 px-4">
              {/* <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/easywire-logo-cyan-300-mark-white-text.svg"
                alt="Easywire logo"
              /> */}
            </div>
            <nav
              className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <div
                    key={item.name}
                    style={{ cursor: "pointer" }}
                    className={classNames(
                      item.current
                        ? "bg-cyan-800 text-white"
                        : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                      "group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                    )}
                    onClick={(e) => {
                      console.log(e);

                      handelSideBarOption(e.target.outerText);
                    }}
                  >
                    <item.icon
                      className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6">
                <div className="px-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <div
                      key={item.name}
                      style={{ cursor: "pointer" }}
                      className={classNames(
                        item.current
                          ? "bg-cyan-800 text-white"
                          : "text-cyan-100 hover:text-white hover:bg-cyan-600",
                        "group flex items-center px-2 py-2 text-base font-medium rounded-md"
                      )}
                      onClick={(e) => {
                        console.log(e);
                        handelSideBarOption(e.target.outerText);
                      }}
                    >
                      <item.icon
                        className="mr-4 h-6 w-6 text-cyan-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto focus:outline-none">
        <div  className="relative z-10 flex-shrink-0 flex h-16 lg:border-none">
          <button
            type="button"
            className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          {/* Search bar */}
          <div  className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="text-lg pt-3" style={{fontSize:'1.75rem'}}>
                  {/* {currentOpenPanelTitle} */}
                  <h2 className="text-xl lg:text-3xl font-medium text-gray-900">{currentOpenPanelTitle}</h2>
               
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              {/* <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button> */}
              
              {/* Profile dropdown */}
              <Menu as="div" className="ml-3 relative">
                <div>
                  <Menu.Button className="max-w-xs bg-white rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 lg:p-2 lg:rounded-md lg:hover:bg-gray-50">
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    
                    <ChevronDownIcon
                      className="hidden flex-shrink-0 ml-1 h-5 w-5 text-gray-400 lg:block"
                      aria-hidden="false"
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
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {/* <Menu.Item>
                      {({ active }) => (
                        <div
                          style={{ cursor: "pointer" }}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                          onClick={(e) => {
                            handelProfileDropDownOption(e.target.outerText);
                          }}
                        >
                          {PROFILE}
                        </div>
                      )}
                    </Menu.Item> */}
                    {/* <Menu.Item>
                      {({ active }) => (
                        <div
                          style={{ cursor: "pointer" }}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                          onClick={(e) => {
                            handelProfileDropDownOption(e.target.outerText);
                          }}
                        >
                          {PROFILE_SETTINGS}
                        </div>
                      )}
                    </Menu.Item> */}
                    <Menu.Item>
                      {({ active }) => (
                        <div
                          style={{ cursor: "pointer" }}
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                          onClick={(e) => {
                            handelProfileDropDownOption(e.target.outerText);
                          }}
                        >
                          Logout
                        </div>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
        <main className="flex-1 relative pb-8 z-0 overflow-y-auto">
          {/* Page header */}
          {currentOpenPanel}
        </main>
      </div>
    </div>
  );
}
