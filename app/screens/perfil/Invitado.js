import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native"; 
import { Button } from "react-native-elements";
import {useNavigation} from "@react-navigation/native";

export default function Invitado() {

  const navegacion=useNavigation();

  return (
    <ScrollView centerContent={true} style={styles.body}>
      <Image
        source={require("../../../assets/img/invitado.jpg")}
        resizeMethod="auto"
        style={styles.imagen}
      />
      <Text style={styles.titulo}>¡¡Ingresa a tu perfil para conocer nuestras novedades!!</Text>
      <Text style={styles.parrafo}>
        Esta app cuenta con proteccion a datos personales.
        Ingresa para acceder a todas las funcionalidad que nuestra app ofrece!!!
      </Text>
      <View>
        <Button
          title="Acceder con tu cuenta"
          type="solid"
          buttonStyle={{
            backgroundColor: "rgb(202, 67, 63)",
            marginBottom: 20,
            borderRadius: 60,
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
    borderRadius:140,
    height: "40vh",
    width: "40vh",
    marginBottom: 30,
    alignSelf: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  parrafo: {
    textAlign: "center",
    marginBottom: 20,
  },
});
