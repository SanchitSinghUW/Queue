import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Card(props) {

    const log = () => {
        console.log("\n------------------------------------------------------------------------\n");
        console.log(props);
    }

    return (
        <View style={styles.container}>
            {log}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
});