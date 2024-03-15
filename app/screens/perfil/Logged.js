import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "react-native-elements";
import firebase from "firebase/compat/app";

export default function Cuentas() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/img/welcomemoto.jpg")}
        resizeMethod="auto"
        style={styles.imagen}
      />
      <Text style={styles.title}>¡¡Bienvenido a RodaApp!!</Text>

      <Text style={styles.text}>
        Aquí encontrarás un amplio catálogo de motos de cualquier año, categoría y necesidad. Contará con un alto feedback.
        Todas las novedades sobre el mundo Biker están ubicadas aquí.{"\n\n"}
        Para cerrar tu sesión solo necesitas presionar el botón de "Cerrar sesión".
      </Text>
      <Button 
      buttonStyle={styles.btnContainer} 
      title="Cerrar Sesión" 
      onPress={() => firebase.auth().signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Centra los elementos a lo largo del eje principal (vertical)
    alignItems: 'center', // Centra los elementos a lo largo del eje transversal (horizontal)
    padding: 10,
    backgroundColor: '#fff',
  },
  imagen: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  btnContainer:{
    borderRadius: 60,
    backgroundColor: "rgb(202, 67, 63)",
    marginTop: 15,
    marginBottom: 10,
    width: "30vh",
    height: 45
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center', // Centra el texto horizontalmente
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center', // Centra el texto horizontalmente
  },
});
