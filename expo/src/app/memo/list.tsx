import { View, StyleSheet } from 'react-native';
import Icon from '../../components/icon';

import Header from '../../components/Header';
import MemoListItem from '../../components/MemoListItem';
import CircleButton from '../../components/CircleButton';

const List = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Header />
      {/* メモリスト */}
      {['買い物', '筋トレ', '瞑想'].map((v) => {
        return <MemoListItem title={v} key={v} />;
      })}
      {/*追加ボタン */}
      <CircleButton>
        <View>
          <Icon {...{ name: 'plus', size: 40, color: '#fff' }} />
        </View>
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
