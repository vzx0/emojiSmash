import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Button from './components/Button';
import * as ImagePicker from 'expo-image-picker';
import ImageViewer from "./components/ImageViewer";
import { useState } from 'react';
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';
import EmojiPicker from "./components/EmojiPicker";


const PlaceholderImage = require("./assets/images/background-image.png");

const onReset = () => {
  setShowAppOptions(false);
};

const onAddSticker = () => {
  setIsModalVisible(true);
};
const onModalClose = () => {
  setIsModalVisible(false);
};

export default function App() {

const [isModalVisible, setIsModalVisible] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);
const [showAppOptions, setShowAppOptions] = useState(false);

const pickImageAsync = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    setSelectedImage(result.assets[0].uri);
    setShowAppOptions(true);
  } else {
    alert('You did not select any image.');
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      {showAppOptions ? (
    <View style={styles.optionsContainer}>
      <View style={styles.optionsRow}>
      <IconButton icon="refresh" label="Reset" onPress={onReset} />
        <CircleButton/>
        <IconButton icon="save-alt" label="Save" />
      </View>
    </View>
  ) : (
    <View style={styles.footerContainer}>
      <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
      <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
    </View>
  )
}

<EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
  {/* A lista com Emojis será inserida aqui */}
</EmojiPicker>

      <StatusBar style="auto"/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});