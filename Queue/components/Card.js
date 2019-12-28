import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-swipeable-row';

export default function Card(props) {

    const leftContent = 
        <View style={styles.left}>
        </View>;
    const rightContent = 
        <View style={styles.right}>
        </View>;

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
        <Swipeable style={styles.swipe} leftContent={leftContent} rightContent={rightContent}>
            <View style={styles.container}>
                <Text style={styles.font}>{props.name}</Text>
                <Text style={styles.font}>{average()}</Text>
                <Text style={styles.font}>{props.people + " people"}</Text>
                <TouchableOpacity onPress={clickJoin}><Text>Join</Text></TouchableOpacity>
                <TouchableOpacity onPress={clickLeave}><Text>Leave</Text></TouchableOpacity>
                <Text></Text>
            </View>
        </Swipeable> 
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        padding: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: '#181818',
        borderRadius: 10,
    },
    font: {
        color: 'white',
        fontSize: 20,
    },
    swipe: {
        width: "90%",
        height: "10%",
        margin: 3,
    },
    left: {
        backgroundColor: 'red',
        width: "80%",
        height: "100%",
        borderRadius: 10,
    },
    right: {
        backgroundColor: 'green',
        width: "100%",
        height: "100%",
        borderRadius: 10,
        marginLeft: 25
    }
});