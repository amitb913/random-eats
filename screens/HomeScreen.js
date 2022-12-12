import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Switch,
} from "react-native";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import Button from "../components/Button";
import RecipeCard from "../components/RecipeCard";
import Text from "../components/Text";
import VeganModeCard from "../components/VeganModeCard";

import { Colors, Dim } from "../Constants";

const HomeScreen = (props) => {
  const [settings, setSettings] = useState({
    hapticFeedback: false,
    tts: false,
  });
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  const [vegan, setVegan] = useState(false);

  const showRecipes = (mealType) => {
    settings.hapticFeedback ? Haptics.impactAsync() : null;
    props.navigation.navigate("RecipeScreen", { vegan, mealType, settings });
  };

  return (
    <View style={styles.container}>
      <Modal visible={settingsModalVisible} animationType="slide" transparent>
        <View
          style={{
            backgroundColor: "#00000060",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RecipeCard
            style={{ borderWidth: 0.5, borderColor: Colors.red, padding: 15 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text red size={24}>
                Accessibility Settings
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setSettingsModalVisible(false);
                  settings.hapticFeedback ? Haptics.impactAsync() : null;
                }}
                style={{ top: -10, right: -5, padding: 8 }}
              >
                <Icon name="times" size={18} color={Colors.red} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ marginTop: 10 }} size={20}>
                Haptic Feedback
              </Text>
              <Switch
                style={{ borderWidth: 1, borderColor: Colors.white }}
                trackColor={{ false: Colors.red, true: Colors.green }}
                ios_backgroundColor={Colors.red}
                onValueChange={() =>
                  setSettings({
                    ...settings,
                    hapticFeedback: !settings.hapticFeedback,
                  })
                }
                value={settings.hapticFeedback}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ marginTop: 10 }} size={20}>
                Text-to-Speech
              </Text>
              <Switch
                style={{ borderWidth: 1, borderColor: Colors.white }}
                trackColor={{ false: Colors.red, true: Colors.green }}
                ios_backgroundColor={Colors.red}
                onValueChange={() =>
                  setSettings({
                    ...settings,
                    tts: !settings.tts,
                  })
                }
                value={settings.tts}
              />
            </View>
          </RecipeCard>
        </View>
      </Modal>
      <ImageBackground
        source={require("../assets/appBackground.png")}
        style={{ flex: 1, width: Dim.width }}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <TouchableOpacity
            onPress={() => {
              setSettingsModalVisible(true);
              settings.hapticFeedback ? Haptics.impactAsync() : null;
            }}
            style={{
              backgroundColor: Colors.bgyellow,
              borderRadius: 100,
              height: 50,
              width: 50,
              marginTop: 15,
              marginRight: Dim.width * 0.075,
              alignSelf: "flex-end",
              overflow: "hidden",
              borderWidth: 0.5,
              borderColor: Colors.red,
            }}
          >
            <ImageBackground
              source={require("../assets/grayWoodBackground.png")}
              style={{
                flex: 1,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon name="cog" size={30} color={Colors.red} />
            </ImageBackground>
          </TouchableOpacity>
          <View
            style={{
              marginTop: 15,
              marginBottom: 20,
              alignSelf: "center",
              width: Dim.width * 0.85,
              borderWidth: 0.5,
              borderColor: Colors.red,
              borderRadius: 6,
              overflow: "hidden",
              backgroundColor: Colors.bgyellow,
              shadowColor: "#000",
            }}
          >
            <ImageBackground
              source={require("../assets/grayWoodBackground.png")}
            >
              <Text style={styles.text} center red size={42}>
                Random Eats
              </Text>
            </ImageBackground>
          </View>

          <Text center size={20}>
            Hungry?
          </Text>
          <Text center size={20}>
            Don't know what to make?
          </Text>
          <View style={styles.topRow}>
            <Button
              onPress={() => showRecipes("breakfast")}
              style={{ marginRight: 10 }}
            >
              Breakfast
            </Button>
            <Button
              onPress={() => showRecipes("lunch")}
              style={{ marginLeft: 10 }}
            >
              Lunch
            </Button>
          </View>
          <View style={styles.bottomRow}>
            <Button
              onPress={() => showRecipes("dinner")}
              style={{ marginRight: 10 }}
            >
              Dinner
            </Button>
            <Button
              onPress={() => showRecipes("dessert")}
              style={{ marginLeft: 10 }}
            >
              Dessert
            </Button>
          </View>
          <VeganModeCard vegan={vegan} setVegan={setVegan} />
          <View
            style={{
              alignSelf: "center",
              width: Dim.width * 0.85,
              borderWidth: 0.5,
              borderColor: Colors.red,
              borderRadius: 6,
              overflow: "hidden",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4.65,
            }}
          >
            <ImageBackground
              style={{ paddingVertical: 10 }}
              source={require("../assets/grayWoodBackground.png")}
            >
              <Text center red size={20}>
                Just select a meal{"\n"}and we'll handle the rest.
              </Text>
            </ImageBackground>
          </View>
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
    // marginTop: Dim.height * 0.16,
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
