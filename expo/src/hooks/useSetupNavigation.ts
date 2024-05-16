import { useEffect } from 'react';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import HamburgerToggleButton from '@components/HamburgerToggleButton';
import LogoutButton from '@components/LogoutButton';
import { useNavigation } from 'expo-router';

const defaultHeaderRight = LogoutButton;
const defaultHeaderLeft = HamburgerToggleButton;

export const useSetupNavigation = (
  headerRight?: React.ReactNode | null,
  headerLeft?: React.ReactNode | null,
): void => {
  const navigation = useNavigation();

  const options = {
    headerRight:
      headerRight === undefined
        ? defaultHeaderRight
        : headerRight === null
          ? undefined
          : () => headerRight,
    headerLeft:
      headerLeft === undefined
        ? defaultHeaderLeft
        : headerLeft === null
          ? undefined
          : () => headerLeft,
  } satisfies NativeStackNavigationOptions;

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);
};
