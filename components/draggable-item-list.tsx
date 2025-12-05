import DraggableSnapItem from "@/components/draggable-snap-item";
import { useState } from "react";
import { StyleSheet, useWindowDimensions, View, ViewProps } from "react-native";

const SQUARE_SIZE = 50;
const DRAGZONE_HEIGHT = 120;

export function DraggableItemList({style} : ViewProps) {
  const { width } = useWindowDimensions();
  const dragzoneCenterPos = width/2 - (SQUARE_SIZE/2);
  const allowedXValues = [dragzoneCenterPos - 80, dragzoneCenterPos, dragzoneCenterPos + 80];

  //each id represent an item and their position in the array represent their position in the list
  const [itemIds, setItemIds] = useState<number[]>([1, 2, 3]);

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
      {itemIds.map((id, index) => {
        return(
          <DraggableSnapItem
            size={SQUARE_SIZE}
            allowedXValues={allowedXValues}
            itemIds={itemIds}
            onCollision={swapItems}
            containerWidth={width}
            containerHeight={DRAGZONE_HEIGHT}
            id={id}
            pos={index}
            key={id}
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
    backgroundColor: 'black',
  },
  movableSquare: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    position: "absolute",
    borderRadius: 10,
    backgroundColor: "blue",
    outlineColor: "yellow",
  }
});
