import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { Asset } from 'expo-asset';
import { FlipType, ImageResult, SaveFormat, useImageManipulator } from 'expo-image-manipulator';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, type ViewProps } from "react-native";

const DEFAULT_IMAGE = Asset.fromModule(require('@/assets/images/key.png'));

export function ImageFlipper({style} : ViewProps) {
  const [image, setImage] = useState<Asset | ImageResult>(DEFAULT_IMAGE);
  const context = useImageManipulator(DEFAULT_IMAGE.uri);

  const rotate = async (value: number) => {
    context.rotate(value);
    const image = await context.renderAsync();
    const result = await image.saveAsync({
      format: SaveFormat.PNG,
    });

    setImage(result)
  }

  const flip = async (type: FlipType) => {
    context.flip(type);
    const image = await context.renderAsync();
    const result = await image.saveAsync({
      format: SaveFormat.PNG,
    });

    setImage(result)
  }

  return (
    <View
      style={[styles.mainContainer, style]}
    >
      <Text style={styles.titleText}>Image Flipper:</Text>
      <View style={styles.widgetContainer}>
        <Image source={{ uri: image.uri }} style={styles.image} />
        <View style={styles.toolBar}>
          <TouchableOpacity style={styles.buttons} onPress={() => {flip(FlipType.Horizontal)}}>
            <FontAwesome5 name="arrows-alt-h" size={45} color="#103575" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {flip(FlipType.Vertical)}}>
            <FontAwesome5 name="arrows-alt-v" size={45} color="#103575" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {rotate(-90)}}>
            <AntDesign name="rotate-left" size={45} color="#103575" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={() => {rotate(90)}}>
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
    width: "100%",
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