import React, { useState, useRef, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Rating, Icon } from "react-native-elements";
import Toast from "react-native-easy-toast";
import { map } from "lodash";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { useFocusEffect } from "@react-navigation/native";
const db = firebase.firestore(firebaseApp);

function Review(propiedades) {
  const toastRef = useRef();
  const { id, title, review, rating, createAt } = propiedades.review;
  const createReview = new Date(createAt.seconds * 1000);
  const eliminar = () => {
    db.collection("reviews").doc(id).delete().then(() => {
      toastRef.current.show("comentario eliminado");
    }).catch((error) => {
      toastRef.current.show("error al eliminar el comentario");
    });
  };

  return (
    <View style={styles.viewReview}>
      <View style={styles.viewInfo}>
        <Text style={styles.reviewTitle}>{title}</Text>
        <Rating imageSize={15} startingValue={rating} readonly />
        <Text style={styles.reviewText}>{review}</Text>
        <Text style={styles.reviewDate}>
          {createReview.getDate()}/{createReview.getMonth() + 1}/
          {createReview.getFullYear()} - {createReview.getHours()}:
          {createReview.getMinutes() < 10 ? "0" : ""}
          {createReview.getMinutes()}
        </Text>
        <Icon
          raised
          name='trash'
          type='font-awesome'
          color='#f50'
          onPress={eliminar}
        />
      </View>
    </View>
  );
}

export default function Reviews(propiedades) {
  const { navigation, id } = propiedades;
  const [userLogged, setUserLogged] = useState(false);
  const [reviews, setReviews] = useState([]);

  firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  useFocusEffect(
    useCallback(() => {
      db.collection("reviews")
        .where("idRestaurante", "==", id)
        .get()
        .then((response) => {
          const resultReview = [];
          response.forEach((doc) => {
            const data = doc.data();
            data.id = doc.id;
            resultReview.push(data);
          });
          setReviews(resultReview);
        });
    }, [])
  );

  return (
    <View>
      {userLogged ? (
        <Button
          title="Escribe una opinión"
          buttonStyle={styles.btnAddReview}
          titleStyle={styles.btnTitleAddReview}
          icon={{
            type: "material-community",
            name: "square-edit-outline",
            color: "#0A6ED3",
          }}
          onPress={() =>
            navigation.navigate("Agregar comentario", {
              id: id,
            })
          }
        />
      ) : (
        <View>
          <Text
            style={{ textAlign: "center", color: "#0A6ED3", padding: 20 }}
            onPress={() => navigation.navigate("Login")}
          >
            Para escribir un comentario es necesario estar logeado{" "}
            <Text style={{ fontWeight: "bold" }}>
              pulsa AQUÍ para iniciar sesión
            </Text>
          </Text>
        </View>
      )}
      {map(reviews, (review, index) => (
        <Review key={index} review={review} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  btnAddReview: {
    backgroundColor: "transparent",
  },
  btnTitleAddReview: {
    color: "#0A6ED3",
  },
  viewReview: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 20,
    borderBottomColor: "#0A6ED3",
    borderBottomWidth: 1,
  },
  viewInfo: {
    flex: 1,
    alignItems: "flex-start",
  },
  reviewTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  reviewText: {
    color: "grey",
    marginBottom: 10,
  },
  reviewDate: {
    color: "grey",
    fontSize: 12,
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});
