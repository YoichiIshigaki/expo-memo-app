import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import Hello from './src/components/atom/Hello';

const images = [
  "https://plus.unsplash.com/premium_photo-1700577888245-9729a4fe6040?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
//  
const App = () => {

  return (
    <View style={styles.container}>
      <Hello bang style={{color:"#777"}}>World</Hello> 
      <Hello style={{color:"#aaa",fontSize:18}}>World</Hello> 
      <Text style={styles.mainText} >
        Expo App!!
      </Text>
        {/* <Image
          source={images[0]}
          style={styles.image}
          transition={1000}
        /> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
  mainText: {
    fontSize: 28,
    color: '#0553',
    // position: "absolute",
    // top: "50%",
    // left: "50%",
  }
});

export default App;