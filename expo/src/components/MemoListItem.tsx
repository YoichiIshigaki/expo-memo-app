import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './icon';
import { Link } from 'expo-router';
import { Memo } from '../infra/firestore/resources/memo';

type Props = { memo: Memo };

const validateMemo = (bodyText: unknown, createdAt: unknown) => {
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
  memo: { body_text: bodyText, created_at: createdAt },
}: Props): JSX.Element | null => {
  if (!validateMemo(bodyText, createdAt)) {
    return null;
  }
  return (
    <Link href="/memo/detail" asChild>
      <TouchableOpacity style={styles.memoListItem}>
        <View>
          <Text style={styles.memoListItemTitle}>{bodyText}</Text>
          <Text style={styles.memoListItemDate}>
            {createdAt.toLocaleString('ja-JP')}
          </Text>
        </View>
        <TouchableOpacity>
          <Icon {...{ name: 'delete', size: 32, color: '#b0b0b0' }} />
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
