import DraggableSnapItem from "@/components/draggable-snap-item";
import { WidgetTypeKey } from "@/utils/constants";
import { useState } from "react";
import { StyleSheet, useWindowDimensions, View, ViewStyle } from "react-native";

const SQUARE_SIZE = 50;
const DRAGZONE_HEIGHT = 100;

type DraggableItemListProps = {
  onListChange: (pos1: number, pos2: number) => void,
  widgetTypeList: ("CALC" | "WEATHER" | "FLIP")[],
  style?: ViewStyle,
};

const DraggableItemList: React.FC<DraggableItemListProps> = ({onListChange, widgetTypeList, style}) => {
  const { width } = useWindowDimensions();
  const dragzoneCenterPos = width/2 - (SQUARE_SIZE/2);
  const allowedXValues = [dragzoneCenterPos - 80, dragzoneCenterPos, dragzoneCenterPos + 80];

  const [itemIds, setItemIds] = useState<("CALC" | "WEATHER" | "FLIP")[]>(widgetTypeList);

  const swapItems = (pos1: number, pos2: number ) => {
    let tempArray = [...itemIds];
    const tempPos = itemIds[pos1];

    tempArray[pos1] = itemIds[pos2];
    tempArray[pos2] = tempPos;

    setItemIds(tempArray);
  }

  return (
    <View
      style={[styles.container, style]}
    >
      {itemIds.map((type, index) => {
        return(
          <DraggableSnapItem
            size={SQUARE_SIZE}
            allowedXValues={allowedXValues}
            onCollision={swapItems}
            onRelease={onListChange}
            containerWidth={width}
            containerHeight={DRAGZONE_HEIGHT}
            type={type}
            pos={index}
            key={WidgetTypeKey[type]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: DRAGZONE_HEIGHT,
    backgroundColor: "black",
  },
});

export default DraggableItemList;
