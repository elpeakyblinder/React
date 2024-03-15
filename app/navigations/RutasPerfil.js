import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Cuentas from "../screens/perfil/Cuentas";
import Login from "../screens/perfil/Login";
import Signin from "../screens/perfil/Signin";

const Stack = createNativeStackNavigator();

export default function RutasPerfil() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Cuentas" component={Cuentas}  options={{title: "Mi Cuenta"}}/>
            <Stack.Screen name="Login" component={Login}  options={{title: "Login"}}/>
            <Stack.Screen name="Signin" component={Signin}  options={{title: "Signin"}}/>
        </Stack.Navigator>
    );
}