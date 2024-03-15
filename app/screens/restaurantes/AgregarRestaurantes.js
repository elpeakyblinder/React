import React, { useRef } from "react";
import Toast from "react-native-easy-toast";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import FormRestaurantes from "../../components/restaurantes/FormRestaurantes";
export default function AgregarRestaurantes() {
  const toastRef = useRef();
  return (
    <ScrollView>
      <FormRestaurantes toastRef={toastRef} />
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}
