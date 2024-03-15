import React, { useState } from "react";
import * as Permission from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import uuid from "random-uuid-v4";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import { firebaseApp } from "../../utils/firebase";
import { map, size, filter } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Alert, Dimensions } from "react-native";
import { Input, Icon, Button, Avatar, Image } from "react-native-elements";

const db = firebase.firestore(firebaseApp);
const WidthScreen = Dimensions.get("window").width;
export default function FormRestaurante(toast) {
  const [imagenes, setImagenes] = useState([]);
  const { toastRef } = toast;
  const [datos, setDatos] = useState(valoresDefault);
  const onSubmit = () => {
    console.log(datos);
    if (!toastRef || !toastRef.current) {
      toastRef.current.show("No puedes dejar campos vacíos");
      return;
    }

    if (size(imagenes) === 0) {
      toastRef.current.show("El Restaurante debe tener al menos 1 imagen");
    } else {
      subirImagenesStorage(imagenes)
      .then((resp)=>{
        db.collection('restaurantes')
        .add({
          nombre:datos.nombre,
          direccion:datos.direccion,
          descripcion:datos.descripcion,
          imagenes:resp,
          rating: 0,
          ratingTotal:0,
          votos:0,
          creado:new Date(),
          creadoPor: firebase.auth().currentUser.uid,
        })
        .then(()=>{
          toastRef.current.show('Restaurante Registrado');
          navigation.navigate('Restaurantes');
        }).catch(()=>{
          toastRef.current.show('No se pudo registrar el restaurante');
        })
      });
    }
  };

  const onChange = (e, type) => {
    setDatos({ ...datos, [type]: e.nativeEvent.text });
  };
  return (
    <View style={StyleSheet.formContainer}>
      <ImagenPrincipal imagen={imagenes[0]} />
      <Input
        placeholder="Nombre"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "nombre")}
      />
      <Input
        placeholder="Dirección"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "direccion")}
      />
      <Input
        placeholder="Descripción"
        containerStyle={styles.textArea}
        multiline={true}
        onChange={(e) => onChange(e, "descripcion")}
      />
      <SubirImagen
        toastRef={toastRef}
        imagenes={imagenes}
        setImagenes={setImagenes}
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

function SubirImagen(propiedades) {
  const { toastRef, imagenes, setImagenes } = propiedades;
  const seleccionar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      toastRef.current.show("Debes permitir el acceso a la galeria", 4000);
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.canceled) {
        toastRef.current.show("Debes seleccionar una imagen", 3000);
      } else {
        setImagenes([...imagenes, result.assets[0].uri]);
        console.log(imagenes);
      }
    }
  };
  const eliminarImagen = (imagen) => {
    const copiaArreglo = imagenes;
    Alert.alert(
      "Eliminar Imagen",
      "¿Estás seguro que deseas eliminar la imagen?",
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Eliminar",
        onPress: () => {
          setImagenes(filter(copiaArreglo, (url) => url !== imagen));
        },
      }
    );
  };
  return (
    <View style={styles.vistaImagenes}>
      {size(imagenes) < 4 && (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.icono}
          onPress={seleccionar}
        />
      )}
      {map(imagenes, (imagen, index) => (
        <Avatar
          key={index}
          style={styles.avatar}
          source={{ uri: imagen }}
          onPress={() => eliminarImagen(imagen)}
        />
      ))}
    </View>
  );
}

function ImagenPrincipal(propiedades) {
  const { imagen } = propiedades;
  return (
    <View style={styles.foto}>
      <Image
        source={
          imagen
            ? { uri: imagen }
            : require("../../../assets/img/no-encontrada.png")
        }
        style={{ width: WidthScreen, height: 200 }}
      />
    </View>
  );
}

function valoresDefault() {
  return {
    nombre: "",
    direccion: "",
    descripcion: "",
  };
}

const subirImagenesStorage = async (imagenes) => {
  const imagenesBlob = [];
  await Promise.all(
    imagenes.map(async (imagen) => {
      const response = await fetch(imagen);
      const blob = await response.blob();
      const ref = firebase.storage().ref("restaurantes").child(uuid());

      await ref.put(blob).then(async (resultado) => {
        await firebase
          .storage()
          .ref(`restaurantes/${resultado.metadata.name}`)
          .getDownloadURL()
          .then((urlFoto) => {
            imagenesBlob.push(urlFoto);
          });
      });
    })
  );
  return imagenesBlob;
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
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
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },

  vistaImagenes: {
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 20,
    marginTop: 30,
  },
  textArea: {
    height: 100,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  avatar: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  foto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
});
