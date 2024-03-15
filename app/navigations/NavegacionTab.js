import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Busqueda from "../screens/Busquedas";
import Comentarios from "../screens/Comentarios";
import Favorito from "../screens/Favoritos";
import TopRestaurante from "../screens/TopRestaurantes";
import { Icon } from "react-native-elements";
import RutasRestaurante from "./RutasRestaurante";
import RutasPerfil from "./RutasPerfil";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="cuentas"
        screenOptions={({ route }) => ({
          tabBarInactiveTintColor: "#52585E",
          tabBarActiveTintColor: "#00a680",
          tabBarIcon: ({ color }) => opciones(route, color),
        })}
      >
        <Tab.Screen
          name="restaurantes"
          component={RutasRestaurante}
          options={{
            title: "Restaurants",
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="busquedas"
          component={Busqueda}
          options={{ title: "Search" }}
        />
        <Tab.Screen
          name="cuentas"
          component={RutasPerfil}
          options={{ title: "Account",
          headerShown: false, }}
        />
        <Tab.Screen
          name="favoritos"
          component={Favorito}
          options={{ title: "Favs" }}
        />
        <Tab.Screen
          name="topRestaurantes"
          component={TopRestaurante}
          options={{ title: "Top" }}
        />
        <Tab.Screen
          name="Comentarios"
          component={Comentarios}
          options={{ title: "Comment" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function opciones(ruta, color) {
  let iconName;
  switch (ruta.name) {
    case "restaurantes":
      iconName = "restaurant";
      break;
    case "busquedas":
      iconName = "search";
      break;
    case "cuentas":
      iconName = "person";
      break;
    case "favoritos":
      iconName = "star";
      break;
    case "topRestaurantes":
      iconName = "check";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-comunity" name={iconName} size={22} color={color} />
  );
}
