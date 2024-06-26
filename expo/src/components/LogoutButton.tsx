import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { auth } from '../infra/firestore/firebaseConfig';

const LogoutButton: React.FC = () => {
  const handlePress = (): void => {
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
