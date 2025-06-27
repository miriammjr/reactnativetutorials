import { View, Text, StyleSheet } from "react-native";
import React from "react";

const explore = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coffee Shop</Text>
      <Text style={styles.text}>Blah blah blah</Text>
      <Text style={styles.text}>Information and stuff</Text>
    </View>
  );
};

export default explore;

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    color: "rgba(100,3,3,100)",
    fontSize: 20,
    textAlign: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    marginTop: "10%",
    justifyContent: "space-evenly",
    // textAlign: "center", does not work
  },
});
