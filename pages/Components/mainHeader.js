import { useEffect, useState } from "react";
import Link from "next/link";

// modal
import Login from "./loginModal";
import Register from "./registerModal";

// navigation options
const navigation = [
  { name: "Home", href: "/" },
  { name: "Illustration", href: "/Illustration" },
  { name: "Design", href: "/Design" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "AboutUs", href: "/aboutUs" },
  { name: "Contact", href: "/contact" }
];

const Header = () => {
  // local states
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);

  // handlers
  const handleLoginModalClose = () => {
    setOpenLoginModal(false);
  };
  const handleLoginModalOpen = () => {
    setOpenLoginModal(true);
  };
  const handleRegisterModalOpen = () => {
    setOpenRegisterModal(true);
  };
  const handleRegisterModalClose = () => {
    setOpenRegisterModal(false);
  };

  const handleOpenDrawer = () => {
    let drawerComponent = document.getElementById("drawer");
    drawerComponent.classList.remove("hidden");
  };
  return (
    <header
      className="bg-gray-900 sticky top-0 border-b border-gray-600"
      style={{ zIndex: 1 }}
    >
      {/* Login modal */}
      <Login open={openLoginModal} handleClose={handleLoginModalClose} />
      <Register
        open={openRegisterModal}
        handleClose={handleRegisterModalClose}
      />

      <nav className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <span className="sr-only">Workflow</span>
            <span className="sm:hidden mr-5 block" onClick={handleOpenDrawer}>
              <img src="https://img.icons8.com/ios-glyphs/30/ffffff/line-width.png" />
            </span>
            <img
              className="h-10 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
              alt=""
            />

            <div className="hidden ml-10 space-x-4 md:block ">
              {navigation.slice(0, 3).map((link) => (
                <Link href={link.href} key={link.name}>
                  <a className="text-base font-medium text-white hover:text-indigo-50">
                    {link.name}
                  </a>
                </Link>
              ))}
            </div>
          </div>
          {/* <SearchBar searchChoices={searchChoices} paddingY={`py-2`} /> */}
          <div className=" hidden  ml-10 space-x-4 md:block">
            {navigation.slice(3).map((link) => (
              <Link href={link.href} key={link.name}>
                <a className="text-base font-medium text-white hover:text-indigo-50">
                  {link.name}
                </a>
              </Link>
            ))}
            <a
              onClick={handleLoginModalOpen}
              style={{ cursor: "pointer" }}
              className="inline-block  py-2 px-4 border border-transparent rounded-md text-base font-medium text-white bg-gray-500"
            >
              Login
            </a>
            <a
              onClick={handleRegisterModalOpen}
              style={{ cursor: "pointer" }}
              className="inline-block text-white py-2 px-4 border 
               rounded-md text-base font-medium hover:bg-gray-500"
            >
              Register
            </a>
          </div>

          <div className="block ml-10 space-x-4 md:hidden">
            <div>
              <a
                onClick={handleLoginModalOpen}
                style={{ cursor: "pointer" }}
                className="inline-block  py-2 px-4 border border-transparent rounded-md text-base font-medium text-white bg-gray-500"
              >
                Login
              </a>
              <a
                onClick={handleRegisterModalOpen}
                style={{ cursor: "pointer" }}
                className="inline-block text-white py-2 px-4 border 
               rounded-md text-base font-medium hover:bg-gray-500"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
