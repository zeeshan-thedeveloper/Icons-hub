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
import { LockClosedIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
const Bcrypt = require("bcryptjs");
export default function PasswordGenerator(props) {
  const [targetPassword, settargetPassword] = useState(null);
  const [encryptedPassword, setencryptedPassword] = useState(null);
  
  const handeSinIn = () => {
    setencryptedPassword(Bcrypt.hashSync(targetPassword, 10));
  };
  
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Generate Password
            </h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="targetPassword-address" className="sr-only">
                Enter Password
                </label>
                <input
                  id="targetPassword-address"
                  name="targetPassword"
                  type="targetPassword"
                  value={targetPassword}
                  onChange={(e) => {
                    settargetPassword(e.target.value);
                  }}
                  autoComplete="targetPassword"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter Password"
                />
              </div>
              <div>
                <label htmlFor="encryptedPassword" className="sr-only">
                 Generated Password
                </label>
                <input
                  id="encryptedPassword"
                  name="Generated Password"
                  type="encryptedPassword"
                  value={encryptedPassword}
                  onChange={(e) => {
                    setencryptedPassword(e.target.value);
                  }}
                  autoComplete="current-encryptedPassword"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Generated Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {/* <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  onChange={(e) => {
                    console.log(e.target.checked);
                  }}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label> */}
              </div>

              {/* <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your encryptedPassword?
                </a>
              </div> */}
            </div>

            <div>
              <button
                type="button"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handeSinIn}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Generate
              </button>
            </div>
          </form>
        </div>
      </div>
     
    </>
  );
}
