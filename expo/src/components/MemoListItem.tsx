import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Link } from 'expo-router';
import Icon from './icon';
import type { Memo } from '../infra/firestore/feature/memo';
import { deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../infra/firestore/firebaseConfig';

type MemoListItemProps = { memo: Memo };

const validateMemo = (bodyText: unknown, createdAt: unknown): boolean => {
  if (
    bodyText !== null &&
    createdAt !== null &&
    typeof bodyText === 'string' &&
    createdAt instanceof Date
  ) {
    return true;
  }
  return false;
};

const MemoListItem = ({
  memo: { body_text: bodyText, created_at: createdAt, id },
}: MemoListItemProps): JSX.Element | null => {
  if (!validateMemo(bodyText, createdAt)) {
    return null;
  }
  const handleShare = (): void => {
    if (auth.currentUser === null) {
      console.log('not login');
    }
  };

  const handleDelete = (): void => {
    if (auth.currentUser === null) {
      return;
    }
    const ref = doc(db, `memo_app_users/${auth.currentUser.uid}/memos`, id);

    Alert.alert('メモを削除します。', 'よろしいでしょうか？', [
      { text: 'キャンセル' },
      {
        text: '削除する',
        style: 'destructive',
        onPress: () => async () => {
          try {
            await deleteDoc(ref);
          } catch (error) {
            console.log(error);
            Alert.alert('削除に失敗しました。');
          }
        },
      },
    ]);
  };

  return (
    <Link href={{ pathname: '/memo/detail', params: { id } }} asChild>
      <TouchableOpacity style={styles.memoListItem}>
        <View>
          <Text style={styles.memoListItemTitle}>{bodyText}</Text>
          <Text style={styles.memoListItemDate}>
            {createdAt.toLocaleString('ja-JP')}
          </Text>
        </View>
        <TouchableOpacity onPress={handleDelete}>
          <Icon {...{ name: 'delete', size: 32, color: '#b0b0b0' }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Icon {...{ name: 'share2', size: 32, color: '#b0b0b0' }} />
        </TouchableOpacity>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  memoListItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 19,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.15)',
  },
  memoListItemTitle: {
    fontSize: 16,
    lineHeight: 32,
  },
  memoListItemDate: {
    fontSize: 12,
    lineHeight: 16,
    color: '#848484',
  },
});

export default MemoListItem;
