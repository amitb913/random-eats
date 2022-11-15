import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import {
  useFonts,
  Laila_400Regular,
  Laila_700Bold,
} from "@expo-google-fonts/laila";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  let [fontsLoaded] = useFonts({
    Laila_400Regular,
    Laila_700Bold,
  });

  if (!fontsLoaded) return null;

  return <HomeScreen />;
}
