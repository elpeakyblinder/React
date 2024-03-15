import React from "react";
import { StyleSheet, Text, View, ScrollView, FlatList, ActivityIndicator, TouchableOpacity, } from "react-native";
import { Image } from "react-native-elements";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";

export default function ListaRestaurantes({ restaurantes }) {
  return (
    <ScrollView>
      {size(restaurantes) > 0 ? (
        <FlatList
          data={restaurantes}
          renderItem={({ item }) => <Restaurantes restaurante={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.restaurantes}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Cargando Restaurantes</Text>
        </View>
      )}
    </ScrollView>
  );
}

function Restaurantes({ restaurante }) {
  const { imagenes, nombre, direccion, descripcion, id } = restaurante;
  const navegacion = useNavigation();
  const consultarRestaurante = () => {
    navegacion.navigate("Restaurante", { id, nombre });
  };
  return (
    <TouchableOpacity onPress={consultarRestaurante}>
      <View style={styles.lista}>
        <View style={styles.viewImagen}>
          <Image
            resizeMode="cover"
            PlaceholderContent={<ActivityIndicator color="#0000ff" />}
            source={
              imagenes[0]
                ? { uri: imagenes[0] }
                : require("../../../assets/img/no-encontrada.png")
            }
            style={styles.imagen}
          />
        </View>
        <View>
          <Text style={styles.nombre}>{nombre}</Text>
          <Text style={styles.direccion}>{direccion}</Text>
          <Text style={styles.descripcion}>
            {descripcion.substring(0, 60)}...
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  restaurantes: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  lista: {
    flexDirection: "row",
    margin: 10,
  },
  viewImagen: {
    marginRight: 15,
  },
  imagen: {
    width: 80,
    height: 80,
  },
  nombre: {
    fontWeight: "bold",
  },
  direccion: {
    paddingTop: 2,
    color: "grey",
  },
  descripcion: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
});
