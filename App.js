import React, { useEffect } from "react";
//import NavegacionDrawer from "./app/navigations/NavegacionDrawer";
import NavegacionTab from "./app/navigations/NavegacionTab";
import { firebaseApp } from "./app/utils/firebase";

export default function App() {
  return <NavegacionTab />;
  //return (<NavegacionDrawer/>)
}
