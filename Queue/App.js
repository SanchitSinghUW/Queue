import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/Main';

export default function App() {

  storeData = async (SessionID) => {
    try {
      await AsyncStorage.setItem('SessionID', SessionID);
    } catch (error) {
      console.log(SessionID)
      console.log(error)
    }
  };

  React.useEffect(() => {
    let SessionID = (new Date().getTime() / 1000) * Math.floor(Math.random() * 1000);
    storeData(SessionID);
  });

  return (
    <View style={styles.container}>
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
