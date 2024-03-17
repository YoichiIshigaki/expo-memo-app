import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from '../../components/icon';

import MemoListItem from '../../components/MemoListItem';
import CircleButton from '../../components/CircleButton';
import { router, useNavigation } from 'expo-router';
import LogoutButton from '../../components/LogoutButton';

const List = (): JSX.Element => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <LogoutButton />;
      },
    });
  }, []);

  const handlePress = () => {
    router.push('/memo/create');
  };
  return (
    <View style={styles.container}>
      {/* メモリスト */}
      {['買い物', '筋トレ', '瞑想'].map((v) => {
        return <MemoListItem title={v} key={v} />;
      })}
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
