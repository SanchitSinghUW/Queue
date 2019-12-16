import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/Main';

export default function App() {
  
  const log = () => {
    alert("ho");
    return <Text>Ass</Text>
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
        {log}
      <Main />
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
});
