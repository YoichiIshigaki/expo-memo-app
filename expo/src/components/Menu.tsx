import { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { View, TouchableOpacity, Text, Animated, Easing } from 'react-native';
import { Link } from 'expo-router';
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
    title: 'test2',
    href: '/test',
  },
];

const Menu: React.FC = () => {
  const [, setOpenMenu] = useAtom(openMenuAtom);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const animatedWidth = {
    transform: [{ translateX: animatedValue }],
  };

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [animatedValue]);

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Animated.View
        style={{
          ...animatedWidth,
          padding: 10,
          flex: 1,
          paddingTop: 40,
          height: '100%',
          backgroundColor: '#eee',
          zIndex: 100,
        }}
      >
        {menuList.map(({ title, href }, index) => (
          <Link href={href} asChild replace key={index}>
            <TouchableOpacity>
              <Text>{title}</Text>
            </TouchableOpacity>
          </Link>
        ))}
      </Animated.View>
      <TouchableOpacity
        style={{
          flex: 1,
          height: '100%',
          backgroundColor: '#999',
          opacity: 0.5,
          zIndex: 50,
        }}
        onPress={() => {
          setOpenMenu((v) => !v);
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 400,
            easing: Easing.ease,
            useNativeDriver: true,
          }).start();
        }}
      />
    </View>
  );
};

export default Menu;
