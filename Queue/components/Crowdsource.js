import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as APIs from '../APIkeys';

export default function Crowdsource(props) {
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

    const [myFields, setFields] = React.useState(fields);

    clickDone = async () => {
        try {
            fetch(APIs.CROWD, {
                method: 'POST', // or 'PUT'
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(myFields),
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
            Object.keys(myFields).map((key) => {
                if(key !== "company"){
                    return <View style={styles.container}
                            key={key}>
                        <Text style={[styles.colour, styles.question]}>{key}</Text>
                        <View style={styles.buttons}>
                            <TouchableOpacity style={(myFields[key] === "june") || myFields[key] !== "true" ? styles.yes : [styles.yes, styles.selectedYes]} onPress={() => {
                                let fieldCopy = {...myFields};
                                if(fieldCopy[key] === "june"){
                                    fieldCopy[key] = "true"
                                }else{
                                    fieldCopy[key] = "june"
                                }
                                setFields(fieldCopy);
                                }}>
                                <Text style={styles.yesNoText}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={(myFields[key] === "june") || myFields[key] !== "false" ? styles.no : [styles.no, styles.selectedNo]} onPress={() => {
                                let fieldCopy = {...myFields};
                                if(fieldCopy[key] === "june"){
                                    fieldCopy[key] = "false"
                                }else{
                                    fieldCopy[key] = "june"
                                }
                                setFields(fieldCopy);
                                }}>
                                <Text style={styles.yesNoText}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            })
        );
    }

    return (
        <View style={styles.overall}>
            <Text style={styles.text}>Crowdsource Submission</Text>
            <Text style={styles.instruction}>Please only select what you know for this company.</Text>
            {renderFieldButtons()}
            <TouchableOpacity onPress={clickDone} style={styles.bigButton}>
                <Text style={styles.bigButtonFont}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 24,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%'
    },
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
        width: "90%",
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
        width: '22%',
        flex: 1
    },
    bigButton: {
        backgroundColor: '#309986',
        borderRadius: 8,
        borderWidth: 2,
        borderStyle: "solid",
        color: 'white',
        width: "35%",
        height: "13%",
        padding: 4,
        fontWeight: "bold",
        margin: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: '5%',
        marginTop: '8%'
    },
    bigButtonFont: {
        fontWeight: "900",
        color: "white",
        fontSize: 25
    },
    image: {
        height: 30,
        width: 30,
        margin: 4
    },
    question: {
        fontSize: 20,
        flex: 1
    },
    instruction:{
        color: 'orange'
    },
    yes: {
        backgroundColor: '#3ab09b',
        display: "flex",
        alignItems: "center",
        width: "40%",
        padding: "5%",
        paddingLeft: "8%",
        paddingRight: "8%",
        borderRadius: 5,
        marginLeft: "15%"
    }, 
    no: {
        backgroundColor: '#CF6679',
        display: "flex",
        alignItems: "center",
        width: "40%",
        padding: "5%",
        paddingLeft: "8%",
        paddingRight: "8%",
        borderRadius: 5,
        marginLeft: "8%"
    },
    yesNoText: {
        color: 'white',
        fontSize: 18
    },
    selectedYes: {
        backgroundColor: "rgba(58, 176, 155, 0.2)"
    },
    selectedNo: {
        backgroundColor: "rgba(207, 102, 121, 0.2)"
    }
});