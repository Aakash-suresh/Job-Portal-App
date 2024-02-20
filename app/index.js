import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Data from '../screen/data';

export default function App() {
  return (
    <SafeAreaView>
      <View>
        <Data/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
