import axios from 'axios';
import { useState } from "react";
import { StyleSheet, Text, TextInput, View, type ViewProps } from "react-native";

const WEATHER_API_KEY = "cdec1d7b604941c787d150148250711"
const WEATHER_API_URL = "http://api.weatherapi.com/v1/current.json"

export function Weather({style} : ViewProps) {
  const [cityName, setCityName] = useState("");

  //console.log("cityName: " + cityName)

  return (
    <View
      style={[styles.mainContainer, style]}
    >
      <Text style={styles.titleText}>Weather widget:</Text>
      <Text style={styles.questionText}>What's the weather in your city?</Text>
      <TextInput 
        style={styles.cityInput}
        onChangeText={newText => setCityName(newText)}
        onSubmitEditing={() => {
          console.log("Submiting  '" + cityName + "'...")
          axios.get(WEATHER_API_URL, {
            params: {
              q: cityName
            },
            headers: {
              key: WEATHER_API_KEY
            }
            })
            .then(function (response) {
              console.log("Success: ");
              console.log(response.data)
            })
            .catch(function (error) {
              console.log("Error: ");
              console.log(error)
            })
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
  },
  mainContainer: {
  },
  questionText: {
    marginTop: "5%",
    marginLeft: "20%",
    fontSize: 15,
  },
  cityInput: {
    borderRadius: 8,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    alignSelf: 'center',
    paddingVertical: 5,
    width: "60%",
  }
});
