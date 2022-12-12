import React from "react";
import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import {
  useFonts,
  Laila_400Regular,
  Laila_700Bold,
} from "@expo-google-fonts/laila";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import RecipeScreen from "./screens/RecipeScreen";

// Uncomment the following line for demo purposes
LogBox.ignoreAllLogs()

const Stack = createNativeStackNavigator();

export default function App() {
  let [fontsLoaded] = useFonts({
    Laila_400Regular,
    Laila_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecipeScreen"
          component={RecipeScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
