import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, type ViewProps } from "react-native";

const keyboardValues = [
  "7", "8", "9", "*",
  "4", "5", "6", "-",
  "1", "2", "3", "+",
  "0", ".", "=", "/",
  "C", "CE"
];

const symbolRegex = /(?:\+|\-|\*|\/)(?!.*(?:\+|\-|\*|\/))/

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

const isError = (value: String): Boolean => {
  if (value === 'NaN' ||
      value === 'Infinity' ||
      value === '-Infinity'
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
          if (buttonValue === "CE") {
            const newCalcValue = isError(calcString) ? "" : calcString.slice(0, -1)

            setCalcString(newCalcValue)
            if (currentNumber.length > 0)
              setCurrentNumber(currentNumber.slice(0, -1))
            else {
              symbolRegex.exec(newCalcValue) ? setCurrentNumber(newCalcValue.slice(symbolRegex.exec(newCalcValue)?.index + 1)) : setCurrentNumber(newCalcValue)
            }
            return
          }
          if (currentNumber === "0" && buttonValue !== "."  && buttonValue !== "=" && !isSymbol(buttonValue) ||
              buttonValue === "." && (currentNumber === "" || currentNumber.includes(".") || isError(calcString)) ||
              isSymbol(buttonValue) && (calcString === "" || calcString.slice(-1) === "." || isSymbol(calcString.slice(-1)) || isError(calcString)) ||
              buttonValue === "=" && (isSymbol(calcString.slice(-1)) || calcString.slice(-1) === "."))
            return
          if (buttonValue === "=") {
            try {
              if (!isSymbol(calcString.slice(-1)))
                setPrevString(calcString + "=")
                setCalcString(eval(calcString).toString())
                setCurrentNumber(eval(calcString).toString())
            } catch (e) {
              setCurrentNumber("")
              setCalcString("")
            }
          } else {
            if (isSymbol(buttonValue))
              setCurrentNumber("");
            else
              isError(calcString) ? setCurrentNumber(buttonValue) : setCurrentNumber(currentNumber + buttonValue);
            isError(calcString) ? setCalcString(buttonValue) : setCalcString(calcString + buttonValue)
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
