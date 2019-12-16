import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Card from './Card';

export default function Main() {
    let companies = {
        1: {
            name: "Apple",
            positions: ["full-time", "part-time"],
            description: "Bad company"
        },
        2: {
            name: "Beetle",
            positions: ["full-time"],
            description: "ass"
        },
        3: {
            name: "Cat",
            positions: ["full-time, part-time, internship"],
            description: "i love bananas"
        }
    }

    const getCards = () => {
        console.log(companies);
        return Object.keys(companies).map((element) => {
                                <Card name={element.name} positions={element.position} description={element.description}
                            />});
    }

    return (
        <View style={styles.container}>
            {getCards}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});