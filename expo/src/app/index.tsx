import 'expo-router/entry';
import { Redirect } from 'expo-router';
import { useAuthCheck } from 'src/hooks/useAuthCheck';

const Index: React.FC = () => {
  useAuthCheck();
  return <Redirect href="auth/login" />;
};

export default Index;
