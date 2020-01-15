import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image} from 'react-native';
import Swipeable from 'react-native-swipeable-row';
import Collapsible from 'react-native-collapsible';
import BigCard from './BigCard';
import * as Font from 'expo-font';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const cardCompany = screenWidth / 15;
const cardHeight = screenHeight / 10;

export default function Card(props) {
    const [notVisible, setVisible] = React.useState(true);
    const [font, setFont] = React.useState(false);

    const leftContent = 
        <View style={styles.left}>
            <Text style={styles.leftFont}>LEAVE</Text>
        </View>;
    const rightContent = 
        <View style={styles.right}>
            <Text style={styles.rightFont}>JOIN</Text>
        </View>;

    let fontLoader = async () => {
        await Font.loadAsync({
            'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
        });
        setFont(true);
    }

    React.useEffect(() => {
        fontLoader();
    });

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

    clickCard = () => {
        setVisible(!notVisible);
    }

    const average = () => {
        let value = props.totalDifference / props.countDequeued;
        value = isNaN(value) ? 0 : value;
        return Math.round(value);
    }

    let cardStyle = [];
    if(!notVisible){
        cardStyle.push(styles.containerClicked);
    } else {
        cardStyle.push(styles.container);
    }
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
                <TouchableOpacity onPress={clickCard}>
                    <View style={cardStyle}>
                        {font ? 
                            <Text style={[styles.company, {fontFamily: 'open-sans-bold'}]}>{props.name}</Text> :
                            <Text style={styles.company}>{props.name}</Text>} 
                        <View style={styles.spaceRight}>
                            <View style={styles.people}>
                                <Image source={require('../icons/clock.png')} style={styles.image}/>
                                <Text style={styles.font}>{average()}</Text>
                            </View>
                            <View style={styles.people}>
                                <Image source={require('../icons/user.png')} style={styles.image}/>
                                <Text style={styles.font}>{props.people}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity> 
            </Swipeable>
            <Collapsible collapsed={notVisible}>
                <BigCard 
                    allData={props.allData}
                    company={props.name}
                />
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
        borderWidth: 1.5,
        borderColor: '#363636'
    },
    containerClicked: {
        width: "100%",
        height: "100%",
        padding: 0,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1.5,
        borderColor: '#363636',
        borderBottomWidth: 0
    },
    defaultCardColor: {
        backgroundColor: 'black',

    },
    selectedCardColor: {
        backgroundColor: '#309986',

    },
    company: {
        color: 'white',
        fontSize: 18,
        display: 'flex',
        justifyContent: 'flex-start',
        marginLeft: cardCompany,
        flex: 2
    },
    font: {
        color: 'white',
        fontSize: 20,
    },
    swipe: {
        //we cannot make these percentages due to library issues
        height: cardHeight,
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5
    },
    left: {
        backgroundColor: 'white',
        width: "97%",
        height: "100%",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    right: {
        backgroundColor: 'white',
        width: "100%",
        height: "100%",
        borderRadius: 10,
        marginLeft: "3%",
        display: "flex",
        justifyContent: "center",
    },
    rightFont: {
        fontSize: 25,
        marginLeft: "5%"
    },
    leftFont: {
        fontSize: 25,
        marginRight: "5%"
    },
    contentColor: {
        color: 'white'
    },
    image: {
        height: 20,
        width: 20,
        margin: 4,
    },
    people: {
        width: "25%",
        height: "30%",
        textAlign: "center",
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "center",
        alignItems: "center"
    },
    spaceRight: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row-reverse'
    }
});