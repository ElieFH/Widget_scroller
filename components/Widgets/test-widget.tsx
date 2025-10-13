import { StyleSheet, Text, View } from "react-native";

export function TestWidget() {
  return (
    <View
      style={styles.container}
    >
      <Text>Widget number 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
