import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';



export default function Crowdsource(props) {
    
    return (
        <View style={styles.container}>
            <View style={styles.textBox}>
                <View>
                    <Text style={styles.font}>Internship</Text>
                    <Text style={styles.font}>YES{/*later replace with*/}</Text> 
                </View>
                <View>
                    <Text style={styles.font}>Sponsorship</Text>
                    <Text style={styles.font}>YES{/*later replace with*/}</Text> 
                </View>
                <View>
                    <Text style={styles.font}>Part-time</Text>
                    <Text style={styles.font}>YES{/*later replace with*/}</Text> 
                </View>
                <View>
                    <Text style={styles.font}>Full-time</Text>
                    <Text style={styles.font}>YES{/*later replace with*/}</Text> 
                </View>
            </View>
            <Text style={styles.font}>{props.description}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#181818',
        borderColor: '#181818',
        padding: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        marginLeft: 5,
        marginRight: 4.6
    },
    font: {
        color: 'white',
        fontSize: 12,
    },
    textBox: {
        display: 'flex',
        margin: 10
    }
});