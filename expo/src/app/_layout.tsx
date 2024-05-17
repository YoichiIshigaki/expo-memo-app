import React from 'react';
import { View, Text, Button, LogBox } from 'react-native';
import { Stack } from 'expo-router';
import ErrorBoundary from 'react-native-error-boundary';
import { useAtom } from 'jotai';
import { openMenuAtom } from 'src/store/atom';
import Menu from '@components/Menu';

LogBox.ignoreAllLogs();

type FallbackProps = { error: Error; resetError: () => void };

const Fallback: React.FC<FallbackProps> = ({ error, resetError }) => {
  console.log(error, resetError);
  return (
    <View style={{ backgroundColor: 'red', marginTop: 100, padding: 20 }}>
      <Text style={{ color: 'white' }}>Something happened!</Text>
      <Text style={{ color: 'white' }}>{error.toString()}</Text>
      <Button
        onPress={() => {
          console.log('reset error');
          resetError();
        }}
        title={'Try again'}
      />
    </View>
  );
};

const errorHandler = (error: Error, stackTrace: string): void => {
  console.error({ error, stackTrace });
};

const Layout: React.FC = () => {
  const [openMenu] = useAtom(openMenuAtom);

  return (
    <ErrorBoundary FallbackComponent={Fallback} onError={errorHandler}>
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
      {openMenu && <Menu />}
    </ErrorBoundary>
  );
};

export default Layout;
