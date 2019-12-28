import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Card from './Card';

export default function Main(props) {

    const [companies, setCompanies] = React.useState({});
    //this is a common state for all cards that resiricts only one company to be queued at a given time
    //NA means no one
    //queued will be set to the specific company name when that company is queued, back to NA when dequeued
    const [queued, setQueued] = React.useState("NA");

    //only updates a single card that was given from the server
    let receiveMessage = () => {
        props.socket.onmessage = (event) => {
            let data = JSON.parse(event.data);
            let companyName = data.company_name.S;
            let line_size = parseInt(data.line_size.N);
            let start_time = data.startTime === undefined ? null : data.startTime.S;
            let count_dequeued = data.countDequeued === undefined ? 1 : parseInt(data.countDequeued.N);
            let newCompanies = {...companies};
            newCompanies[companyName].line_size = line_size;
            newCompanies[companyName].startTime = start_time;
            newCompanies[companyName].countDequeued = count_dequeued;
            setCompanies(newCompanies);
        }
    }

    React.useEffect(() => {
        getCompanies();
    }, [receiveMessage()]);

    getCompanies = async () => {
        try {
            let response = await fetch("https://5ch9sufu53.execute-api.us-west-2.amazonaws.com/testing");
            if(!response.ok) {
                console.log(response);
            }
            let data = await response.json();
            setCompanies(data);
        } catch(e) {
            console.log(e);
        }
    }

    const getCards = () => {
        //call back end and then companies is what is returned
        return Object.keys(companies).map((key) => {
                                return <Card 
                                            queued={queued}
                                            setQueued={setQueued}
                                            socket={props.socket}
                                            key={key} 
                                            name={key} 
                                            positions={companies[key].positions} 
                                            description={companies[key].description}
                                            people={companies[key].line_size}
                                            startTime={companies[key].startTime}
                                            countDequeued={companies[key].countDequeued}
                            />});
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.search}> search </TextInput>
            {getCards()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "90%"
    },
    search: {
        color: 'white',
        fontSize: 30,
        marginBottom: 20,
        fontWeight: "bold"
    }
});