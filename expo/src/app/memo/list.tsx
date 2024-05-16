import { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, Button } from 'react-native';
import Icon from '../../components/icon';

import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../../infra/firestore/firebaseConfig';
import {
  docToData,
  type MemoDoc,
  type Memo,
} from '../../infra/firestore/resources/memo';
import MemoListItem from '../../components/MemoListItem';
import CircleButton from '../../components/CircleButton';
import { router } from 'expo-router';
import { useSetupNavigation } from '../../hooks/useSetupNavigation';

const ComponentWithError: React.FC = () => {
  useEffect(() => {
    throw new Error('This is a test error thrown by ComponentWithError.');
  }, []);

  return <View />;
};

const List: React.FC = () => {
  useSetupNavigation();
  const [memos, setMemos] = useState<Memo[]>([]);
  const [response, setResponse] = useState<{ message: string } | null>(null);
  const [isErrorComponentVisible, setIsErrorComponentVisible] = useState(false);

  useEffect(() => {
    if (!auth.currentUser) return;
    const ref = collection(db, `memo_app_users/${auth.currentUser!.uid}/memos`);
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
  // useEffect(() => {
  //   callFunction<{ message: string }>('test.test').then((res) => {
  //     console.log({ res });
  //     setResponse(res);
  //   });
  // }, []);

  const handlePress = () => {
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
            onPress={() => setIsErrorComponentVisible(true)}
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
      {/*追加ボタン */}
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
