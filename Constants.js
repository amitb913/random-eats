import { Dimensions } from "react-native";

export const Colors = {
  red: "#830000",
  green: "#2C6D10",
  black: "#000000",
  white: "#ffffff",
  bgyellow: "#FFEFD0",
};

export const Dim = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};

export const API_URL = "http://192.168.1.142:8000";
// Replace with localhost:8000 if you are running the backend server locally
// If you are running the server on a different machine on the same network, replace with the IPv4 address of the machine
// Make sure to use the same port that the backend server is running on (port 8000 by default)
