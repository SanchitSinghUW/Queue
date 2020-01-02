import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';


export default function Crowdsource(props) {

    var data = {
        "company": props.company,
        "internship": "june",
        "sponsorship": "june",
        "full-time": "june",
        "part-time": "june"
    }

    clickDone = async () => {
        try {
            fetch('https://5ch9sufu53.execute-api.us-west-2.amazonaws.com/testing/sendposition', {
                method: 'POST', // or 'PUT'
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        } catch(e) {
            console.log(e);
        }
        props.setPopup(false);
    }

    return (
        <View style={styles.overall}>
            <View style={styles.container}>
                <Text style={styles.colour}>Internships</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => {data.internship = "true"}}>
                        <Image source={require('../icons/success.png')} style={styles.image}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {data.internship = "false"}}>
                        <Image source={require('../icons/error.png')} style={styles.image}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.colour}>Sponsorship</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => {data.sponsorship = "true"}}>
                        <Image source={require('../icons/success.png')} style={styles.image}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {data.sponsorship = "false"}}>
                        <Image source={require('../icons/error.png')} style={styles.image}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.colour}>Full-time</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => {data["full-time"] = "true"}}>
                        <Image source={require('../icons/success.png')} style={styles.image}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {data["full-time"] = "false"}}>
                        <Image source={require('../icons/error.png')} style={styles.image}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.colour}>Part-time</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => {data["part-time"] = "true"}}>
                        <Image source={require('../icons/success.png')} style={styles.image}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {data["part-time"] = "false"}}>
                        <Image source={require('../icons/error.png')} style={styles.image}/>
                    </TouchableOpacity>
                </View>
            </View>
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