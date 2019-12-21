import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function Card(props) {

    const [people, setPeople] = React.useState(0);

    getPeople = async () => {
        try {

        } catch(e) {

        }
    };

    clickJoin = async () => {
        try {

        } catch(e) {

        }
    };

    clickLeave = async () => {
        try {
            
        } catch(e) {

        }
    };

    getCount = async () => {
        try {

        } catch(e) {

        }
    };

    useEffect(); 

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
            <TouchableOpacity><Text>Join</Text></TouchableOpacity>
            <TouchableOpacity><Text>Leave</Text></TouchableOpacity>
            <Text></Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});