import { View, TextInput, StyleSheet, Alert } from 'react-native';
import CircleButton from '../../components/CircleButton';
import Icon from '../../components/icon';
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView';
import { router } from 'expo-router';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db, auth } from '../../infra/firestore/firebaseConfig';
import { useState } from 'react';

const Create = (): JSX.Element => {
  const [bodyText, setBodyText] = useState('');
  const handlePress = async (text: string): Promise<void> => {
    if (!auth.currentUser) return;
    try {
      console.log(auth.currentUser.uid);
      const ref = collection(
        db,
        `memo_app_users/${auth.currentUser.uid}/memos`,
      );
      const docRef = await addDoc(ref, {
        body_text: text,
        created_at: Timestamp.fromDate(new Date()),
      });
      console.log('success! memo_id = ', docRef.id);
      router.back();
    } catch (error) {
      console.log(error);
      Alert.alert('error');
    }
  };
  return (
    <KeyboardAvoidingView style={style.container}>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          multiline
          autoFocus
          onChangeText={(text) => setBodyText(text)}
          value={bodyText}
        />
      </View>
      <CircleButton onPress={async () => await handlePress(bodyText)}>
        <Icon {...{ name: 'check', size: 40, color: '#fff' }} />
      </CircleButton>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Create;
