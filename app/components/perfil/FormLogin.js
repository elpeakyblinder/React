import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validarEmail } from "../../utils/validaciones";
import { isEmpty } from "lodash";
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase/compat/app";
export default function FormLogin(toast) {
  const {toastRef}=toast;
  const [mostrar, setMostrar] = useState(false);
  const [datos, setDatos] = useState(valoresDefault);
  const navigation = useNavigation();

  const onSubmit = () => {
    if (isEmpty(datos.email) || isEmpty(datos.password)) {
      toastRef.current.show("No puedes dejar campos vacíos");
    } else if (!validarEmail(datos.email)) {
      toastRef.current.show("Estructura del email incorrecta");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(datos.email, datos.password)
        .then((respuesta) => {
          navigation.navigate('Cuentas');
        })
        .catch((err) => {
          toastRef.current.show('No se puede ingresar a la cuenta. Verifica tus datos');
        });
    }
  };

  const onChange = (e, type) => {
    setDatos({ ...datos, [type]: e.nativeEvent.text });
  };

  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo Electrónico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community-icon"
            name="alternate-email"
            iconStyle={styles.icono}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={mostrar ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community-icon"
            name={mostrar ? "visibility" : "visibility-off"}
            iconStyle={styles.icono}
            onPress={() => setMostrar(!mostrar)}
          />
        }
      />
      <Button
        title="Iniciar Sesión"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={() => onSubmit()}
      />
    </View>
  );
}

function valoresDefault() {
  return {
    email: "",
    password: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  inputForm: {
    width: "100%",
    marginTop: 10,
  },
  btnContainer: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
  },
  btn: {
    backgroundColor: "#996632",
  },
  icono: {
    color: "#c1c1c1",
  },
});
