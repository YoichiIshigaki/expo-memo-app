import { Text, View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
const Test: React.FC = () => {
  return (
    <View>
      <Text>test</Text>
      <Link href="/memo/list" asChild replace>
        <TouchableOpacity>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default Test;
