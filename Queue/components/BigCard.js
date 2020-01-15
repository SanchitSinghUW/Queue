
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
                <Text style={styles.category}>Crowdsource</Text>
                <View style={styles.crowdsource}>
                    {renderOptions()}
                </View>
                <Text style={styles.categorySecond}>Description</Text>
                <View style={styles.description}>
                    <Text style={styles.font}>{allFields.description}</Text>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        marginLeft: "1.3%",
        marginRight: "1.1%",
        padding: "3%",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1.5,
        borderColor: '#363636',
    },
    crowdsource: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "flex-start",
    },
    font: {
        color: 'white',
        fontSize: 15
    },
    infoAspect: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: '45%',
        paddingLeft: '4%',
        paddingRight: '4%'
    },
    image: {
        height: 20,
        width: 20,
        margin: "2.5%"
    },
    description: {
        width: "90%",
        textAlign: 'center',
        marginLeft: '4%',
        marginBottom: "8%"
    },
    category: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: '4%',
        marginBottom: '2%',
        marginTop: '3.5%'
    },
    categorySecond: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: '4%',
        marginBottom: '2%',
        marginTop: '6%'
    }
});