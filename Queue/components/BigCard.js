import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';



export default function Crowdsource(props) {
    
    return (
        <View style={styles.container}>
                <View style={styles.infoAspect}>
                    <Text style={styles.font}>Internship</Text>
                    <Image source={require('../icons/error.png')} style={styles.image}/>
                </View>
                <View style={styles.infoAspect}>
                    <Text style={styles.font}>Sponsorship</Text>
                    <Image source={require('../icons/error.png')} style={styles.image}/>
                </View>
                <View style={styles.infoAspect}>
                    <Text style={styles.font}>Part-time</Text>
                    <Image source={require('../icons/success.png')} style={styles.image}/>
                </View>
                <View style={styles.infoAspect}>
                    <Text style={styles.font}>Full-time</Text>
                    <Image source={require('../icons/success.png')} style={styles.image}/>
                </View>
                <View style={styles.description}>
                    <Text style={styles.font}>{props.description}</Text>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#181818',
        borderColor: '#181818',
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "flex-start",
        marginLeft: 5,
        marginRight: 4.6,
        padding: 10
    },
    font: {
        color: 'white',
        fontSize: 15,
    },
    infoAspect: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    image: {
        height: 20,
        width: 20,
        margin: 4
    },
    wrapper: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    description: {
        width: "100%",
        alignItems: "center"
    }
});