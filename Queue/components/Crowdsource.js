import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


export default function Crowdsource(props) {
    //THIS CODE IS HEAVILY COUPLED. WE NEED TO MAKE THIS ROBUST TO AUTOMATICALLY PULL
    //FROM THE DB. SAME FOR BIG CARD. WE CANNOT HARD CODE LIKE THIS.
    //ALSO, MAKE IT POSSIBLE TO SELECT AND DESELECT TO SHOW WHAT IS HIGHLIGHTED!

    let allFields = props.allData[props.company];
    //these are all the descriptive fields, we only care about crowdsource fields for this one
    let notInclude = ["countDequeued", "description", "line_size", "positions", "totalDifference"];
    let fields = {
        "company": props.company
    }
    Object.keys(allFields).forEach((key) => {
        if(!notInclude.includes(key)){
            fields[key] = "june";
        }
    });

    clickDone = async () => {
        try {
            fetch('https://5ch9sufu53.execute-api.us-west-2.amazonaws.com/testing/sendposition', {
                method: 'POST', // or 'PUT'
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(fields),
            })
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });

        } catch(e) {
            console.log(e);
        }
        props.setPopup(false);
    }

    let renderFieldButtons = () => {
        return (
            Object.keys(fields).map((key) => {
                if(key !== "company"){
                return <View style={styles.container}
                                key={key}>
                            <Text style={styles.colour}>{key}</Text>
                            <View style={styles.buttons}>
                                <TouchableOpacity onPress={() => {
                                    fields[key] = "true";
                                    }}>
                                    <Image source={require('../icons/success.png')} style={styles.image}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    fields[key] = "false";
                                    }}>
                                    <Image source={require('../icons/error.png')} style={styles.image}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                }
            })
        );
    }

    return (
        <View style={styles.overall}>
            {renderFieldButtons()}
            <TouchableOpacity onPress={clickDone} style={styles.bigButton}>
                <Text style={styles.bigButtonFont}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    colour: {
        color: "white",
        margin: 2,
        padding: 2,
        fontSize: 20
    },
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    overall: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#181818",
        borderRadius: 15,
        width: "100%",
        padding: 5
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bigButton: {
        backgroundColor: 'green',
        borderRadius: 5,
        borderWidth: 2,
        borderStyle: "solid",
        color: 'white',
        width: "30%",
        height: "15%",
        padding: 4,
        fontWeight: "bold",
        margin: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    bigButtonFont: {
        fontWeight: "900",
        color: "white",
        fontSize: 25
    },
    image: {
        height: 20,
        width: 20,
        margin: 4
    }
});