import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ShadowPropTypesIOS } from 'react-native';

export default function Authorization(props) {
    const [code, setCode] = React.useState("");

    let changeCode = (text) => {
        setCode(text);
    }

    let authenticateData = () => {
        props.authenticateData(code);
    }

    return (
        <View style={styles.form}>
            <Text style={styles.font}>Join a Career Fair</Text>
            <TextInput placeholder="Enter Fair ID" value={code} onChangeText={changeCode} 
                style={[styles.font, styles.input]} keyboardType={'numeric'}/>
            {props.incorrect && <Text style={styles.error}>Please Try Again</Text>}
            <TouchableOpacity onPress={authenticateData} style={styles.button}>
                <Text style={[styles.font, styles.buttonFont]}>Join</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    font: {
        color: "white",
        fontSize: 25
    },
    error: {
        color: "orange",
        fontSize: 25
    },
    form: {
        width: "100%",
        height: "40%",
        padding: 8,
        borderRadius: 15,
        borderWidth: 2,
        borderStyle: "solid",
        fontFamily: 'sans-serif',      
        display: 'flex',
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#181818"
    },
    button: {
        backgroundColor: '#309986',
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
    buttonFont: {
        fontWeight: "900"
    },
    input: {
        width: "60%",
        height: "20%",

        borderRadius: 5,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "white",
        padding: 3,
        margin: 8
    }
});