import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import DeleteUserAccountModal from "./DeleteUserAccountModal";
import UserDownloadingHistory from "./UserDownloadingHistory";
import AccountStatusModal from "./AccountStatusModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function TableRowHolders(props) {
  const [person,setPerson]=useState({});
  const [selectedRowNumber, setSelectedRowNumber] = useState({});
  const [selectedItem, setSelectedItem] = useState({userDownloadingHistor:[]});
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);
  const [isAccountStatusModalOpen, setIAccountStatusModalOpen] =
    useState(false);
  const [isDownloadingModalOpen, setIsDownloadingModalOpen] = useState(false);

  useEffect(() => {
    setSelectedRowNumber(props.personIdx);
    setSelectedItem(props.person);
    setPerson(props.person);
  }, [props.personIdx]);
  return (
    <tr
      key={person.downloadId}
      className={selectedItem.personIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {selectedItem.userName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {selectedItem.userEmail}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {selectedItem.userCountry}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {selectedItem.userWebsite}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {selectedItem.userAccountStatus}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {selectedItem.userDownloadingHistor.length}
      </td>

      <div style={{ padding: "1rem" }}>
        <Menu as="div" className="relative bg-blue inline-block text-left">
          <div>
            <Menu.Button className="inline-flex justify-center">
              <DotsVerticalIcon
                className="-mr-1 ml-2 h-5 w-5"
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
            <Menu.Items className="origin-top-right absolute right-5 mt-0 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      style={{ cursor: "pointer" }}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                      onClick={() => {
                        setIAccountStatusModalOpen(true);
                      }}
                    >
                      Account Status
                    </div>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <div
                      style={{ cursor: "pointer" }}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                      onClick={() => {
                        setIsDeleteAccountModalOpen(true);
                      }}
                    >
                      Delete Account
                    </div>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <div
                      style={{ cursor: "pointer" }}
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                      onClick={() => {
                        setIsDownloadingModalOpen(true);
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
      {
        <DeleteUserAccountModal
          selectedItem={selectedItem}
          selectedRowNumber={selectedRowNumber}
          isOpen={isDeleteAccountModalOpen}
          setIsOpen={setIsDeleteAccountModalOpen}
        />
      }
      {
        <UserDownloadingHistory
          selectedItem={selectedItem}
          selectedRowNumber={selectedRowNumber}
          isOpen={isDownloadingModalOpen}
          setIsOpen={setIsDeleteAccountModalOpen}
        />
      }
      {
        <AccountStatusModal
          selectedItem={selectedItem}
          selectedRowNumber={selectedRowNumber}
          isOpen={isAccountStatusModalOpen}
          setIsOpen={setIAccountStatusModalOpen}
        />
      }
    </tr>
  );
}

export default TableRowHolders;
