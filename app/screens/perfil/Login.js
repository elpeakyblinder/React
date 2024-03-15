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
        source={require("../../../assets/loginmoto.jpg")}
        resizeMethod="auto"
        style={styles.imagen}
      />
      <Text style={styles.titulo}>¡Accede a tu cuenta para disfrutar de los beneficios!</Text>
      <View styles={styles.formulario}>
        <FormLogin toastRef={toastRef} />
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <View>
        <Text style={{ textAlign: "center", padding: 10 }}>
          ¿No tienes cuenta?{" "}
          <Text
            style={styles.enlace}
            onPress={() => navegacion.navigate("Registrarse")}
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
    borderRadius:130,
    height: "35vh",
    width: "36vh",
    alignSelf: "center",
    marginBottom: 45,
    backgroundColor: '#fff',
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 20,
    textAlign: "center",
  },
  enlace: {
    color: "rgb(250, 67, 63)",
    fontWeight: "bold",
  },
  formulario: {
    marginLeft: 40,
    marginRight: 40,
  },
});
