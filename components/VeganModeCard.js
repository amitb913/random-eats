import React, { useState } from "react";

import { View, StyleSheet, ImageBackground, Switch } from "react-native";
import { Colors, Dim } from "../Constants";
import Text from "./Text";

const VeganModeCard = (props) => {
  
  const styles = StyleSheet.create({
    card: {
      height: 55,
      width: Dim.width * 0.6,
      alignSelf: "center",
      borderRadius: 6,
      overflow: "hidden",
      marginBottom: 20,
    },
    imageBackground: {
      flex: 1,
      alignItems: "center",
      paddingHorizontal: 15,
      flexDirection: "row",
      justifyContent: "space-between",
    },
  });
  return (
    <View style={styles.card}>
      <ImageBackground
        source={require("../assets/buttonBackground.png")}
        style={styles.imageBackground}
      >
        <Text white>Vegan Mode</Text>
        <Switch
          style={{ borderWidth: 1, borderColor: Colors.white }}
          trackColor={{ false: Colors.red, true: Colors.green }}
          ios_backgroundColor={Colors.red}
          onValueChange={() => props.setVegan(!props.vegan)}
          value={props.vegan}
        />
      </ImageBackground>
    </View>
  );
};

export default VeganModeCard;
