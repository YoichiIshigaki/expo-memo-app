import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

import fontData from '../../assets/fonts/icomoon.ttf';
import fontSelection from '../../assets/fonts/selection.json';

const CustomIcon = createIconSetFromIcoMoon(
  fontSelection,
  'icoMoon',
  'icomoon.ttf',
);

type IconProps = {
  name: string;
  size: number;
  color: string;
};

const Icon = (props: IconProps): JSX.Element | null => {
  const [fontLoaded] = useFonts({
    icoMoon: fontData,
  });
  if (!fontLoaded) {
    return null;
  }
  return <CustomIcon {...props} />;
};

export default Icon;
