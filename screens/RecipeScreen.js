import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SkypeIndicator } from "react-native-indicators";
import { Ionicons as Icon } from "@expo/vector-icons";
import { FontAwesome5 as FA5Icon } from "@expo/vector-icons";

import Text from "../components/Text";
import RecipeCard from "../components/RecipeCard";
import { API_URL, Colors, Dim } from "../Constants";
import * as Speech from "expo-speech";
import * as Haptics from "expo-haptics";

const RecipeScreen = (props) => {
  const [recipeData, setRecipeData] = useState(null);

  const [ingredientsTtsPlaying, setIngredientsTtsPlaying] = useState(false);
  const [directionsTtsPlaying, setDirectionsTtsPlaying] = useState(false);

  const settings = props.route.params.settings;
  const mealType = props.route.params.mealType;
  const vegan = props.route.params.vegan;
  useEffect(() => {
    if (props.route.params && props.route.params.mealType) {
      // console.log(mealType, vegan);
      axios
        .get(`${API_URL}/${mealType}?vegan=${vegan}`)
        .then((res) => {
          // console.log(res.data);
          setRecipeData(res.data);
        })
        .catch((err) => {
          console.log(err.method);
          alert(
            `Sorry, something went wrong. Please try again later.\n\n${err.message}: ${err.code}`
          );
          // alert(JSON.stringify(err))
          props.navigation.pop();
        });
    }
  }, []);

  const showCategory = (mealType, vegan) => {
    let prefix = vegan ? "vegan" : "non-vegan";
    if (mealType === "breakfast") {
      return `${prefix} breakfasts`;
    } else if (mealType === "lunch") {
      return `${prefix} lunches`;
    } else if (mealType === "dinner") {
      return `${prefix} dinners`;
    } else if (mealType === "dessert") {
      return `${prefix} desserts`;
    }
  };

  if (recipeData) {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/recipeBackground.png")}
          style={{ flex: 1, width: Dim.width }}
        >
          {/* Title Card (with chevron-back) */}
          <RecipeCard
            style={{ marginTop: Dim.height * 0.08, marginBottom: 12 }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                  // reset tts
                  Speech.stop();
                  setIngredientsTtsPlaying(false);
                  setDirectionsTtsPlaying(false);
                  settings && settings.hapticFeedback
                    ? Haptics.impactAsync()
                    : null;
                  props.navigation.pop();
                }}
              >
                <Icon name="chevron-back" size={18} color={Colors.red} />
              </TouchableOpacity>
              <Text
                red
                center
                size={14}
                adjustsFontSizeToFit
                style={{ flex: 16 }}
              >
                {recipeData.title}
              </Text>
              <View style={{ flex: 1 }} />
            </View>
          </RecipeCard>

          <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
            {/* Reroll button */}
            <TouchableOpacity
              onPress={() => {
                settings && settings.hapticFeedback
                  ? Haptics.impactAsync()
                  : null;
                // reset tts
                Speech.stop();
                setIngredientsTtsPlaying(false);
                setDirectionsTtsPlaying(false);
                // reset recipeData to null
                // so screen will show loading indicator
                setRecipeData(null);
                axios
                  .get(`${API_URL}/${mealType}?vegan=${vegan}`)
                  .then((res) => {
                    // console.log(res.data);
                    setRecipeData(res.data);
                  })
                  .catch((err) => {
                    console.log(err.method);
                    alert(
                      `Sorry, something went wrong. Please try again later.\n\n${err.message}: ${err.code}`
                    );
                    // alert(JSON.stringify(err))
                    props.navigation.pop();
                  });
              }}
            >
              <RecipeCard
                style={{
                  marginBottom: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FA5Icon name="dice" size={28} color={Colors.red} />
                <Text size={14} red style={{ marginLeft: 10 }}>
                  Get a new recipe{"\n"}
                  <Text size={12}>
                    (Searching {showCategory(mealType, vegan)})
                  </Text>
                </Text>
              </RecipeCard>
            </TouchableOpacity>
            {recipeData.image ? (
              <RecipeCard
                style={{
                  marginBottom: 12,
                  height: Dim.width * 0.9,
                  width: Dim.width * 0.9,
                  alignSelf: "center",
                  alignItems: "center",
                  // width: 120,
                }}
              >
                <View style={{ justifyContent: "center", flex: 1 }}>
                  <Image
                    source={{ uri: recipeData.image }}
                    style={{
                      height: Dim.width * 0.82,
                      width: Dim.width * 0.82,
                      borderRadius: 6,
                    }}
                  />
                </View>
              </RecipeCard>
            ) : null}

            {/* Row for recipe details and image */}
            <View
              style={{
                alignSelf: "center",
                flexDirection: "row",
                justifyContent: "center",
                width: Dim.width * 0.9,
              }}
            >
              {/* Recipe Details Card */}
              <RecipeCard style={{ width: undefined, flex: 1, height: "100%" }}>
                {Object.keys(recipeData.recipe_details).map((key, index) => {
                  return (
                    <Text key={index.toString()} size={12}>
                      {key}{" "}
                      <Text r size={12}>
                        {recipeData.recipe_details[key]}
                      </Text>
                    </Text>
                  );
                })}
              </RecipeCard>
              {/* Image Card */}
            </View>

            {/* Ingredients Card */}
            <RecipeCard style={{ marginTop: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text size={14}>Ingredients</Text>
                {/* {alert(JSON.stringify(recipeData.ingredients))}
                {console.log(recipeData.ingredients)} */}
                {settings && settings.tts ? (
                  <TouchableOpacity
                    disabled={directionsTtsPlaying}
                    onPress={() => {
                      settings && settings.hapticFeedback
                        ? Haptics.impactAsync()
                        : null;
                      if (ingredientsTtsPlaying) {
                        Speech.stop();
                        setIngredientsTtsPlaying(false);
                        setDirectionsTtsPlaying(false);
                      } else {
                        setIngredientsTtsPlaying(true);
                        if (recipeData.ingredients["All"]) {
                          for (let ingredient of recipeData.ingredients[
                            "All"
                          ]) {
                            Speech.speak(ingredient);
                          }
                        } else {
                          for (let section of Object.keys(
                            recipeData.ingredients
                          )) {
                            Speech.speak(section);
                            for (let ingredient of recipeData.ingredients[
                              section
                            ]) {
                              Speech.speak(ingredient);
                            }
                          }
                        }
                      }
                    }}
                  >
                    <Icon
                      name={ingredientsTtsPlaying ? "stop" : "volume-high"}
                      size={20}
                      color={directionsTtsPlaying ? "gray" : Colors.red}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>

              <View style={{ marginHorizontal: 20 }}>
                {recipeData.ingredients["All"]
                  ? recipeData.ingredients["All"].map((ingredient) => (
                      <Text r key={ingredient} size={12}>
                        • {ingredient}
                      </Text>
                    ))
                  : Object.keys(recipeData.ingredients).map((key) => {
                      return (
                        <View>
                          <Text size={12}>{key}:</Text>
                          <View style={{ marginLeft: 15 }}>
                            {recipeData.ingredients[key].map((ingredient) => (
                              <Text r key={ingredient} size={12}>
                                • {ingredient}
                              </Text>
                            ))}
                          </View>
                        </View>
                      );
                    })}
              </View>
            </RecipeCard>

            {/* Directions Card */}
            <RecipeCard style={{ marginTop: 12 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text size={14}>Directions</Text>
                {settings && settings.tts ? (
                  <TouchableOpacity
                    disabled={ingredientsTtsPlaying}
                    onPress={() => {
                      settings && settings.hapticFeedback
                        ? Haptics.impactAsync()
                        : null;
                      if (directionsTtsPlaying) {
                        Speech.stop();
                        setIngredientsTtsPlaying(false);
                        setDirectionsTtsPlaying(false);
                      } else {
                        setDirectionsTtsPlaying(true);
                        for (let i = 0; i < recipeData.directions.length; i++) {
                          Speech.speak(`Step ${i + 1}`);
                          Speech.speak(recipeData.directions[i]);
                        }
                      }
                    }}
                  >
                    <Icon
                      name={directionsTtsPlaying ? "stop" : "volume-high"}
                      size={20}
                      color={ingredientsTtsPlaying ? "gray" : Colors.red}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={{ marginHorizontal: 20 }}>
                {recipeData.directions.map((direction, index) => (
                  <>
                    <Text red size={12} style={{ marginVertical: 5 }}>
                      Step {index + 1}
                    </Text>
                    <Text r key={index} size={12}>
                      {direction}
                    </Text>
                  </>
                ))}
              </View>
            </RecipeCard>

            {/* Nutrition Facts Card */}
            <RecipeCard style={{ marginTop: 12 }}>
              <Text size={14} style={{ marginBottom: 5 }}>
                Nutrition Facts
              </Text>
              <FlatList
                data={Object.keys(recipeData.nutrition_facts)}
                numColumns={2}
                renderItem={({ item, index }) => (
                  <Text size={12} style={{ marginRight: 10, width: "35%" }}>
                    {item}:{" "}
                    <Text r size={12}>
                      {recipeData.nutrition_facts[item]}
                    </Text>
                  </Text>
                )}
              />
            </RecipeCard>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/recipeBackground.png")}
          style={{
            flex: 1,
            width: Dim.width,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SkypeIndicator size={100} color={Colors.bgyellow} />
        </ImageBackground>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default RecipeScreen;
