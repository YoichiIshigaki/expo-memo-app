import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { onSnapshot, doc } from 'firebase/firestore';
import CircleButton from '@components/CircleButton';
import Icon from '@components/icon';
import { TextBodyViewWithLink } from '@components/TextBodyViewWithLink';
import { auth, db } from '../../infra/firestore/firebaseConfig';
import {
  type Memo,
  type MemoDoc,
  docToData,
} from '../../infra/firestore/feature/memo';

const Detail: React.FC = () => {
  const id = String(useLocalSearchParams<{ id: string }>().id);

  const [memo, setMemo] = useState<Memo | null>(null);

  useEffect(() => {
    if (auth.currentUser === null) {
      return;
    }

    const ref = doc(db, `memo_app_users/${auth.currentUser.uid}/memos`, id);
    const unsubscribe = onSnapshot(ref, (memoDoc) => {
      setMemo(docToData(memoDoc.id, memoDoc.data() as MemoDoc));
    });
    return unsubscribe;
  }, []);
  const handlePress = () => {
    // 編集画面に遷移
    router.push({ pathname: '/memo/edit', params: { id } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle} numberOfLines={1}>
          {memo?.body_text}
        </Text>
        <Text style={styles.memoDate}>
          {memo?.created_at.toLocaleString('ja-JP')}
        </Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <TextBodyViewWithLink textBody={memo?.body_text || ''} />
      </ScrollView>
      <CircleButton onPress={handlePress} style={{ top: 160 }}>
        <Icon {...{ name: 'pencil', size: 40, color: '#fff' }} />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  memoHeader: {
    backgroundColor: '#467FD3',
    header: 96,
    justifyContent: 'center',
    paddingVertical: 24,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: '#fff',
    fontSize: 20,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  memoDate: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 16,
  },
  memoBody: {
    paddingHorizontal: 27,
  },
  memoBodyText: {
    paddingVertical: 32,
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
});

export default Detail;
