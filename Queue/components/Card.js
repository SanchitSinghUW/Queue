import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import Swipeable from 'react-native-swipeable-row';
import Collapsible from 'react-native-collapsible';

const screenHeight = Dimensions.get('window').height;
const cardHeight = screenHeight / 10;

export default function Card(props) {
    const [notVisible, setVisible] = React.useState(true);

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
                props.setPopup(true);
                props.setCompany(props.name)
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

    let cardStyle = [];
    cardStyle.push(styles.container);
    if(props.queued === props.name){
        cardStyle.push(styles.selectedCardColor);
    }else{
        cardStyle.push(styles.defaultCardColor);
    }

    return (
        <View>
                <Swipeable style={styles.swipe} 
                            leftContent={leftContent} 
                            rightContent={rightContent}
                            onLeftActionRelease={clickLeave}
                            onRightActionRelease={clickJoin}>
                    <TouchableOpacity onPress={() => {setVisible(!notVisible)}}>
                        <View style={cardStyle}>
                            <Text style={styles.font}>{props.name}</Text>
                            <Text style={styles.font}>{average()}</Text>
                            <Text style={styles.font}>{props.people + " people"}</Text>
                            <Text></Text>
                        </View>
                    </TouchableOpacity> 
                </Swipeable>
            <Collapsible collapsed={notVisible}>
                <Text style={styles.contentColor}>text</Text>
            </Collapsible>
        </View>
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
        borderRadius: 10,
    },
    defaultCardColor: {
        backgroundColor: '#181818',

    },
    selectedCardColor: {
        backgroundColor: 'green',

    },
    font: {
        color: 'white',
        fontSize: 20,
    },
    swipe: {
        height: cardHeight,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5
    },
    left: {
        backgroundColor: 'white',
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
        backgroundColor: 'white',
        width: "100%",
        height: "100%",
        borderRadius: 10,
        marginLeft: 25,
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
    },
    contentColor: {
        color: 'white'
    }
});