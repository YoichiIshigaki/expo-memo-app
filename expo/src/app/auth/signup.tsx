import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Link, router } from 'expo-router';

const Signup = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handlePress = () => {
    // 会員登録
    router.push('/memo/list');
  };
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Sign up</Text>
        <Input
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          keyboardType="email-address"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <Input
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          secureTextEntry
          placeholder="Password"
          textContentType="password"
        />
        <Button label="Submit" onPress={handlePress} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registered?</Text>
          <Link href="/auth/login" asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Log In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    height: 48,
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
    color: '#000',
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
    color: '#467FD3',
  },
});

export default Signup;
