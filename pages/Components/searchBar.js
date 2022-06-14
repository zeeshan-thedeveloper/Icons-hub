import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SearchBar = ({
  searchChoices = [{}],
  paddingY = "py-4",
  handleGetSerachText = () => {},
}) => {
  const [searchText, setSearchText] = useState("");
  const [serachChoiceSelectedValue, setSerachChoiceSelectedValue] = useState(
    searchChoices[0].name
  );
  const handleSearchChoice = (value) => {
    setSerachChoiceSelectedValue(value);
  };
  const handleInputChange = (event) => {
    console.log(event.target.value);
    setSearchText(event.target.value);
  };
  const handleSerachButtonClick = (event) => {
    event.preventDefault()
    handleGetSerachText(searchText,serachChoiceSelectedValue);
  };
  return (
    <span className="relative  inline-flex shadow-sm rounded-md ">
      <button
        type="button"
        className={`inline-flex items-center px-6 ${paddingY} border border-gray-300
         bg-gray-100 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500`}
      >
        {serachChoiceSelectedValue}
      </button>
      <Menu as="span" className="-ml-px relative block">
        <Menu.Button
          className={`relative inline-flex items-center px-2 ${paddingY} border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:border-gray-500`}
        >
          <span className="sr-only">Open options</span>
          <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
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
         right-0 mt-2 -mr-1 w-36 rounded-md shadow-lg bg-white 
         ring-1 ring-black ring-opacity-5 focus:outline-none cursor-pointer"
            onChange={(e) => console.log(e.target.value)}
            onClick={(e) => handleSearchChoice(e.target.outerText)}
          >
            <div className="py-1">
              {searchChoices.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <a
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <input
        type="text"
        name="search"
        id="search"
        className={`-ml-px  sm:w-96 w-full relative inline-flex items-center 
      px-4 ${paddingY} border border-gray-300 bg-white text-sm font-medium 
      text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none 
      focus:ring-1 focus:ring-gray-500 focus:border-gray-500`}
        placeholder="Search..."
        onChange={handleInputChange}
        value={searchText}
      />
      <button
        type="submit"
        className={`-ml-px relative inline-flex
       items-center px-10 ${paddingY} rounded-r-md border 
       bg-gray-900 text-white
       border-gray-300 bg-white text-sm font-medium 
      `}
        onClick={handleSerachButtonClick}
      >
        Search
      </button>
    </span>
  );
};

export default SearchBar;
