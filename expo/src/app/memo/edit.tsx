import { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import CircleButton from '@components/CircleButton';
import Icon from '@components/icon';
import KeyboardAvoidingView from '@components/KeyboardAvoidingView';
import { auth, db } from '../../infra/firestore/firebaseConfig';

const handlePress = async (id: string, text: string): Promise<void> => {
  if (auth.currentUser === null) return;

  try {
    const ref = doc(db, `memo_app_users/${auth.currentUser.uid}/memos`, id);
    const createdAt = (await getDoc(ref)).data()?.created_at;
    await setDoc(ref, {
      body_text: text,
      created_at: createdAt,
      updated_at: Timestamp.fromDate(new Date()),
    });
    // 一覧画面に遷移
    router.back();
  } catch (error) {
    console.log(error);
    Alert.alert('更新できませんでした。');
  }
};

const Edit: React.FC = () => {
  const id = String(useLocalSearchParams<{ id: string }>().id);
  const [bodyText, setBodyText] = useState('');

  useEffect(() => {
    if (auth.currentUser === null) return;
    const ref = doc(db, `memo_app_users/${auth.currentUser.uid}/memos`, id);
    getDoc(ref)
      .then((docRef) => {
        setBodyText(docRef?.data()?.body_text as string);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <KeyboardAvoidingView style={style.container}>
      <View style={style.inputContainer}>
        <TextInput
          style={style.input}
          multiline
          value={bodyText}
          autoFocus
          onChangeText={(text) => {
            setBodyText(text);
          }}
        />
      </View>
      <CircleButton
        onPress={async () => {
          await handlePress(id, bodyText);
        }}
      >
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
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
});

export default Edit;
