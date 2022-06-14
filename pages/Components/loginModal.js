/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
// routing
import Link from "next/link";
import MessageModal from "./MessageModal";

export default function Login({ open = false, handleClose }) {
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRememberMe, setIsRememberMe] = useState(false);

  // for modal
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [messageForUser, setMessageForUser] = useState("");
  const handleMessageModalClose = () => {
    setOpenMessageModal(false);
  };

  // handlers
  const handleSetEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleSetPassword = (event) => {
    setPassword(event.target.value);
  };
  const handleLoginClick = (event) => {
    event.preventDefault();
    if (email != "" && password != "") {
      // validate fields here

      let data = {
        email: email,
        password: password
      };

      fetch("/api/FrontEnd_api/authenticate_user_api", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
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
          if (data.responseCode == 1) {
            // setMessageForUser(data.responseMessage);
            // setOpenMessageModal(true);

            // handleClose();
            // when password is incorrect
            if (data.responsePayload == null) {
              document
                .getElementById("password")
                .classList.add("border-red-500");
              // alert(data.responseMessage);
            } else {
              setEmail("");
              setPassword("");
              handleClose();
              //  alert(data.responseMessage);
              console.log(data.responsePayload);

              if (localStorage.getItem("isRememberMe") == "true") {
                localStorage.setItem(
                  "userDetails",
                  JSON.stringify(data.responsePayload)
                );
                localStorage.setItem("isLogin", true);
              } else {
                sessionStorage.setItem(
                  "userDetails",
                  JSON.stringify(data.responsePayload)
                );
                sessionStorage.setItem("isLogin", true);
              }
              location.replace("/profile");
            }
          } else if (data.responseCode == 2) {
            // user not found
            //alert(data.responseMessage);
            document.getElementById("email").classList.add("border-red-500");
            setMessageForUser(data.responseMessage);
            setOpenMessageModal(true);
          } else {
            // duplicate users with same email id
            //  alert(data.responseMessage);
          }
        })
        .catch((error) => {
          console.log(error());
        });
    } else {
      setMessageForUser("Please insert all details");
      setOpenMessageModal(true);
    }
  };
  const handleForgetPasswordClick = (event) => {
    event.preventDefault();
  };
  const handleSetIsRemeberMe = (event) => {
    setIsRememberMe(event.target.checked);
    localStorage.setItem("isRememberMe", true);
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
            <Dialog.Overlay className="fixed inset-0 bg-gray-400 bg-opacity-75 transition-opacity" />
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
            <div className="inline-block align-bottom bg-gray-900 rounded-lg px-2 pt-1 pb-1 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div className=" flex flex-col justify-center sm:px-3 lg:px-0 py-2">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <img
                    className="mx-auto h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Login In
                  </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                  <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-4" action="#" method="POST">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={handleSetEmail}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <div className="mt-1">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={handleSetPassword}
                            className="appearance-none block w-full px-3 py-2 border 
                                                        
                                                        border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none
                                                         focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-4 w-4 text-gray-600 focus:ring-gray-500 border-gray-300 rounded"
                            value={isRememberMe}
                            onClick={handleSetIsRemeberMe}
                          />
                          <label
                            htmlFor="remember-me"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            Remember me
                          </label>
                        </div>
                        <div className="flex items-center">
                          <span
                            className="text-sm text-gray-900 cursor-pointer"
                            onClick={handleForgetPasswordClick}
                          >
                            Forget Password ?
                          </span>
                        </div>
                      </div>

                      <div>
                        <button
                          onClick={handleLoginClick}
                          type="submit"
                          className="w-full flex justify-center py-2
                                                     px-4 border border-transparent rounded-md
                                                      shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          Log in
                        </button>
                        <MessageModal
                          message={messageForUser}
                          open={openMessageModal}
                          handleClose={handleMessageModalClose}
                        />
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
