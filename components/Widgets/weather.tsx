import axios from 'axios';
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View, type ViewProps } from "react-native";

const WEATHER_API_KEY = "cdec1d7b604941c787d150148250711"
const WEATHER_API_URL = "http://api.weatherapi.com/v1/current.json"

const defaultData = {
  isValid: false,
  city_name: "",
  temp: 0,
  temp_feel: 0,
  wind_speed: 0,
  is_day: 0,
  condition_text: "",
  condition_icon: "",
  humidity: 0,
  precip: 0,
}

export function Weather({style} : ViewProps) {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState(defaultData);
  const [isError, setIsError] = useState(false);
  const [errorCode, setErrorCode] = useState(0);

  //console.log("cityName: " + cityName)
  //console.log("data: \n" + JSON.stringify(weatherData));

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
          //console.log("Submiting  '" + cityName + "'...")
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
              console.log(response.data.current)
              setIsError(false)
              setWeatherData({
                isValid: true,
                city_name: response.data.location.name,
                temp: response.data.current.temp_c,
                temp_feel: response.data.current.feelslike_c,
                wind_speed: response.data.current.wind_kph,
                is_day: response.data.current.is_day,
                condition_text: response.data.current.condition.text,
                condition_icon: "http:" + response.data.current.condition.icon,
                humidity: response.data.current.humidity,
                precip: response.data.current.precip_mm
              })
            })
            .catch(function (error) {
              //1006 === City not found
              console.log("Error: ");
              console.log(error)
              if (error.response) {
                //console.log(error.response.data)
                //console.log(error.response.data.error.code)
                //console.log(error.response.status)
                setErrorCode(error.response.data.error.code)
                setIsError(true)
              }
            })
        }}
      />
      {isError ?
        <Text style={styles.searchText}>
          {errorCode === 1006 ? "We could not find this city\nMake sure the spelling is correct" : "Some kind of error happened, try again later"}
        </Text> :
        weatherData.isValid ?
        <View>
          <Text style={styles.searchText}>
            {"Here's the weather in " + weatherData.city_name + ":"}
          </Text>
          <View style={styles.infoContainer}>
            <View style={{flexDirection: "column",}}>
              <Text>{weatherData.is_day === 1 ? "It's Daytime" : "It's Nighttime"}</Text>
              <View style={styles.tempContainer}>
                <Text style={{fontSize: 50}}>{weatherData.temp + "°"}</Text>
                <Image
                  style={styles.weatherIcon}
                  source={{
                  uri: weatherData.condition_icon,
                  }}
                />
              </View>
              <Text>{"But it feels more like: " + weatherData.temp_feel + "°"}</Text>
            </View>
            <View>
              <Text>{"Wind: " + weatherData.wind_speed + "k/h"}</Text>
              <Text>{"Humidity: " + weatherData.humidity + "%"}</Text>
              <Text>{"Precip: " + weatherData.precip + "mm"}</Text>
            </View>
          </View>
        </View> : null
      }
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
  searchText: {
    marginTop: "3%",
    alignSelf: "center",
  },
  tempContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  weatherIcon: {
    marginHorizontal: 5,
    width: 80,
    height: 80,
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
