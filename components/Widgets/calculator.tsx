import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, type ViewProps } from "react-native";

const keyboardValues = [
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "=", "/",
  "C"
];

const isSymbol = (value: String): Boolean => {
  if (value === '+' ||
      value === '*' ||
      value === '-' ||
      value === "/"
    ) {
    return true
  }
  return false
}

export function Calculator({style} : ViewProps) {
  const [calcString, setCalcString] = useState("");
  const [currentNumber, setCurrentNumber] = useState("");
  const [prevString, setPrevString] = useState("");

  //console.log("calcString: " + calcString + "\n" + "currentNumber: " + currentNumber);
  
  const calcButton = (buttonValue: string) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (buttonValue === "C") {
            setCalcString("")
            setCurrentNumber("")
            setPrevString("")
            return
          }
          if (currentNumber === "0" && buttonValue !== "." && !isSymbol(buttonValue) ||
              buttonValue === "." && (currentNumber === "" || currentNumber.includes(".")) ||
              calcString === "NaN" || calcString === "Infinity" || calcString === "-Infinity" ||
              isSymbol(buttonValue) && (calcString === "" || isSymbol(calcString.slice(-1))))
            return
          if (buttonValue === "=") {
            try {
              if (!isSymbol(calcString!.slice(-1)))
                setPrevString(calcString + "=")
                setCurrentNumber("")
                setCalcString(eval(calcString).toString())
            } catch (e) {
              setCurrentNumber("")
              setCalcString("")
            }
          } else {
            if (isSymbol(buttonValue))
              setCurrentNumber("");
            else
              setCurrentNumber(currentNumber + buttonValue);
            setCalcString(calcString + buttonValue)
          }
        }}
        style={[styles.button, {backgroundColor: buttonValue === "=" ? "#96beeb" : isSymbol(buttonValue) ? "#cde5ee" : "#dbe9ec"}]}
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
        <Text style={styles.prevText}>{prevString}</Text>
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
  prevText: {
    fontSize: 20,
    color: "#a3a3a3ff",
    alignSelf: 'flex-end',
    paddingHorizontal: "5%",
  },
  calcText: {
    fontSize: 25,
    alignSelf: 'flex-end',
    paddingHorizontal: "5%",
  },
  calcInput: {
    borderRadius: 8,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    alignSelf: 'center',
    flexDirection: 'column',
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
