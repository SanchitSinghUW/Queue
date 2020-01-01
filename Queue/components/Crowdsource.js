import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';



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
                        <Text style={styles.colour}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {data.internship = "false"}}>
                        <Text style={styles.colour}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.colour}>Sponsorship</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => {data.sponsorship = "true"}}>
                        <Text style={styles.colour}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {data.sponsorship = "false"}}>
                        <Text style={styles.colour}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.colour}>Full-time</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => {data["full-time"] = "true"}}>
                        <Text style={styles.colour}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {data["full-time"] = "false"}}>
                        <Text style={styles.colour}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.container}>
                <Text style={styles.colour}>Part-time</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => {data["part-time"] = "true"}}>
                        <Text style={styles.colour}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {data["part-time"] = "false"}}>
                        <Text style={styles.colour}>No</Text>
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
        padding: 2
    },
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    overall: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#181818",
        borderRadius: 15,
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
    },
    bigButton: {
        backgroundColor: 'green',
        borderRadius: 5,
        borderWidth: 2,
        borderStyle: "solid",
        color: 'white',
        width: "30%",
        height: "20%",
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
    }
});