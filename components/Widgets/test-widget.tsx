import { StyleSheet, Text, View } from "react-native";

export function TestWidget() {
  return (
    <View
      style={styles.container}
    >
      <Text>[This Widget is a piece of text]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
