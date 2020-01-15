import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper'

export default function Tutorial(props) {

    let pictureList = ['../icons/82087833_524552221746524_1065347117146439680_n.png',
                        '../icons/82345146_995978140788496_3195880869986304_n.png',
                        '../icons/82504077_2568140290177299_6148435448764039168_n.png',
                        '../icons/82558593_465870304097835_1071093555755220992_n.png'];

    let dot = <View 
                style={{backgroundColor:'white',
                        width: 8, height: 8,borderRadius: 4,
                        marginLeft: 3, marginRight: 3, marginTop: 3,
                        marginBottom: 3,}} />
    return (
        <Swiper style={styles.wrapper} dot={dot}>
            <View style={styles.slide}>
                <Text style={styles.logoText}>welcome to</Text>
                <Image style={styles.logo} source={require('../icons/logo.png')}/>
                <Text style={styles.logoText}>let's get started</Text>
            </View>
            <View style={styles.slide}>
                <Text style={styles.text}>swipe left on a company to join</Text>
                <Image style={styles.image} source={require('../icons/82087833_524552221746524_1065347117146439680_n.png')}/>
            </View>
            <View style={styles.slide}>
                <Text style={styles.text}>Beautiful</Text>
                <Image style={styles.image} source={require('../icons/82345146_995978140788496_3195880869986304_n.png')}/>
            </View>
            <View style={styles.slide}>
                <Text style={styles.text}>And simple</Text>
                <Image style={styles.image} source={require('../icons/82504077_2568140290177299_6148435448764039168_n.png')}/>
            </View>
            <View style={styles.slide}>
                <Text style={styles.text}>And simple</Text>
                <Image style={styles.image} source={require('../icons/82558593_465870304097835_1071093555755220992_n.png')}/>
            </View>
            <View style={styles.slide}>
                <TouchableOpacity style={styles.button} onPress={props.disableTutorial}>
                    <Text style={styles.text}>I'm ready</Text>
                </TouchableOpacity>
            </View>
        </Swiper>
    );
}

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    text: {
        color: '#fff',
        fontSize: 27,
        fontWeight: 'bold',
    },
    image: {
        height: "43%",
        width: "90%",
        margin: 20
    },
    logo: {
        height: "31%",
        width: "60%",
        margin: 20
    },
    logoText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    button:{
        borderColor: 'green',
        borderWidth: 3,
        borderRadius: 10
    }
})
