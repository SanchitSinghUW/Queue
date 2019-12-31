import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';



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
        <View style={styles.container}>
            <View style={styles.inLine}>
                <Text style={styles.colour}>Internships</Text>
                <Button title="Yes" onPress={() => {data.internship = "true"}} />
                <Button title="No" onPress={() => {data.internship = "false"}} />
            </View>
            <View style={styles.inLine}>
                <Text style={styles.colour}>Sponsorship</Text>
                <Button title="Yes" onPress={() => {data.sponsorship = "true"}} />
                <Button title="No" onPress={() => {data.sponsorship = "false"}} />
            </View>
            <View style={styles.inLine}>
                <Text style={styles.colour}>Full-time</Text>
                <Button title="Yes" onPress={() => {data["full-time"] = "true"}} />
                <Button title="No" onPress={() => {data["full-time"] = "false"}} />
            </View>
            <View style={styles.inLine}>
                <Text style={styles.colour}>Part-time</Text>
                <Button title="Yes" onPress={() => {data["part-time"] = "true"}} />
                <Button title="No" onPress={() => {data["part-time"] = "false"}} />
            </View>
            <Button title="Done" onPress={clickDone} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    colour: {
        color: "white"
    },
    inLine: {
        display: "flex",
        flexDirection: "row"
    }
});