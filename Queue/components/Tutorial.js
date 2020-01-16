import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper'

export default function Tutorial(props) {

    let dot = <View 
                style={{backgroundColor:'white',
                        width: 8, height: 8,borderRadius: 4,
                        marginLeft: 3, marginRight: 3, marginTop: 3,
                        marginBottom: 3,}} />
    return (
        <Swiper loop={false} dot={dot}>
            <View style={styles.slide}>
                <Image style={styles.picture} source={require('../icons/welcome.png')}/>
            </View>
            <View style={styles.slide}>
                <Image style={styles.picture} source={require('../icons/main.png')}/>
            </View>
            <View style={styles.slide}>
                <Image style={styles.picture} source={require('../icons/join.png')}/>
            </View>
            <View style={styles.slide}>
                <Image style={styles.picture} source={require('../icons/leave.png')}/>
            </View>
            <View style={styles.slide}>
                <Image style={styles.picture} source={require('../icons/crowdsource.png')}/>
            </View>
            <View style={styles.slide}>
                <Image style={styles.picture} source={require('../icons/info.png')}/>
            </View>
            <View style={styles.slide}>
                <View style={styles.button}>
                    <TouchableOpacity onPress={props.disableTutorial}>
                        <Image style={styles.gotit} source={require('../icons/gotit.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        </Swiper>
    );
}

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    button: {
        height: "10%",
        width: "50%"
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
    bottonBox: {
        display: 'flex',
        marginLeft: 'auto',
        margin: 20,
        marginRight: 20
    },
    gotit: {
        height: "100%",
        width: "100%"
    },
    picture: {
        height: "65%",
        width: "85%"
    }
})
