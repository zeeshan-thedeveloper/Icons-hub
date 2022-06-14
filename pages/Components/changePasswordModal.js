/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import MessageModal from "./MessageModal";
const Bcrypt = require("bcryptjs");

export default function ChangePasswordModal({
  open = false,
  handleClose,
  oldPasswordHash,
  userEmail
}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [messageForUser, setMessageForUser] = useState("");
  const handleMessageModalClose = () => {
    setOpenMessageModal(false);
  };

  const handleChangePasswordClick = (event) => {
    event.preventDefault();
    if (newPassword !== "" && repeatNewPassword !== "" && oldPassword !== "") {
      if (!Bcrypt.compareSync(oldPassword, oldPasswordHash)) {
        setMessageForUser("Old password does not match");
        setOpenMessageModal(true);
        document.getElementById("oldPassword").classList.add("border-red-500");
      } else {
        if (newPassword === repeatNewPassword) {
          // call api here to change password
          handleUserPasswordUpdateClick();
        } else {
          setMessageForUser("new password and repeat password should be same");
          setOpenMessageModal(true);
          document
            .getElementById("repeatNewPassword")
            .classList.add("border-red-500");
          document
            .getElementById("newPassword")
            .classList.add("border-red-500");
          if (
            document
              .getElementById("oldPassword")
              .classList.contains("border-red-500")
          ) {
            document
              .getElementById("oldPassword")
              .classList.remove("border-red-500");
          }
        }
      }
    } else {
      setMessageForUser("All fields are required");
      setOpenMessageModal(true);
    }
  };
  const handleUserPasswordUpdateClick = () => {
    const data = {
      email: userEmail,
      password: newPassword
    };
    fetch("/api/FrontEnd_api/change_password_api", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(
        (res) => res.json(),
        (err) => console.console.log(err)
      )
      .then((data) => {
        if (data.responseCode == 1) {
          localStorage.setItem(
            "userDetails",
            JSON.stringify(data.responsePayload)
          );
          setMessageForUser("Password Changed Successfully");
          setOpenMessageModal(true);
          resetAllData();

          // alert(data.responseMessage);
        } else {
          //alert(data.responseMessage);
        }
      });
  };
  const resetAllData = () => {
    setNewPassword("");
    setRepeatNewPassword("");
    setOldPassword("");
    location.reload();
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
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
              className="inline-block align-bottom bg-white rounded-lg px-2
                          pb-1 text-left overflow-hidden shadow-xl
                          transform transition-all  sm:align-middle 
                          sm:w-1/3 w-full
                          bg-gray-900
                           sm:p-6"
            >
              <div className=" flex flex-col justify-center sm:px-3 lg:px-0 ">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white mb-6">
                  Change Password
                </h2>
                <MessageModal
                  open={openMessageModal}
                  handleClose={handleMessageModalClose}
                  message={messageForUser}
                />
                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
                  <div className="bg-white py-8 px-10 mx-10 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-4" action="#" method="POST">
                      <div>
                        <label
                          htmlFor="newPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Old Password
                        </label>
                        <div className="mt-1">
                          <input
                            id="oldPassword"
                            name="oldPassword"
                            type="password"
                            value={oldPassword}
                            onChange={(event) => {
                              setOldPassword(event.target.value);
                            }}
                            autoComplete="oldPassword"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring- gray-500 focus:border- gray-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="newPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          New Password
                        </label>
                        <div className="mt-1">
                          <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={newPassword}
                            onChange={(event) => {
                              setNewPassword(event.target.value);
                            }}
                            autoComplete="newPassword"
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring- gray-500 focus:border- gray-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="repeatNewPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Repeat Password
                        </label>
                        <div className="mt-1">
                          <input
                            id="repeatNewPassword"
                            name="repeatNewPassword"
                            type="password"
                            autoComplete="repeatNewPassword"
                            required
                            value={repeatNewPassword}
                            onChange={(event) => {
                              setRepeatNewPassword(event.target.value);
                            }}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring- gray-500 focus:border- gray-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          onClick={handleChangePasswordClick}
                          type="submit"
                          className="w-full bg-gray-500 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring- gray-500"
                        >
                          Change
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
