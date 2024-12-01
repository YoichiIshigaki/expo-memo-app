import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, Button } from 'react-native';
import { router } from 'expo-router';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import Icon from '@components/Icon';
import MemoListItem from '@components/MemoListItem';
import CircleButton from '@components/CircleButton';
import {
  docToData,
  type MemoDoc,
  type Memo,
} from '../../infra/firestore/feature/memo';
import { db, auth } from '../../infra/firestore/firebaseConfig';
import { useSetupNavigation } from '../../hooks/useSetupNavigation';
import { callFunction } from '../../infra/function/apiClient';

const ComponentWithError: React.FC = () => {
  useEffect(() => {
    throw new Error('This is a test error thrown by ComponentWithError.');
  }, []);

  return <View />;
};

const List: React.FC = () => {
  useSetupNavigation({});

  const [memos, setMemos] = useState<Memo[]>([]);
  const [response, setResponse] = useState<{ message: string } | null>(null);
  const [isErrorComponentVisible, setIsErrorComponentVisible] = useState(false);

  useEffect(() => {
    if (auth.currentUser === null) return;
    const ref = collection(db, `memo_app_users/${auth.currentUser.uid}/memos`);
    const q = query(ref, orderBy('created_at', 'desc'));
    const unsubscribe = onSnapshot(q, (snapShot) => {
      const remoteMemos: Memo[] = [];
      snapShot.forEach((doc) => {
        remoteMemos.push(docToData(doc.id, doc.data() as MemoDoc));
      });
      setMemos(remoteMemos);
    });

    return unsubscribe;
  }, []);

  // call cloud function
  useEffect(() => {
    const fetchFunction = async (): Promise<void> => {
      const res = await callFunction<{ message: string }>('test.test');
      setResponse(res);
    };

    void fetchFunction();
  }, []);

  const handlePress = (): void => {
    router.push('/memo/create');
  };
  return (
    <View style={styles.container}>
      {process.env.NODE_ENV === 'development' && (
        <View>
          {/* cloud functions response */}
          {response && (
            <View style={{ backgroundColor: '#467FD3' }}>
              <Text style={{ color: '#fff', textAlign: 'center' }}>
                {response.message}
              </Text>
            </View>
          )}
          <Button
            title="Throw error"
            onPress={() => {
              setIsErrorComponentVisible(true);
            }}
          />
          <Button
            title="go web view"
            onPress={() => {
              router.push('/web');
            }}
          />
          <Text style={{ textAlign: 'center' }}>
            NODE_ENV: {process.env.NODE_ENV}
          </Text>
        </View>
      )}
      {isErrorComponentVisible && <ComponentWithError />}
      {/* メモリスト */}
      <FlatList
        data={memos}
        renderItem={({ item }) => <MemoListItem memo={item} />}
      />
      {/* 追加ボタン  */}
      <CircleButton onPress={handlePress}>
        <Icon {...{ name: 'plus', size: 40, color: '#fff' }} />
      </CircleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default List;
