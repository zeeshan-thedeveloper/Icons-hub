import Footer from "./footer";
import Header from "./header";
import Link from "next/link";
import Drawer from "./Drawer";
import { useEffect, useState } from "react";
// navigation options
const BeforeLoginNavigation = [
  { name: "Home", href: "/" },
  { name: "Illustration", href: "/Illustration" },
  { name: "Design", href: "/Design" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "AboutUs", href: "/aboutUs" },
  { name: "Contact", href: "/contact" }
];

const AfterLoginNavigation = [
  { name: "Home", href: "/" },
  { name: "Illustration", href: "/Illustration" },
  { name: "Design", href: "/Design" },
  { name: "Activity", href: "#" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "AboutUs", href: "/aboutUs" },
  { name: "Contact", href: "/contact" }
];
const Layout = ({ children }) => {
  const [isLogin, setIsLogin] = useState("false");
  useEffect(() => {
    if (localStorage.getItem("isRememberMe") == "true") {
      setIsLogin(localStorage.getItem("isLogin"));
    } else {
      setIsLogin(sessionStorage.getItem("isLogin"));
    }
  }, []);
  return (
    <>
      <Drawer
        drawerId="drawer"
        navigation={
          isLogin == "true" ? AfterLoginNavigation : BeforeLoginNavigation
        }
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
export default Layout;
