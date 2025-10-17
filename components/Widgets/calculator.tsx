import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, type ViewProps } from "react-native";

const keyboardValues = [
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "C", "="
];

export function Calculator({style} : ViewProps) {
  const [calcString, setCalcString] = useState("");
  
  const calcButton = (buttonValue: string) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (buttonValue === "=") {
            try {
              setCalcString(eval(calcString))
            } catch (e) {
              setCalcString("")
            }
          } else {
            buttonValue === "C" ? setCalcString("") : setCalcString(calcString + buttonValue)
          }
        }}
        style={styles.button}
        key={buttonValue}
      >
        <Text>{buttonValue}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View
      style={[styles.mainContainer, style]}
    >
      <Text style={styles.titleText}>Calculator:</Text>
      <View style={styles.calcInput}>
        <Text style={styles.calcText}>{calcString}</Text>
      </View>
      <View style={styles.calcButtonsArea}>
        {keyboardValues.map(value => calcButton(value))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 20,
  },
  calcText: {
    fontSize: 25,
    paddingHorizontal: "5%",
  },
  calcInput: {
    borderRadius: 8,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    alignSelf: 'center',
    flexDirection: 'row-reverse',
    marginTop: "5%",
    paddingVertical: 5,
    width: "80%",
  },
  calcButtonsArea: {
    width: "82%",
    alignSelf:"center",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  button: {
    borderRadius: "100%",
    //borderColor: "black",
    //borderWidth: 2,
    backgroundColor: "#cde5eeff",
    alignItems: "center",
    justifyContent:"center",
    width: 75,
    height: 75,
    marginBottom: 5
  }
});
