// This page is to manage things if uer is not logged in.

import React, { useState } from "react";
import LoginScreen from "./SubPanels/LoginScreen";
import AdminPanel from "./SubPanels/AdminPanel";

function Index(props) {
  const handelChangeScreen = () => {
    setOpenedScreen(<AdminPanel />);
  };
  const [openedScreen, setOpenedScreen] = useState(
    <LoginScreen handelChangeScreen={handelChangeScreen} />
  );

  return <div>{openedScreen}</div>;
}

export default Index;
