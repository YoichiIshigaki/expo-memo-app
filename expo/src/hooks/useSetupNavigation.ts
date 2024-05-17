import { useEffect, createElement } from 'react';
import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import HamburgerToggleButton, {
  type HamburgerToggleButtonProps,
} from '@components/HamburgerToggleButton';
import LogoutButton from '@components/LogoutButton';
import { useNavigation } from 'expo-router';
import { useAtom } from 'jotai';
import { openMenuAtom } from 'src/store/atom';

const defaultHeaderRight = LogoutButton;
const defaultHeaderLeft = (props: HamburgerToggleButtonProps) => () =>
  createElement(HamburgerToggleButton, props);

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
      headerRight === undefined
        ? defaultHeaderRight
        : headerRight === null
          ? undefined
          : headerRight,
    headerLeft:
      headerLeft === undefined
        ? defaultHeaderLeft({ setOpenMenu })
        : headerLeft === null
          ? undefined
          : headerLeft,
  } satisfies NativeStackNavigationOptions;

  useEffect(() => {
    navigation.setOptions(options);
  }, [navigation, options]);
};
