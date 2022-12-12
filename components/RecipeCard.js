import React from "react";
import { View, StyleSheet } from "react-native";

import Text from "../components/Text";
import { Colors, Dim } from "../Constants";

const RecipeCard = (props) => {
  return (
    <View style={{ ...styles.container, ...props.style }}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dim.width * 0.9,
    backgroundColor: Colors.bgyellow,
    borderRadius: 6,
    padding: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4.65,
  },
});

export default RecipeCard;
