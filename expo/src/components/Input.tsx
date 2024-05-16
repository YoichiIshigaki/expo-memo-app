import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

const Input: React.FC<TextInputProps> = ({
  value,
  onChangeText,
  keyboardType,
  style,
  ...props
}) => {
  return (
    <TextInput
      {...props}
      style={[styles.input, style]}
      autoCapitalize="none"
      keyboardType={keyboardType}
      value={value}
      onChangeText={onChangeText}
    />
  );
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
