import DraggableItemList from '@/components/draggable-item-list';
import { Calculator } from '@/components/Widgets/calculator';
import { ImageFlipper } from '@/components/Widgets/image-flipper';
import { Weather } from '@/components/Widgets/weather';
import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { GestureHandlerRootView, Switch } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const {height} = useWindowDimensions()
  const [scrollHorizontal, setScrollHorizontal] = useState<boolean>(true)
  const actionSheetRef = useRef<ActionSheetRef>(null)
  
  const [widgetList, setWidgetList] = useState([{ type: Calculator }, { type: ImageFlipper }, { type: Weather }]);

  const swapWidgets = (pos1: number, pos2: number ) => {
    let tempArray = [...widgetList];

    tempArray.splice(pos2, 0, tempArray.splice(pos1, 1)[0]);
    setWidgetList(tempArray);
  }

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <SafeAreaView
          style={styles.app}
        >
          <ActionSheet 
            ref={actionSheetRef}
            containerStyle={{backgroundColor: "lightgrey"}}
          >
            <Text>Scroll Type: </Text>
            <View style={styles.switchContainer}>
              <Text style={[styles.switchText, scrollHorizontal ? {color: "grey"} : {color: "black"}]}>Vertical</Text>
              <Switch
                trackColor={{false: '#81b0ff', true: '#81b0ff'}}
                thumbColor={'#f4f3f4'}
                onValueChange={() => setScrollHorizontal(previousState => !previousState)}
                value={scrollHorizontal}
              />
              <Text style={[styles.switchText, scrollHorizontal ? {color: "black"} : {color: "grey"}]}>Horizontal</Text>
            </View>
            {/*<Text>Widgets Order: </Text>*/}
          </ActionSheet>
          <TouchableOpacity 
            onPress={() => actionSheetRef.current?.show()}
            style={{backgroundColor: "cyan", paddingHorizontal: 10, paddingVertical: 10}}
          >
            <Text>Touch here</Text>          
          </TouchableOpacity>
          <DraggableItemList onListChange={swapWidgets} style={{paddingVertical: height / 30}} />
          <ScrollView horizontal={scrollHorizontal} style={scrollHorizontal ? styles.scrollerHorizontal : styles.scrollerVertical}>
            {widgetList.map((widget, index) => {
              const Widget = widget.type;
              return (<Widget style={{paddingVertical: scrollHorizontal ? 5 : height / 30}} key={index}/>);
            })}
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    alignItems: "center",
  },
  switchContainer: {
    marginLeft: "15%",
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    fontSize: 20,
  },
  scrollerVertical: {
    width: "100%",
  },
  scrollerHorizontal: {
  },
});
