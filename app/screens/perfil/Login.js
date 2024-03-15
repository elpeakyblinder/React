import React, { useRef } from "react";
import Toast from "react-native-easy-toast";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import FormLogin from "../../components/perfil/FormLogin";

import { Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const navegacion = useNavigation();
  const toastRef = useRef();
  return (
    <ScrollView centerContent={true} style={styles.body}>
      <Image
        source={require("../../../assets/img/cocina.png")}
        resizeMethod="auto"
        style={styles.imagen}
      />
      <Text style={styles.titulo}>Login</Text>
      <View styles={styles.formulario}>
        <FormLogin toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <View>
        <Text style={{ textAlign: "center" }}>
          ¿No tienes cuenta?{" "}
          <Text
            style={styles.enlace}
            onPress={() => navegacion.navigate("Signin")}
          >
            Regístrate
          </Text>
        </Text>
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
    height: 100,
    width: 100,
    alignSelf: "center",
    marginBottom: 30,
    marginTop: 20,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10,
    textAlign: "center",
  },
  enlace: {
    color: "rgba(153, 102, 50, 1)",
    fontWeight: "bold",
  },
  formulario: {
    marginTop: 5,
    marginLeft: 40,
    marginRight: 40,
  },
});
