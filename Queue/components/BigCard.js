
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';



export default function Crowdsource(props) {
    let allFields = props.allData[props.company];
    let notInclude = ["countDequeued", "description", "line_size", "positions", "totalDifference"];
    let goodFields = [];
    Object.keys(allFields).forEach((key) => {
        if(!notInclude.includes(key)){
            goodFields.push(key);
        }
    });

    let renderOptions = () => {
        return (goodFields.map((key) => {
            return (
            <View style={styles.infoAspect} key={key}>
                <Text style={styles.font}>{key}</Text>
                {allFields[key] === "NA" ? 
                    <Image source={require('../icons/na.png')} style={styles.image}/> : 
                    (allFields[key] === "T" ? 
                    <Image source={require('../icons/success.png')} style={styles.image}/> : 
                    <Image source={require('../icons/error.png')} style={styles.image}/>)}
            </View>);
        }));
    }

    return (
        <View style={styles.container}>
                    {renderOptions()}
                <View style={styles.description}>
                    <Text style={styles.font}>{allFields.description}</Text>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0d1a26',
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "flex-start",
        marginLeft: 5,
        marginRight: 4.6,
        padding: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    font: {
        color: 'white',
        fontSize: 15,
    },
    infoAspect: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: '40%',
        paddingLeft: '4%',
        paddingRight: '4%'
    },
    image: {
        height: 20,
        width: 20,
        margin: 4
    },
    description: {
        width: "100%",
        alignItems: "center",
        marginTop: 30
    }
});