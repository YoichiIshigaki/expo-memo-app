import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import CircleButton from '../../components/CircleButton';
import Icon from '../../components/icon';
import { router } from 'expo-router';

const Create = (): JSX.Element => {
  const handlePress = () => {
    router.back();
  };
  return (
    <KeyboardAvoidingView behavior="height" style={style.container}>
      <View style={style.inputContainer}>
        <TextInput style={style.input} multiline value={''} />
      </View>
      <CircleButton onPress={handlePress}>
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

export default Create;
