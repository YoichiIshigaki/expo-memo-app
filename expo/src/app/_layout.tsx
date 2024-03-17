import { Stack } from 'expo-router';

const Layout = (): JSX.Element => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#467FD3',
        },
        headerTintColor: '#fff',
        headerTitle: 'Memo App',
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: 'bold',
        },
        headerBackTitle: 'Back',
      }}
    />
  );
};

export default Layout;
