import { useState } from 'react';
import { Button, Image, View, StyleSheet, Text } from 'react-native';
import { launchImageLibraryAsync } from 'expo-image-picker';
import i18n from 'src/lib/localize';

import Input from '@components/Input';

const Index: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async (): Promise<void> => {
    // No permissions request is necessary for launching the image library
    const result = await launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      
      quality: 1,
    });

    console.log({ result });

    if (!result.canceled) {
      console.log('result.assets[0].uri = ', result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text>{i18n.t('screen.setting.username')}</Text>
        <Input
          value={userName}
          onChangeText={(text) => {
            setUserName(text);
          }}
        />
      </View>
      <View>
        <Button
          title={i18n.t('screen.setting.image_button_label')}
          onPress={pickImage}
        />
        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Index;
