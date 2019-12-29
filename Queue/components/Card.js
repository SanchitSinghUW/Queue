import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-swipeable-row';

export default function Card(props) {

    const leftContent = 
        <View style={styles.left}>
            <Text style={styles.leftFont}>LEAVE</Text>
        </View>;
    const rightContent = 
        <View style={styles.right}>
            <Text style={styles.rightFont}>JOIN</Text>
        </View>;

    clickJoin = () => {
        //backend relies on there to be a 0 or a 1 prepended. 1 means enque.
        if(props.queued === "NA"){
            try {
                let data = {
                    "action": "enqueue",
                    "data": "1" + props.name
                };
                props.socket.send(JSON.stringify(data));
                props.setQueued(props.name);
            } catch(e) {
                console.log(e);
            }
        }
    };

    clickLeave = () => {
        //backend relies on there to be a 0 or a 1 prepended. 0 means denque.
        if(props.queued === props.name){
            try {
                let data = {
                    "action": "enqueue",
                    "data": "0" + props.name
                };
                props.socket.send(JSON.stringify(data));
                props.setQueued("NA");
            } catch(e) {
                console.log(e);
            }
        }
    };

    const average = () => {
        let value = props.totalDifference / props.countDequeued;
        value = isNaN(value) ? 0 : value;
        return Math.round(value) + " mins";
    }

    return (
        <Swipeable style={styles.swipe} 
                    leftContent={leftContent} 
                    rightContent={rightContent}
                    onLeftActionRelease={clickLeave}
                    onRightActionRelease={clickJoin}>
            <View style={styles.container}>
                <Text style={styles.font}>{props.name}</Text>
                <Text style={styles.font}>{average()}</Text>
                <Text style={styles.font}>{props.people + " people"}</Text>
                <Text></Text>
            </View>
        </Swipeable> 
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        padding: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: '#181818',
        borderRadius: 10,
    },
    font: {
        color: 'white',
        fontSize: 20,
    },
    swipe: {
        margin: 2,
        height: "100%"
    },
    left: {
        backgroundColor: 'red',
        width: "93%",
        height: "100%",
        borderRadius: 10,
        marginRight: 15,
        display: "flex",
        justifyContent: "center",
        padding: 5,
        alignItems: "flex-end"
    },
    right: {
        backgroundColor: 'green',
        width: "100%",
        height: "100%",
        borderRadius: 10,
        marginLeft: 15,
        display: "flex",
        justifyContent: "center",
        padding: 5
    },
    rightFont: {
        fontSize: 25,
        marginLeft: 20
    },
    leftFont: {
        fontSize: 25,
        marginRight: 20
    }
});