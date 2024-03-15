import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import CarouselImagenes from "../../components/CarouselImagenes";
import { Rating, ListItem, Icon } from "react-native-elements";
import { map } from "lodash";
import Reviews from '../../components/restaurantes/Reviews';

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get("window").width;

function Informacion({ nombre, direccion, descripcion, rating }) {
  const listaItems = [
    {
      text: direccion,
      iconName: "google-maps",
      iconType: "material-community",
      action: null,
    },
    {
      text: "443 1893456",
      iconName: "phone",
      iconType: "material-community",
      action: null,
    },
    {
      text: "mail@gmail.com",
      iconName: "at",
      iconType: "material-community",
      action: null,
    },
  ];

  return (
    <View style={styles.viewRestaurante}>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.nombre}>{nombre}</Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.descripcion}>{descripcion}</Text>
      </View>
      <View>
        {listaItems.map((item, index) => (
          <ListItem key={index} containerStyle={styles.listaInfo}>
            <Icon name={item.iconName} type={item.iconType} color="#0A6ED3" />
            <ListItem.Content>
              <ListItem.Title>{item.text}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </View>
  );
}

export default function Restaurante(propiedades) {
  const { navigation, route } = propiedades;
  const { id, nombre } = route.params;
  const [restaurante, setRestaurante] = useState(null);

  useEffect(() => {
    navigation.setOptions({ title: nombre });
  }, []);

  useEffect(() => {
    db.collection("restaurantes")
      .doc(id)
      .get()
      .then((resp) => {
        const datos = resp.data();
        datos.id = resp.id;
        setRestaurante(datos);
      })
      .catch((error) => {
        console.error("Error fetching restaurant:", error);
        setRestaurante(null);
      });
  }, [id]);

  return (
    <View style={styles.body}>
      {restaurante ? (
        <ScrollView>
          <CarouselImagenes
            arrayImages={restaurante.imagenes}
            height={250}
            width={screenWidth}
          />
          <Informacion
            nombre={restaurante.nombre}
            direccion={restaurante.direccion}
            descripcion={restaurante.descripcion}
            rating={restaurante.rating}
          />
          <Reviews navigation={navigation} id={restaurante.id} />
        </ScrollView>
      ) : (
        <View style={styles.restaurantees}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando Restaurante</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sucursales: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  body: {
    flex: 1,
    backgroundColor: "white",
  },

  viewRestaurante: {
    padding: 15,
  },
  nombre: {
    fontSize: 20,
    fontWeight: "bold",
  },
  descripcion: {
    marginTop: 5,
    color: "grey",
  },
  direccion: {
    marginTop: 5,
    color: "grey",
  },
  direccionTitulo: {
    fontWeight: "bold",
    marginTop: 5,
    color: "grey",
  },
  rating: {
    position: "absolute",
    right: 0,
  },
  listaInfo: {
    borderBottomColor: "#D8D8D8",
    borderBottomWidth: 1,
  },
});
