import { Calculator } from '@/components/Widgets/calculator';
import { TestWidget } from '@/components/Widgets/test-widget';
import { StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.app}
    >
      <TestWidget />
      <Calculator style={{paddingTop: "10%"}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    alignItems: "center",
    marginVertical: "15%",
  },
});
