import { useState, useEffect } from "react";

// routing
import MainHeader from "./mainHeader";
import ActivityHeader from "./afterLoginHeader";

//Header Component
const Header = () => {
  const [isLogin, setIsLogin] = useState("false");
  useEffect(() => {
    if (localStorage.getItem("isRememberMe") == "true") {
      setIsLogin(localStorage.getItem("isLogin"));
    } else {
      setIsLogin(sessionStorage.getItem("isLogin"));
    }
  }, []);
  return <>{isLogin == "true" ? <ActivityHeader /> : <MainHeader />}</>;
};
export default Header;
