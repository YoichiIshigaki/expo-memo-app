import { useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Image, View, Text } from 'react-native';
import { useAtom } from 'jotai';
import { openMenuAtom } from '../store/atom';

const HamburgerToggleButton: React.FC = () => {
  const [, setOpenMenu] = useAtom(openMenuAtom);

  const handlePress = () => {
    console.log('toggle pressed');
    setOpenMenu((v) => !v);
  };
  useEffect(() => {
    return () =>
      setOpenMenu(() => {
        return false;
      });
  }, [setOpenMenu]);
  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <Image
          style={styles.image}
          source={{
            uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
  },
});

export default HamburgerToggleButton;
