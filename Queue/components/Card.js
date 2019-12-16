import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Card(props) {

    const average = () => {
        let now = new Date();
        let old = props.startTime;
        let difference = (now.getHours*60 - old.getHours) + (now.getMinutes - old.getMinutes);
        let average = props.countDequeued / difference;
        return average;
    }

    return (
        <View style={styles.container}>
            <div>
                <div>{props.name}</div>
                <div>Hi {average()}</div>
            </div>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});