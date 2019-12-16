import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Card(props) {

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
            <Text>{props.countQueued - props.countDequeued + " people"}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});