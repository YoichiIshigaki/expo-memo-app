import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../infra/firebaseConfig';
import { router } from 'expo-router';

const LogoutButton = (): JSX.Element => {
  const handlePress = () => {
    signOut(auth)
      .then(() => {
        router.replace('/auth/login');
      })
      .catch((error) => {
        console.log(error);
        Alert.alert('ログアウト失敗');
      });
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.text}>ログアウト</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.7)',
  },
});

export default LogoutButton;
