import { View, Text, ScrollView, StyleSheet } from 'react-native';

import CircleButton from '../../components/CircleButton';
import Icon from '../../components/icon';
import { router } from 'expo-router';

const Detail = (): JSX.Element => {
  const handlePress = () => {
    // 編集画面に遷移
    router.push('/memo/edit');
  };
  return (
    <View style={styles.container}>
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle}>買い物リスト</Text>
        <Text style={styles.memoDate}>{new Date().toISOString()}</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoBodyText}>
          買い物リスト
          {Array.from({ length: 10 }, () => 'test\n')}
        </Text>
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
    paddingVertical: 32,
    paddingHorizontal: 27,
  },
  memoBodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
  },
});

export default Detail;
