import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, View, StyleSheet, ImageBackground } from "react-native";

import Button from "../components/Button";
import Text from "../components/Text";
import VeganModeCard from "../components/VeganModeCard";

import { Dim } from "../Constants";

const HomeScreen = (props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/appBackground.png")}
        style={{ flex: 1, width: Dim.width }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <Text style={styles.text} center red size={42}>
            Random Eats
          </Text>
          <Text center size={20}>
            Hungry?
          </Text>
          <Text center size={20}>
            Don't know what to make?
          </Text>
          <View style={styles.topRow}>
            <Button style={{ marginRight: 10 }}>Breakfast</Button>
            <Button style={{ marginLeft: 10 }}>Lunch</Button>
          </View>
          <View style={styles.bottomRow}>
            <Button style={{ marginRight: 10 }}>Dinner</Button>
            <Button style={{ marginLeft: 10 }}>Dessert</Button>
          </View>
          <VeganModeCard />
          <Text center red size={20}>
            Just select a meal{"\n"}and we'll handle the rest.
          </Text>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: Dim.height * 0.2,
  },
  topRow: {
    marginTop: 20,
    flexDirection: "row",
    alignSelf: "center",
  },
  bottomRow: {
    marginVertical: 20,
    flexDirection: "row",
    alignSelf: "center",
  },
});

export default HomeScreen;
