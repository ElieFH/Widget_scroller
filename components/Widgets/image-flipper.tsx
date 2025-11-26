import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { Asset } from 'expo-asset';
import { ImageResult } from 'expo-image-manipulator';
import { useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View, type ViewProps } from "react-native";

const DEFAULT_IMAGE = Asset.fromModule(require('@/assets/images/key.png'));

export function ImageFlipper({style} : ViewProps) {
  const { width } = useWindowDimensions()
  const [image, setImage] = useState<Asset | ImageResult>(DEFAULT_IMAGE);
  //const context = useImageManipulator(DEFAULT_IMAGE.uri);

  const rotateAnim = useRef(new Animated.Value(0)).current;
  const rotationCount = useRef(0);

  const rotateRange = rotateAnim.interpolate({
    inputRange: [0, 4],
    outputRange: ['0deg', '360deg']
  })

  const flipXAnim = useRef(new Animated.Value(0)).current;
  const flipXTarget= useRef(0);

  const flipXRange = flipXAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })

  const flipYAnim = useRef(new Animated.Value(0)).current;
  const flipYTarget= useRef(0);

  const flipYRange = flipYAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })

  //** Deprecated: Used to directly modified and save the image itself **/
  //
  //const rotate = async (value: number) => {
  //  context.rotate(value * 90);
  //  const image = await context.renderAsync();
  //  const result = await image.saveAsync({
  //    format: SaveFormat.PNG,
  //  });
  //  
  //  setImage(result)
  //}
  //const flip = async (type: FlipType) => {
  //  context.flip(type);
  //  const image = await context.renderAsync();
  //  const result = await image.saveAsync({
  //    format: SaveFormat.PNG,
  //  });
  //
  //  setImage(result)
  //}

  const flipX = () => {
    flipXTarget.current = flipXTarget.current === 1 ? 0 : 1
    Animated.timing(flipXAnim, {
      toValue: flipXTarget.current,
      duration: 600,
      //easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }

  const flipY = () => {
    flipYTarget.current = flipYTarget.current === 1 ? 0 : 1
    Animated.timing(flipYAnim, {
      toValue: flipYTarget.current,
      duration: 600,
      //easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }

  const rotate = (value: number) => {
    if (rotationCount.current === 4 || rotationCount.current === -4) {
      rotateAnim.setValue(0)
      rotationCount.current = value
    } else
      rotationCount.current += value
    Animated.timing(rotateAnim, {
      toValue: rotationCount.current,
      duration: 600,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View
      style={[styles.mainContainer, {width: width}, style]}
    >
      <Text style={styles.titleText}>Image Flipper:</Text>
      <View style={styles.widgetContainer}>
        <Animated.Image 
          source={{ uri: image.uri }} 
          style={[styles.image, {transform: [{rotate: rotateRange}, {rotateX: flipXRange}, {rotateY: flipYRange}] }]}
        />
        <View style={styles.toolBar}>
          <TouchableOpacity style={styles.buttons} onPress={() => {rotationCount.current % 2 === 0 ? flipY() : flipX()}}>
            <FontAwesome5 name="arrows-alt-h" size={45} color="#103575" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {rotationCount.current % 2 === 0 ? flipX() : flipY()}}>
            <FontAwesome5 name="arrows-alt-v" size={45} color="#103575" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {rotate(-1)}}>
            <AntDesign name="rotate-left" size={45} color="#103575" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {rotate(1)}}>
            <AntDesign name="rotate-right" size={45} color="#103575" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 20,
  },
  mainContainer: {
  },
  widgetContainer: {
    alignItems: "center",
  },
  buttons: {
    paddingHorizontal: 10,
  },
  image: {
    width: 150,
    height: 150,
  },
  toolBar: {
    flexDirection: "row",
  }
});