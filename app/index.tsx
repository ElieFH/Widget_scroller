import { TestWidget } from '@/components/Widgets/test-widget';
import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.app}
    >
      <TestWidget />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
