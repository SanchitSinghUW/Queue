import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper'

export default function Tutorial(props) {

    let pictureList = [];

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