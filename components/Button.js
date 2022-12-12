import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Colors, Dim } from "../Constants";
import Text from "./Text";

const Button = (props) => {
  const styles = StyleSheet.create({
    button: {
      width: Dim.width * 0.4,
      height: 65,
      borderRadius: 6,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: Colors.white,
    },
    imageBackground: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  return (
    <TouchableOpacity
      onPress={props.onPress}
      disabled={props.disabled}
      style={{ ...styles.button, ...props.style }}
    >
      <ImageBackground
        source={require("../assets/buttonBackground.png")}
        style={styles.imageBackground}
      >
        <Text white center>
          {props.children}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default Button;
