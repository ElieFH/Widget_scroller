import { Calculator } from '@/components/Widgets/calculator';
import { Weather } from '@/components/Widgets/weather';
import { ScrollView, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.app}
    >
      <ScrollView style={styles.scroller}>
        <Weather style={{paddingTop: "10%"}}/>
        <Calculator style={{paddingTop: "10%"}}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    alignItems: "center",
  },
  scroller: {
    width: "100%",
  }
});
