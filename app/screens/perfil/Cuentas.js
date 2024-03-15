import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import Logged from "./Logged";
import Invitado from "./Invitado";
export default function Cuentas() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      user ? setLogin(true) : setLogin(false);
    });
  }, []);

  if (login === null) return <text>Cargando...</text>;
  return login ? <Logged /> : <Invitado />;
}
