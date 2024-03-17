import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link, router } from 'expo-router';

const Login = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handlePress = () => {
    // ログイン
    router.replace('/memo/list');
  };
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Login</Text>
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
          <Text style={styles.footerText}>Not Registered?</Text>
          <Link href="/auth/signup" asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Sign Up Here!</Text>
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

export default Login;
