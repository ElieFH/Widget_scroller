import { useEffect } from "react";
import { StyleSheet, Text, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { clamp, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { scheduleOnRN } from "react-native-worklets";

type DraggableSnapItemProps = {
  size?: number,
  containerWidth: number, 
  containerHeight: number,
  allowedXValues: number[],
  itemIds: number[],
  onCollision: (pos1: number, pos2: number) => void,
  id: number,
  pos: number,
  style?: ViewStyle,
};

const DraggableSnapItem: React.FC<DraggableSnapItemProps> = ({
  size = 50,
  containerWidth, 
  containerHeight,
  allowedXValues,
  onCollision,
  id,
  pos,
  style,
}) => {
  const fixedY = (containerHeight / 2) - (size / 2);
  const hitbox = (size/2 + size/3);
  const isPressed = useSharedValue(false);
  const isSwapping = useSharedValue(false);
  const currentPos = useSharedValue(pos);
  const offset = useSharedValue({ x: allowedXValues[pos], y: fixedY });
  const start = useSharedValue({ x: allowedXValues[pos], y: fixedY });

  useEffect(() => {
    if (currentPos.value !== pos) {
      if (!isPressed.value) {
        //console.log("Moving item " + id + " from " + currentPos.value + " to " + pos);
        offset.value = withSpring({
          x: allowedXValues[pos],
          y: fixedY,
        }, {
          duration: 350,
        });

        start.value = {
          x: allowedXValues[pos],
          y: fixedY,
        };
      }
      
      currentPos.value = pos;
    }
  }, [pos]);
  
  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      offset.value = {
        x: clamp(e.translationX + start.value.x, 0, containerWidth - size),
        y: clamp(e.translationY + start.value.y, 0, containerHeight - size),
      };

      //Check for collision / separation
      if (isSwapping.value) {
        if (pos === currentPos.value) {
          isSwapping.value = false;
        }
      } else {
        if (pos !== 0 && offset.value.x < allowedXValues[pos - 1] + hitbox) {
          //console.log("collision!!! (left)");
          isSwapping.value = true;
          currentPos.value = pos - 1;
          scheduleOnRN(onCollision, pos, pos - 1);
        }

        if (pos !== allowedXValues.length - 1 && offset.value.x + hitbox > allowedXValues[pos + 1]) {
          //console.log("collision!!! (right)");
          isSwapping.value = true;
          currentPos.value = pos + 1;
          scheduleOnRN(onCollision, pos, pos + 1);
        }
      }
    })
    .onEnd(() => {
      //const closestX = allowedXValues.reduce((prev, curr) =>
      //  Math.abs(curr - offset.value.x) < Math.abs(prev - offset.value.x) ? curr : prev
      //);

      offset.value = withSpring({
        x: allowedXValues[currentPos.value],
        y: fixedY,
      });

      start.value = {
        x: allowedXValues[currentPos.value],
        y: fixedY,
      };
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
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.movableSquare, style, {width: size, height: size, justifyContent: "center"}, animatedStyles]} 
        >
          <Text style={{color: "white", fontSize: 15, alignSelf: "center"}}>{id}</Text>
        </Animated.View>
      </GestureDetector>
  );
}

const styles = StyleSheet.create({
  movableSquare: {
    position: "absolute",
    borderRadius: 10,
    backgroundColor: "blue",
    outlineColor: "yellow",
  }
});

export default DraggableSnapItem;
