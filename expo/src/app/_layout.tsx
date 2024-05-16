import { Stack } from 'expo-router';
import ErrorBoundary from 'react-native-error-boundary';
import { View, Text, Button } from 'react-native';
import { LogBox } from 'react-native';
import { useAtom } from 'jotai';
import { openMenuAtom } from 'src/store/atom';
import Menu from '@components/Menu';

LogBox.ignoreAllLogs();

const CustomFallback = (props: { error: Error; resetError: Function }) => {
  console.log(props.error, props.resetError);
  return (
    <View style={{ backgroundColor: 'red', marginTop: 100, padding: 20 }}>
      <Text style={{ color: 'white' }}>Something happened!</Text>
      <Text style={{ color: 'white' }}>{props.error.toString()}</Text>
      <Button
        onPress={() => {
          console.log('reset error');
          props.resetError();
        }}
        title={'Try again'}
      />
    </View>
  );
};

const errorHandler = (error: Error, stackTrace: string) => {
  /* Log the error to an error reporting service */
  console.error({ error, stackTrace });
};

const Layout = (): JSX.Element => {
  const [openMenu] = useAtom(openMenuAtom);

  return (
    <ErrorBoundary FallbackComponent={CustomFallback} onError={errorHandler}>
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
