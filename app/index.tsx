import DraggableItemList from '@/components/draggable-item-list';
import { WidgetElement, WidgetType } from "@/utils/constants";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { GestureHandlerRootView, Switch } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const {height} = useWindowDimensions()
  const [scrollHorizontal, setScrollHorizontal] = useState<boolean>(true)
  const actionSheetRef = useRef<ActionSheetRef>(null)
  
  const [widgetList, setWidgetList] = useState([WidgetType.CALCULATOR, WidgetType.FLIPPER, WidgetType.WEATHER]);

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
            containerStyle={{backgroundColor: "lightgrey", paddingTop: 10}}
          >
            <Text style={styles.settingsText}>{"Scroll Type"}</Text>
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
            <Text style={styles.settingsText}>{"Widgets Order"}</Text>
            <Text style={{color: "grey"}}>{"(Drag the icons arround to change the order)"}</Text>
            <DraggableItemList 
              onListChange={swapWidgets} 
              widgetTypeList={widgetList}
            />
          </ActionSheet>
          <TouchableOpacity 
            onPress={() => actionSheetRef.current?.show()}
            style={styles.optionButton}
          >
            <AntDesign name={"setting"} size={30} color="#000000ff"/>
            <Text>{"Settings"}</Text>
          </TouchableOpacity>
          <ScrollView horizontal={scrollHorizontal} style={scrollHorizontal ? styles.scrollerHorizontal : styles.scrollerVertical}>
            {widgetList.map((widget, index) => {
              const Widget = WidgetElement[widget];
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
  },
  switchContainer: {
    marginLeft: "15%",
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: "white", 
    width: "25%",
    height: 35,
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 10,
    marginLeft: 5,
    marginTop: 5,
    alignItems: "center",
  },
  switchText: {
    fontSize: 20,
  },
  settingsText: {
    paddingLeft: 5,
    fontSize: 17,
    fontWeight: "600",
  },
  scrollerVertical: {
    width: "100%",
  },
  scrollerHorizontal: {
  },
});
