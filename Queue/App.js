//Authors are Albert Huang, June Lee, Sanchit Singh.
//This is the queue app for Career Fair line analytics.
//Backend is hosted on AWS

//Things to work on:
//We notice that the same state is printed several times, when it should just be printed once.
//Look for places where we are redundantly setting state


import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Main from './components/Main';
import * as APIs from './APIkeys';

export default function App() {
  const [socket, setSocket] = React.useState(new WebSocket(APIs.WEB_SOCKET));
  const [disconnected, setDisconnected] = React.useState(false);
  let connect = () => {
    console.log("connected to " + socket.readyState);

    socket.onopen = () => {
      console.log("opened " + socket);
      setDisconnected(false);
    }

    socket.onclose = () => {
      setDisconnected(true);
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
      {disconnected ? 
        <View style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Text style={{color: 'white', fontSize: 70}}>Server Down</Text>
          <Image source={require('./icons/loading.gif')} style={styles.image}/>
          <Text style={{color: 'white', fontSize: 70}}>Try Again</Text>
        </View> :
         <Main socket={socket}/>}
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
  image: {

  }
});
