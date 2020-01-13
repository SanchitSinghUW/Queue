import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper'

export default function Tutorial(props) {

    let pictureList = ['../icons/82087833_524552221746524_1065347117146439680_n.png',
                        '../icons/82345146_995978140788496_3195880869986304_n.png',
                        '../icons/82504077_2568140290177299_6148435448764039168_n.png'];

    let showImages = () => {
        pictureList.map((key) => {
            <View style={styles.picture}>
                <Image source={require(key)} style={styles.image}/>
            </View>
        })
    }

    return (
        <View>
            <Swiper style={styles.swipe}>
                {showImages()}
            </Swiper>
            <TouchableOpacity><Text>Got it</Text></TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    picture: {

    },
    swipe: {

    },
    image: {
        
    }
});