import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function Card(props) {

    const [people, setPeople] = React.useState(0);

    getPeople = async () => {
        try {

        } catch(e) {

        }
    };

    clickJoin = () => {
        //backend relies on there to be a 0 or a 1 prepended. 1 means enque.
        try {
            let data = {
                "action": "enqueue",
                "data": "1" + props.name
            };
            props.socket.send(JSON.stringify(data));
        } catch(e) {
            console.log(e);
        }
    };

    clickLeave = () => {
        //backend relies on there to be a 0 or a 1 prepended. 0 means denque.
        try {
            let data = {
                "action": "enqueue",
                "data": "0" + props.name
            };
            props.socket.send(JSON.stringify(data));
        } catch(e) {
            console.log(e);
        }
    };

    getCount = async () => {
        try {

        } catch(e) {

        }
    };

    const average = () => {
        let now = new Date();
        let old = new Date(props.startTime);
        let difference = (now.getHours()*60 - old.getHours()*60) + (now.getMinutes() - old.getMinutes());
        let average = difference / props.countDequeued;
        return Math.round(average) + " mins";
    }

    return (
        <View style={styles.container}>
            <Text>{props.name}</Text>
            <Text>{average()}</Text>
            <Text>{people + " people"}</Text>
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