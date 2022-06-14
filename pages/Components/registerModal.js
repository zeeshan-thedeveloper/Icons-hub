/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import TermsAndServices from "./termsAndServicesModal";
// routing
import Link from "next/link";
import MessageModal from "./MessageModal";

export default function Register({ open = false, handleClose }) {
  const [allCountries, setAllCounries] = useState([]);
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userWebiste, setUserWebsite] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [termsAndServicesAccepted, setTermsAndServicesAccepted] =
    useState(false);
  const [openTermsAndServices, setOpenTermsAndServices] = useState(false);

  // Message Modal
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [messageForUser, setMessageForUser] = useState("");
  const handleMessageModalClose = () => {
    setOpenMessageModal(false);
  };
  useEffect(() => {
    setUserCountry(allCountries[0]);
    console.log("---------------------when countires changed");
    console.log(allCountries[0]);
  }, [allCountries]);
  useEffect(() => {
    setAllCounries([
      "Algeria",
      "Angola",
      "Benin",
      "Botswana",
      "Burkina Faso",
      "Burundi",
      "Cabo Verde",
      "Cameroon",
      "Central African Republic (the)",
      "Chad",
      "Comoros (the)",
      "Congo (the Democratic Republic of the)",
      "Congo (the)",
      "Côte d'Ivoire",
      "Djibouti",
      "Egypt",
      "Equatorial Guinea",
      "Eritrea",
      "Eswatini",
      "Ethiopia",
      "Gabon",
      "Gambia (the)",
      "Ghana",
      "Guinea",
      "Guinea-Bissau",
      "Kenya",
      "Lesotho",
      "Liberia",
      "Libya",
      "Madagascar",
      "Malawi",
      "Mali",
      "Mauritania",
      "Mauritius",
      "Mayotte",
      "Morocco",
      "Mozambique",
      "Namibia",
      "Niger (the)",
      "Nigeria",
      "Réunion",
      "Rwanda",
      "Saint Helena, Ascension and Tristan da Cunha",
      "Sao Tome and Principe",
      "Senegal",
      "Seychelles",
      "Sierra Leone",
      "Somalia",
      "South Africa",
      "South Sudan",
      "Sudan (the)",
      "Tanzania, the United Republic of",
      "Togo",
      "Tunisia",
      "Uganda",
      "Western Sahara*",
      "Zambia",
      "Zimbabwe",
      "Antarctica",
      "Bouvet Island",
      "French Southern Territories (the)",
      "Heard Island and McDonald Islands",
      "South Georgia and the South Sandwich Islands",
      "Afghanistan",
      "Armenia",
      "Azerbaijan",
      "Bangladesh",
      "Bhutan",
      "British Indian Ocean Territory (the)",
      "Brunei Darussalam",
      "Cambodia",
      "China",
      "Georgia",
      "Hong Kong",
      "India",
      "Indonesia",
      "Japan",
      "Kazakhstan",
      "Korea (the Democratic People's Republic of)",
      "Korea (the Republic of)",
      "Kyrgyzstan",
      "Lao People's Democratic Republic (the)",
      "Macao",
      "Malaysia",
      "Maldives",
      "Mongolia",
      "Myanmar",
      "Nepal",
      "Pakistan",
      "Philippines (the)",
      "Singapore",
      "Sri Lanka",
      "Taiwan (Province of China)",
      "Tajikistan",
      "Thailand",
      "Timor-Leste",
      "Turkmenistan",
      "Uzbekistan",
      "Viet Nam",
      "Belize"
    ]);
  }, []);

  const resetHooks = () => {
    setUserFirstName("");
    setUserFirstName("");
    setUserLastName("");
    setUserEmail("");
    setUserPassword("");
    setUserWebsite("");
    setUserCountry("");
    setTermsAndServicesAccepted(false);
    setOpenTermsAndServices(false);
  };

  const validateEmail = (elementValue) => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  };
  //handlers
  const handleAcceptClick = (e) => {
    setTermsAndServicesAccepted(e.target.checked);
  };
  const handleTermsAndServicesModalClose = () => {
    if (termsAndServicesAccepted) {
      let data = {
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        password: userPassword,
        websiteLink: userWebiste,
        country: userCountry,
        termsAndServicesAccepted: termsAndServicesAccepted
      };
      fetch("/api/FrontEnd_api/add_new_user_api/", {
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
          console.log("---------in register modal --------------");
          console.log(data);
          if (data.responseCode === 1) {
            //alert("successfully inserted");
            setMessageForUser(
              "Congraulations!! your account is successfully registered"
            );
            setOpenMessageModal(true);
            resetHooks();

            // navigate to profile page with detials
          } else if (data.responseCode === 2) {
            //  alert("Try again");
          } else if (data.responseCode == 3) {
            // user exist with same email

            setMessageForUser("User already Exist");
            document.getElementById("email").classList.add("border-red-500");
            setOpenMessageModal(true);
            setTermsAndServicesAccepted(false);
            setOpenTermsAndServices(false);
          } else {
            // alert("Fatal error");
            console.log("Fatal Error");
          }
        });
    } else {
      setMessageForUser("Please Accept terms to register");
      setOpenMessageModal(true);
    }
  };

  const handleRegisterClick = (event) => {
    event.preventDefault();
    // validate data here
    if (
      userFirstName != "" &&
      userLastName != "" &&
      userEmail != "" &&
      userPassword != "" &&
      userCountry != ""
    ) {
      if (validateEmail(userEmail)) {
        setOpenTermsAndServices(true);
      } else {
        document.getElementById("email").classList.add("border-red-500");
        setMessageForUser("Email is not valid");
        setOpenMessageModal(true);
      }
    } else {
      setMessageForUser("Please fill required fileds");
      setOpenMessageModal(true);
    }
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
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <img
                    className="mx-auto h-6 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                    alt="Workflow"
                  />
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-white mb-6">
                    Register
                  </h2>
                  {/** Message modal */}
                  <MessageModal
                    message={messageForUser}
                    open={openMessageModal}
                    handleClose={handleMessageModalClose}
                  />
                </div>

                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
                  <div className="bg-white py-8 px-10 mx-10 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-4" action="#" method="POST">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          First Name
                        </label>
                        <div className="mt-1">
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            autoComplete="firstName"
                            value={userFirstName}
                            onChange={(event) => {
                              setUserFirstName(event.target.value);
                            }}
                            required
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring- gray-500 focus:border- gray-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Last Name
                        </label>
                        <div className="mt-1">
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            autoComplete="lastName"
                            required
                            value={userLastName}
                            onChange={(event) => {
                              setUserLastName(event.target.value);
                            }}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring- gray-500 focus:border- gray-500 sm:text-sm"
                          />
                        </div>
                      </div>
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
                            value={userEmail}
                            onChange={(event) => {
                              setUserEmail(event.target.value);
                            }}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring- gray-500 focus:border- gray-500 sm:text-sm"
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
                        <TermsAndServices
                          open={openTermsAndServices}
                          handleClose={handleTermsAndServicesModalClose}
                          handleAcceptClick={handleAcceptClick}
                        />
                        <div className="mt-1">
                          <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={userPassword}
                            onChange={(event) => {
                              setUserPassword(event.target.value);
                            }}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring- gray-500 focus:border- gray-500 sm:text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Country
                        </label>
                        <div className="mt-1">
                          <select
                            id="country"
                            name="country"
                            autoComplete="country"
                            value={userCountry}
                            onChange={(event) => {
                              setUserCountry(event.target.value);
                            }}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring- gray-500 focus:border- gray-500 sm:text-sm"
                          >
                            {allCountries.map((country, index) => (
                              <option key={`country_${index}`}>
                                {country}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Website{" "}
                          <label className="text-red-300">(optional)</label>
                        </label>
                        <div className="mt-1">
                          <input
                            id="website"
                            name="website"
                            value={userWebiste}
                            type="website"
                            onChange={(event) => {
                              setUserWebsite(event.target.value);
                            }}
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring- gray-500 focus:border- gray-500 sm:text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <button
                          onClick={handleRegisterClick}
                          type="submit"
                          className="w-full bg-gray-500 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring- gray-500"
                        >
                          Register
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
