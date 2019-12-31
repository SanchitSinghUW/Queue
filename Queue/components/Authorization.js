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
        <View style={styles.container}>
            <Text style={styles.font}>Join a Career Fair</Text>
            <TextInput placeholder="Enter Fair ID" value={code} onChangeText={changeCode} style={styles.font} keyboardType={'numeric'}/>
            <TouchableOpacity onPress={authenticateData}>
                <Text style={styles.font}>Join</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    font: {
        color: "white"
    },
});