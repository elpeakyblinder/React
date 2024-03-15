import React, { useState, useRef } from 'react';
import { StyleSheet, View, Alert, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import firebase from "firebase/compat/app";
import "firebase/compat/auth"; // Importa auth para verificar si el usuario está autenticado
import "firebase/compat/firestore";
import Toast from "react-native-easy-toast";
import { firebaseApp } from "../utils/firebase";

const db = firebase.firestore(firebaseApp);

export default function FormComentario() {
    const { toastRef } = toast;
    const [datos, setDatos] = useState(valoresDefault());

    const onSubmit = () => {
        if (!datos.description) {
            toastRef.current.show("No puedes dejar campos vacíos");
        } else {
            const user = firebase.auth().currentUser; // Obtener el usuario actual
            if (user) {
                db.collection("comentarios")
                    .add({
                        descripcion: datos.description,
                        creado: new Date(),
                        creadoPor: user.uid, // Acceder al UID del usuario actual
                    })
                    .then(() => {
                        toastRef.current.show("Comentario registrado");
                        setDatos(valoresDefault()); // Limpiar el formulario después de enviar
                    })
                    .catch(() => {
                        toastRef.current.show("No es posible agregar el comentario");
                    });
            } else {
                toastRef.current.show("Usuario no autenticado");
            }
        }
    };

    const onChange = (value, type) => {
        setDatos({ ...datos, [type]: value });
    };

    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Descripción"
                containerStyle={styles.inputForm}
                onChangeText={(value) => onChange(value, "description")}
                inputContainerStyle={styles.textArea}
                multiline={true}
                value={datos.description}
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
        description: "",
    };
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    inputForm: {
        width: "80%",
        marginTop: 20,
    },
    btnContainer: {
        marginTop: 20,
        width: "80%",
    },
    btn: {
        backgroundColor: "#996632",
    },
    textArea: {
        height: 100,
    },
});