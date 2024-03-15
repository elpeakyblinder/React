import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validarEmail } from "../../utils/validaciones";
import { size, isEmpty } from "lodash";
import firebase from "firebase/compat/app";
import {useNavigation} from '@react-navigation/native';

export default function FormRegistro(toast) {
  const navigation = useNavigation();
  const { toastRef } = toast;
  const [mostrar, setMostrar] = useState(false);
  const [datos, setDatos] = useState(valoresDefault);
  const onSubmit = () => {
    if (
      isEmpty(datos.email) ||
      isEmpty(datos.password) ||
      isEmpty(datos.repeatedPassword)
    ) {
      toastRef.current.show("No puedes dejar campos vacíos");
    } else if (!validarEmail(datos.email)) {
      toastRef.current.show("Estructura del email incorrecta");
    } else if (size(datos.password) < 6) {
      toastRef.current.show("La contraseña debe tener al menos 6 caracteres");
    } else if (datos.password !== datos.repeatedPassword) {
      toastRef.current.show("Las contraseñas deben ser iguales");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(datos.email, datos.password)
        .then((respuesta) => {
          navigation.navigate('Cuentas');
        })
        .catch((err) => {
          toastRef.current.show('Este correo ya está en uso');
        });
    }
  };
  const onChange = (e, type) => {
    setDatos({ ...datos, [type]: e.nativeEvent.text });
  };
  return (
    <View style={StyleSheet.formContainer}>
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
      <Input
        placeholder="Repetir Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={mostrar ? false : true}
        onChange={(e) => onChange(e, "repeatedPassword")}
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
        title="Registrar"
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
    repeatedPassword: "",
  };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainer: {
    marginTop: 20,
    width: "100%",
  },
  btn: {
    backgroundColor: "#996632",
  },
  icono: {
    color: "#c1c1c1",
  },
});
