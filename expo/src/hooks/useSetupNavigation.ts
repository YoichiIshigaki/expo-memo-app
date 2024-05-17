import { useEffect, createElement } from 'react';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import HamburgerToggleButton, {
  type HamburgerToggleButtonProps,
} from '@components/HamburgerToggleButton';
import LogoutButton from '@components/LogoutButton';
import { useNavigation } from 'expo-router';
import { useAtom } from 'jotai';
import { openMenuAtom } from '../store/atom';

const defaultHeaderRight = LogoutButton;
const defaultHeaderLeft = (props: HamburgerToggleButtonProps) =>
  function DefaultHeaderLeftBase() {
    return createElement(HamburgerToggleButton, props);
  };

type UseSetupNavigationProps = {
  headerRight?: () => JSX.Element | null;
  headerLeft?: () => JSX.Element | null;
};

export const useSetupNavigation = ({
  headerRight,
  headerLeft,
}: UseSetupNavigationProps): void => {
  const navigation = useNavigation();
  const [, setOpenMenu] = useAtom(openMenuAtom);

  const options = {
    headerRight:
      headerRight === undefined ? defaultHeaderRight : headerRight ?? undefined,
    headerLeft:
      headerLeft === undefined
        ? defaultHeaderLeft({ setOpenMenu })
        : headerLeft ?? undefined,
  } satisfies NativeStackNavigationOptions;

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);
};
