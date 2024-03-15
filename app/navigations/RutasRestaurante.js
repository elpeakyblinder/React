import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AgregarRestaurantes from "../screens/restaurantes/AgregarRestaurantes";
import Restaurantes from "../screens/restaurantes/Restaurantes";
import Restaurante from "../screens/restaurantes/Restaurante";
import AddReview from "../screens/restaurantes/addReview";

const Stack = createNativeStackNavigator();

export default function RutasRestaurante() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Restaurantes"
        component={Restaurantes}
        options={{ title: "Agregar Restaurantes" }}
      />
      <Stack.Screen
        name="AgregarRestaurantes"
        component={AgregarRestaurantes}
        options={{ title: "Restaurantes" }}
      />
      <Stack.Screen
        name="Restaurante"
        component={Restaurante}
        options={{ title: "Restaurante" }}
      />
      <Stack.Screen name="Agregar comentario" 
      component={AddReview} 
      />
    </Stack.Navigator>
  );
}
