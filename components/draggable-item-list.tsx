import { StyleSheet, useWindowDimensions, View, ViewProps } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { clamp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const SQUARE_SIZE = 50;
const DRAGZONE_HEIGHT = 120;

const allowedXValues = [-120, -60, 0, 60, 120];

export function DraggableItemList({style} : ViewProps) {
  const { width } = useWindowDimensions()
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({ x: 0, y: 0 });
  const start = useSharedValue({ x: 0, y: 0 });
  
  const gesture = Gesture.Pan()
    .onBegin(() => {
      start.value = {
        x: offset.value.x,
        y: offset.value.y,
      };
      isPressed.value = true;
    })
    .onUpdate((e) => {
      offset.value = {
        x: clamp(e.translationX + start.value.x, -(width / 2) + (SQUARE_SIZE / 2), (width / 2) - (SQUARE_SIZE / 2)),
        y: clamp(e.translationY + start.value.y, -(SQUARE_SIZE / 2), DRAGZONE_HEIGHT - (SQUARE_SIZE * 1.5)),
      };

    })
    .onEnd(() => {
      const closestX = allowedXValues.reduce((prev, curr) =>
        Math.abs(curr - offset.value.x) < Math.abs(prev - offset.value.x) ? curr : prev
      );

      offset.value = withSpring({
        x: closestX,
        y: 0,
      });
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offset.value.x },
        { translateY: offset.value.y },
        { scale: withSpring(isPressed.value ? 1.2 : 1) },
      ],
      outlineWidth: isPressed.value ? 1 : 0,
    };
  });

  return (
    <View
      style={[styles.container, style]}
    >
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.movableSquare, animatedStyles]} 
        />
      </GestureDetector>
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
    borderRadius: 10,
    backgroundColor: "blue",
    outlineColor: "yellow",
    alignSelf: 'center',
  }
});
