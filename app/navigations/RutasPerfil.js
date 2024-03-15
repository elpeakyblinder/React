import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cuentas from "../screens/perfil/Cuentas";
import Acceder from "../screens/perfil/Login";
import Registrarse from "../screens/perfil/Registrarse";

const Stack = createNativeStackNavigator();

export default function RutasPerfil() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Cuentas"
                component={Cuentas} 
                options={{ title: "Tu Cuenta" }}
            />
            <Stack.Screen
                name="Login"
                component={Acceder}
                options={{ title: "Acceder" }}
            />
            <Stack.Screen
                name="Registrarse"
                component={Registrarse}
                options={{ title: "Registrarse" }}
            />
        </Stack.Navigator>
    );
}