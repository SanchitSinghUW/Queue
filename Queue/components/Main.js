import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Button } from 'react-native';
import Modal from 'react-native-modal';
import Card from './Card';
import Crowdsource from './Crowdsource';
import Authorization from './Authorization';

export default function Main(props) {

    const [companies, setCompanies] = React.useState({});
    //this is a common state for all cards that resiricts only one company to be queued at a given time
    //NA means no one
    //queued will be set to the specific company name when that company is queued, back to NA when dequeued
    const [queued, setQueued] = React.useState("NA");
    const [popup, setPopup] = React.useState(false);
    const [company, setCompany] = React.useState("");
    const [notAuthorized, setAuthorize] = React.useState(true);
    const [search, setSearch] = React.useState("");
    const [keys, setKeys] = React.useState([]);

    //only updates a single card that was given from the server
    let receiveMessage = () => {
        props.socket.onmessage = (event) => {
            let data = JSON.parse(event.data);
            let companyName = data.company_name.S;
            let line_size = parseInt(data.line_size.N);
            let totalDifference = data.totalDifference === undefined ? 0 : parseInt(data.totalDifference.N);
            let count_dequeued = data.countDequeued === undefined ? 1 : parseInt(data.countDequeued.N);
            let newCompanies = {...companies};
            newCompanies[companyName].line_size = line_size;
            newCompanies[companyName].totalDifference = totalDifference;
            newCompanies[companyName].countDequeued = count_dequeued;
            setCompanies(newCompanies);
            setKeys(Object.keys(companies));
        }
    }

    React.useEffect(() => {
        getCompanies();
    }, [receiveMessage()]);

    getCompanies = async () => {
        try {
            let response = await fetch("https://5ch9sufu53.execute-api.us-west-2.amazonaws.com/testing/getcompanies");
            if(!response.ok) {
                console.log(response);
            }
            let data = await response.json();
            setCompanies(data);
        } catch(e) {
            console.log(e);
        }
    }

    let authenticateData = async (password) => {
        try {
            let url = "https://5ch9sufu53.execute-api.us-west-2.amazonaws.com/testing/authenticate?code=";
            url += password; 
            let response = await fetch(url);
            if(!response.ok) {
                console.log(response);
            }
            let data = await response.json();
            if(data === "passed"){
                setAuthorize(false);
            }
        } catch(e) {
            console.log(e);
        }
    }
    
    let changeSearch = (text) => {
        setSearch(text);
        let tempKeys = [];
        Object.keys(companies).map((val) => {
            if (val.toLowerCase().includes(search.toLowerCase())) {
                tempKeys.push(val);
            }
        })
        setKeys(tempKeys);
    }

    return (
        <View style={styles.container}>
            <Modal
                isVisible={notAuthorized}
                backdropOpacity={0.9}
            >
                <Authorization authenticateData={authenticateData}/>
            </Modal>
            <TextInput 
                    style={styles.search} 
                    placeholder="search" 
                    placeholderTextColor="white" 
                    value={search}
                    onChangeText={changeSearch}
                    >

            </TextInput>
            <Modal
                style={styles.modal}
                isVisible={popup}
                backdropOpacity={0.9}
            >
                <Crowdsource 
                    setPopup={setPopup}
                    company={company}
                />
            </Modal>
            <FlatList 
                data={keys}
                renderItem={( key ) => (
                    <Card 
                        setPopup={setPopup}
                        setCompany={setCompany}
                        queued={queued}
                        setQueued={setQueued}
                        socket={props.socket}
                        key={key.item} 
                        name={key.item} 
                        positions={companies[key.item].positions} 
                        description={companies[key.item].description}
                        people={companies[key.item].line_size}
                        totalDifference={companies[key.item].totalDifference}
                        countDequeued={companies[key.item].countDequeued}
                    />
                )}
                keyExtractor={key => key}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "90%",
        width: "100%",
    },
    search: {
        color: 'white',
        fontSize: 36,
        margin: 5,
        fontWeight: "bold"
    }
});