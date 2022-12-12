import React from "react";
import { Text as RN_Text, StyleSheet } from "react-native";
import { Colors } from "../Constants";

const Text = (props) => {
  let color = Colors.black;
  if (props.red) color = Colors.red;
  else if (props.green) color = Colors.green;
  else if (props.white) color = Colors.white;
  else if (props.bgyellow) color = Colors.bgyellow;

  const styles = StyleSheet.create({
    text: {
      fontFamily: props.r ? "Laila_400Regular" : "Laila_700Bold",
      fontSize: props.size || 20,
      color,
      textAlign: props.center ? "center" : "left",
    },
  });
  return (
    <RN_Text
      style={{ ...styles.text, ...props.style }}
      adjustsFontSizeToFit={props.adjustsFontSizeToFit}
    >
      {props.children}
    </RN_Text>
  );
};

export default Text;
