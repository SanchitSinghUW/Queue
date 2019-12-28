import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function Card(props) {

    clickJoin = () => {
        //backend relies on there to be a 0 or a 1 prepended. 1 means enque.
        if(props.queued === "NA"){
            try {
                let data = {
                    "action": "enqueue",
                    "data": "1" + props.name
                };
                props.socket.send(JSON.stringify(data));
                props.setQueued(props.name);
            } catch(e) {
                console.log(e);
            }
        }
    };

    clickLeave = () => {
        //backend relies on there to be a 0 or a 1 prepended. 0 means denque.
        if(props.queued === props.name){
            try {
                let data = {
                    "action": "enqueue",
                    "data": "0" + props.name
                };
                props.socket.send(JSON.stringify(data));
                props.setQueued("NA");
            } catch(e) {
                console.log(e);
            }
        }
    };

    const average = () => {
        let now = new Date();
        let old = new Date(props.startTime);
        let difference = (now.getHours()*60 - old.getHours()*60) + (now.getMinutes() - old.getMinutes());
        let dequeued = parseInt(props.countDequeued);
        let average = difference / dequeued;
            
        if(isNaN(average) || dequeued === 0){
            average = 0;
        }
        return Math.round(average) + " mins";
    }

    return (
        <View style={styles.container}>
            <Text>{props.name}</Text>
            <Text>{average()}</Text>
            <Text>{props.people + " people"}</Text>
            <TouchableOpacity onPress={clickJoin}><Text>Join</Text></TouchableOpacity>
            <TouchableOpacity onPress={clickLeave}><Text>Leave</Text></TouchableOpacity>
            <Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});