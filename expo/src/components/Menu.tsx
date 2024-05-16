import { useAtom } from 'jotai';
import { View, TouchableOpacity, Text } from 'react-native';
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
// TODO: Animationで数値が時間とともに変動するようにする。
const menuWidth = '30%';

const Menu: React.FC = () => {
  const [, setOpenMenu] = useAtom(openMenuAtom);

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
      <View
        style={{
          width: menuWidth,
          padding: 10,
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
      </View>
      <TouchableOpacity
        style={{
          flex: 1,
          height: '100%',
          backgroundColor: '#999',
          opacity: 0.5,
          zIndex: 50,
        }}
        onPress={() => setOpenMenu((v) => !v)}
      />
    </View>
  );
};

export default Menu;
