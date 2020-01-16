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
                <TouchableOpacity>
                    
                </TouchableOpacity>
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
    button: {
        backgroundColor: '#309986',
        borderRadius: 8,
        borderWidth: 2,
        borderStyle: "solid",
        color: 'white',
        padding: 15,
        fontWeight: "bold",
        margin: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    bottonBox: {
        display: 'flex',
        marginLeft: 'auto',
        margin: 20,
        marginRight: 20
    },
    gotit: {
        color: '#309986',
        fontSize: 24,
    },
    picture: {
        height: "65%",
        width: "85%"
    }
})
