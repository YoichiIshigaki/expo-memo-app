import { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import {
  View,
  TouchableOpacity,
  Text,
  Animated,
  Easing,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import { Link } from 'expo-router';
import Icon from '@components/Icon';
import AvatarImage from '@components/AvatarImage';

import { openMenuAtom } from 'src/store/atom';

const menuList = [
  {
    title: 'test1',
    href: '/test',
  },
  {
    title: 'test2',
    href: '/test',
  },
  {
    title: 'test3',
    href: '/test',
  },
];

const Menu: React.FC = () => {
  const [openMenu, setOpenMenu] = useAtom(openMenuAtom);
  const { width } = useWindowDimensions();
  const animatedValue = useRef(new Animated.Value(0)).current;
  const menuRef = useRef<View | null>(null);

  const menuWidth = width * (6 / 10);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const animatedConfig = {
    toValue: menuWidth,
    duration: 400,
    easing: Easing.ease,
    useNativeDriver: true,
  };

  const handlePress = (): void => {
    const { toValue, ...rest } = animatedConfig;

    Animated.timing(animatedValue, {
      ...rest,
      toValue: -toValue,
    }).start();

    setTimeout(() => {
      setOpenMenu(!openMenu);
    }, animatedConfig.duration);
  };

  const animatedStyle = {
    transform: [{ translateX: animatedValue }],
  };

  useEffect(() => {
    Animated.timing(animatedValue, animatedConfig).start();
    return () => {
      setOpenMenu(!openMenu);
    };
  }, [animatedValue, animatedConfig, setOpenMenu, openMenu]);

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
      }}
    >
      <Animated.View
        ref={menuRef}
        style={[
          animatedStyle,
          { left: -menuWidth, width: menuWidth },
          styles.menu,
        ]}
      >
        <AvatarImage />
        <TouchableOpacity onPress={handlePress}>
          <Icon {...{ name: 'delete', size: 32, color: '#b0b0b0' }} />
        </TouchableOpacity>
        {menuList.map(({ title, href }, index) => (
          <Link
            href={href}
            asChild
            replace
            onPress={() => {
              setOpenMenu(!openMenu);
            }}
            key={index}
          >
            <TouchableOpacity>
              <Text>{title}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </Animated.View>
      <TouchableOpacity style={styles.backdrop} onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    paddingTop: 20,
    padding: 10,
    margin: 0,
    height: '100%',
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 100,
  },
  backdrop: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#999',
    opacity: 0.5,
    zIndex: 50,
  },
});

export default Menu;
