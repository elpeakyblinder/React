import React, { useRef } from "react";
import Toast from "react-native-easy-toast";
import { View, Text, Image, StyleSheet } from "react-native";
import FormRegistro from "../../components/perfil/FormRegistro";

export default function Registrarse() {
  const toastRef = useRef();
  return (
    <View centerContent={true} style={styles.body}>
      <Image
        source={require("../../../assets/img/resigtromoto.jpg")}
        resizeMethod="auto"
        style={styles.imagen}
      />
      <View styles={styles.formulario}>
        <FormRegistro toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9}/>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    marginLeft: 30,
    marginRight: 30,
  },
  imagen: {
    height: "40vh",
    width: "40vh",
    alignSelf: "center",
    borderRadius: 150,
    marginBottom: 30,
    marginTop: 20,
  },
  formulario: {
    marginTop: 5,
    marginLeft: 40,
    marginRight: 40,
  },
});
