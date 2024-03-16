import { StyleSheet, TextInput } from 'react-native';

type Props = { value: string };

const Input = ({ value }: Props): JSX.Element => {
  return <TextInput style={styles.input} value={value} />;
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    height: 48,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
});

export default Input;
