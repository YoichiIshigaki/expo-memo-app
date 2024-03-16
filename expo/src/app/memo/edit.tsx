import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import Header from '../../components/Header';
import CircleButton from '../../components/CircleButton';
import Icon from '../../components/icon';

const Edit = (): JSX.Element => {
  return (
    <KeyboardAvoidingView behavior="height" style={style.container}>
      <Header />
      <View style={style.inputContainer}>
        <TextInput style={style.input} multiline value={'買い物リスト\naaa'} />
      </View>
      <CircleButton>
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
    paddingVertical: 32,
    paddingHorizontal: 27,
    flex: 1,
  },
  input: {
    flex: 1,
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Edit;
