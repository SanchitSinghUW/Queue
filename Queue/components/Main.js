import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';

export default function Main() {
    let companies = {
        Apple: {
            positions: ["full-time", "part-time"],
            description: "Bad company"
        },
        Beetle: {
            positions: ["full-time"],
            description: "ass"
        },
        Cat: {
            positions: ["full-time, part-time, internship"],
            description: "i love bananas"
        }
    }

    let logger = {
        Apple: {
                startTime: "2019-12-15T15:24:00",
                countDequeued: 69
        },
        Beetle: {
            startTime: "2019-12-15T17:20:00",
            countDequeued: 420
        },
        Cat: {
            startTime: "2019-12-15T16:24:00",
            countDequeued: 666
        }
    }

    const getCards = () => {
        return Object.keys(companies).map((key) => {
                                return <Card name={key} 
                                            positions={companies[key].positions} 
                                            description={companies[key].description}
                                            startTime={logger[key].startTime}
                                            countDequeued={logger[key].countDequeued}
                            />});
    }



    return (
        <View style={styles.container}>
            {getCards()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});