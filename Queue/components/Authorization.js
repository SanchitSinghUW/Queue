import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

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
            <TextInput placeholder=" Enter Fair ID" value={code} onChangeText={changeCode} 
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
        fontSize: 25,
        fontWeight: "bold",
    },
    error: {
        color: "orange",
        fontSize: 25
    },
    form: {
        width: "100%",
        height: 300,
        borderRadius: 15,
        borderWidth: 2,
        borderStyle: "solid",
        fontFamily: 'sans-serif',      
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
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
        height: 50,
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "4%",
        marginBottom: '5%'
    },
    buttonFont: {
        fontWeight: "900",
        paddingBottom: '15%',
        paddingTop: '8%'
    },
    input: {
        width: "60%",
        height: "12%",
        borderRadius: 5,
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: "white",
        marginTop: "8%",
        marginBottom: "4%",
    }
});