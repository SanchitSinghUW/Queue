//Authors are Albert Huang, June Lee, Sanchit Singh.
//This is the queue app for Career Fair line analytics.
//Backend is hosted on AWS

//Things to work on:
//We notice that the same state is printed several times, when it should just be printed once.
//Look for places where we are redundantly setting state


import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/Main';

export default function App() {
  const [socket, setSocket] = React.useState(new WebSocket('wss://hlxwa7203m.execute-api.us-west-2.amazonaws.com/Test'));

  let connect = () => {
    console.log("connected to " + socket.readyState);

    socket.onopen = () => {
      console.log("opened " + socket);
    }
  };
  
  React.useEffect(() => {

    //componentDidUpdate

    //return is component did unmount
    return () => {
      console.log("closed " + socket.readyState);
      socket.close();
    }
    //componentDidMount
  }, [connect()] );

  return (
    <View style={styles.container}>
      <Main socket={socket}/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    height: "95%"
  },
});
