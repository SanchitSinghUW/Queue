import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Main from './components/Main';

export default function App() {
  const [socket, setSocket] = React.useState(new WebSocket('wss://hlxwa7203m.execute-api.us-west-2.amazonaws.com/Test'));

  let connect =  () => {
    console.log("connected to " + socket.readyState);

    socket.onopen = () => {
      console.log("opened " + socket);
    }
  };
  
  React.useEffect(() => {
    return () => {
      console.log("closed " + socket.readyState);
      socket.close();
    }
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
