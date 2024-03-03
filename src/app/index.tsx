import { View, Text, StyleSheet } from 'react-native';

const Index = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text>Hello World!</Text>
          <Text>Logout</Text>
        </View>
      </View>
      {/* todo 1つ目 */}
      <View>
        <View>
          <Text>買い物リスト</Text>
          <Text>{new Date().toISOString()}</Text>
        </View>
        <View>
          <Text>X</Text>
        </View>
      </View>
      {/* todo 2つ目 */}
      <View>
        <View>
          <Text>買い物リスト</Text>
          <Text>{new Date().toISOString()}</Text>
        </View>
        <View>
          <Text>X</Text>
        </View>
      </View>
      {/* todo 3つ目 */}
      <View>
        <View>
          <Text>買い物リスト</Text>
          <Text>{new Date().toISOString()}</Text>
        </View>
        <View>
          <Text>X</Text>
        </View>
      </View>
      {/*追加ボタン */}
      <View>
        <Text>+</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Index;
