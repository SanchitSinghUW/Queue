import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, AsyncStorage, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import Card from './Card';
import Crowdsource from './Crowdsource';
import Authorization from './Authorization';
import * as APIs from '../APIkeys'

export default function Main(props) {


    //this also contains information for crowdsource fields
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
    const [incorrect, setIncorrect] = React.useState(false);
    const [tutorial, setTutorial] = React.useState(false);

    //only updates a single card that was given from the server
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
        let notInclude = ["countDequeued", "description", "line_size", "positions", "totalDifference"];
        Object.keys(data).forEach((key) => {
            if(key !== "company_name"){
                if(!notInclude.includes(key)){
                    newCompanies[companyName][key] = data[key].S;
                }
            }
        });
        setCompanies(newCompanies);
        setKeys(Object.keys(newCompanies).sort());
    }

    let getCompanies = async () => {
        try {
            let response = await fetch(APIs.GET_ALL_DATA);
            if(!response.ok) {
            }
            let data = await response.json();
            setCompanies(data);
            setKeys(Object.keys(data).sort());
        } catch(e) {
            console.log(e);
        }
    }

    let initTutorial = async () => {
        try {
            let tutorialStatus = await AsyncStorage.getItem('tutorial');
            if (tutorialStatus === null) {
                await AsyncStorage.setItem('tutorial', true);
                setTutorial(true);
            } else if (tutorialStatus) { //true
                setTutorial(true);
            } else {
                setTutorial(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        initTutorial();
        getCompanies();
    });

    let authenticateData = async (password) => {
        try {
            let url = APIs.AUTH;
            url += password; 
            console.log(url);
            let response = await fetch(url);
            if(!response.ok) {
            }
            let data = await response.json();
            console.log(data);
            if(data === "passed"){
                setIncorrect(false);
                setAuthorize(false);
            }else{
                setIncorrect(true);
            }
        } catch(e) {
            console.log(e);
        }
    }
    
    let changeSearch = (text) => {
        setSearch(text);
        let tempKeys = [];
        Object.keys(companies).map((val) => {
            if (val.toLowerCase().includes(text.toLowerCase())) {
                tempKeys.push(val);
            }
        })
        setKeys(tempKeys.sort());
    }

    let disableTutorial = async () => {
        await AsyncStorage.setItem('tutorial', false);
        setTutorial(false);
    }

    let showTutorial = async () => {
        return tutorial &&
        <View>
            <TouchableOpacity onPress={disableTutorial}>
                <Text>Do not show again</Text>
            </TouchableOpacity>
        </View>
        
    }

    return (
        <View style={styles.container}>
            {showTutorial()}
            <Modal
                isVisible={notAuthorized}
                backdropOpacity={0.9}
            >
                <Authorization incorrect={incorrect} authenticateData={authenticateData}/>
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
                    allData={companies}
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
                        allData={companies}
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
        marginLeft: 20,
        fontWeight: "bold"
    }
});