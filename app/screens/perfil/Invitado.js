import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native"; 
import { Button } from "react-native-elements";
import {useNavigation} from "@react-navigation/native";

export default function Invitado() {

  const navegacion=useNavigation();

  return (
    <ScrollView centerContent={true} style={styles.body}>
      <Image
        source={require("../../../assets/img/fondo.png")}
        resizeMethod="auto"
        style={styles.imagen}
      />
      <Text style={styles.titulo}>Ingresa a tu perfil</Text>
      <Text style={styles.parrafo}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Text>
      <View>
        <Button
          title="Ingresar"
          type="solid"
          buttonStyle={{
            backgroundColor: "rgba(153, 102, 50, 1)",
          }}
          onPress={() => navegacion.navigate("Login")}
        />
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  body: {
    marginLeft: 30,
    marginRight: 30,
  },
  imagen: {
    height: 200,
    width: 200,
    marginBottom: 30,
    alignSelf: 'center',
    marginTop: 20,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  parrafo: {
    textAlign: "justify",
    marginBottom: 20,
  },
});
