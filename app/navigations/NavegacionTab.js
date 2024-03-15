import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Busqueda from "../screens/Busquedas";
import Comentarios from "../screens/Comentarios";
import Favorito from "../screens/Favoritos";
import TopRestaurante from "../screens/TopRestaurantes";
//import { Icon } from "react-native-elements";
import RutasRestaurante from "./RutasRestaurante";
import RutasPerfil from "./RutasPerfil";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMotorcycle, faSearch, faUser, faHeart, faRoad, faCommentDots } from '@fortawesome/free-solid-svg-icons';

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
            title: "Novedades",
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="busquedas"
          component={Busqueda}
          options={{ title: "Buscar" }}
        />
        <Tab.Screen
          name="cuentas"
          component={RutasPerfil}
          options={{ title: "Tu cuenta",
          headerShown: false, }}
        />
        <Tab.Screen
          name="favoritos"
          component={Favorito}
          options={{ title: "Favoritos" }}
        />
        <Tab.Screen
          name="topRestaurantes"
          component={TopRestaurante}
          options={{ title: "Rutas" }}
        />
        <Tab.Screen
          name="Comentarios"
          component={Comentarios}
          options={{ title: "Motos" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function opciones(ruta, color) {
  let iconName;
  switch (ruta.name) {
    case "restaurantes":
      iconName = faCommentDots; // Icono de moto para la sección de restaurantes
      break;
    case "busquedas":
      iconName = faSearch; // Icono de lupa para la sección de búsquedas
      break;
    case "cuentas":
      iconName = faUser; // Icono de cuenta para la sección de cuentas
      break;
    case "favoritos":
      iconName = faHeart; // Icono de corazón para la sección de favoritos
      break;
    case "topRestaurantes":
      iconName = faRoad; // Icono de carretera para la sección de los mejores restaurantes
      break;
    case "Comentarios":
      iconName = faMotorcycle; // Icono de comentarios para la sección de comentarios
      break;
    default:
      break;
  }
  return (
    <FontAwesomeIcon icon={iconName} size={23} color={color} />
  );
}

