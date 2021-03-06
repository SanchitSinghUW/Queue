import React, { useEffect } from 'react';
import ModalLibrary from 'react-native-modal';
import { StyleSheet, View, TextInput, FlatList, Image, TouchableOpacity, Modal, AsyncStorage, RefreshControl} from 'react-native';
import Card from './Card';
import Crowdsource from './Crowdsource';
import Authorization from './Authorization';
import * as APIs from '../APIkeys';
import Tutorial from './Tutorial';

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
    const [refreshing, setRefresing] = React.useState(false);
    const [authDisplay, setAuthDisplay] = React.useState(false);
    const [fav, setFav] = React.useState(new Set());

    // this is called some but it should be called updateOrder
    let some = (data, keys = false) => {
        let sortedCompanies;
        if (keys !== false) {
            sortedCompanies = keys
        } else {
            sortedCompanies = Object.keys(data);
        }
        sortedCompanies.sort();
        rankedCompanies = []
        rankedCompanies.push.apply(rankedCompanies, fav)
        fav.forEach((element) => {
            rankedCompanies.push(element)
        })
        for (let i = 0; i < sortedCompanies.length; i++) {
            if (!fav.has(sortedCompanies[i])) {
                rankedCompanies.push(sortedCompanies[i]);
            }
        }
        setKeys(rankedCompanies);
    }

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
            let notInclude = ["countDequeued", "description", "line_size", "positions", "totalDifference"];
            Object.keys(data).forEach((key) => {
                if(key !== "company_name"){
                    if(!notInclude.includes(key)){
                        newCompanies[companyName][key] = data[key].S;
                    }
                }
            });
            console.log("receive")

            setCompanies(newCompanies);
            //setKeys(Object.keys(newCompanies).sort());
            some(newCompanies);
        }
    }

    let getCompanies = async () => {
        try {
            let response = await fetch(APIs.GET_ALL_DATA);
            if(!response.ok) {
            }
            let data = await response.json();
            setCompanies(data);
            //setKeys(Object.keys(data).sort());
            console.log("getCOmp")
            some(data)
            //setOrder(data);
            setRefresing(false);
        } catch(e) {
            console.log(e);
        }
    }
    
    let initTutorial = async () => {
        try {
            let tutorialStatus = await AsyncStorage.getItem('tutorial');
            //first time
            if (tutorialStatus === null) {
                await AsyncStorage.setItem('tutorial', 'true');
                setTutorial(true);
            } else if (tutorialStatus === "true") { //true, means maybe user didn't get through and closed app
                setTutorial(true);
            } else {
                setTutorial(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getCompanies();
        initTutorial();
    }, [receiveMessage()]);

    React.useEffect(() => {
        some(companies)
    }, [fav]);

    let authenticateData = async (password) => {
        try {
            let url = APIs.AUTH;
            url += password; 
            console.log(url);
            let response = await fetch(url);
            if(!response.ok) {
            }
            let data = await response.json();
            //console.log(data);
            if(data === "passed"){
                setIncorrect(false);
                // if (callBackCard != null) {
                //     useEffect(() => {setAuthorize(false)}, callBackCard(true))
                // } else {
                    setAuthorize(false);
                    //callBackCard();
                //}
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
        some(null, tempKeys)
    }

    let closeTutorial = async () => {
        setTutorial(false);
        await AsyncStorage.setItem('tutorial', 'false');
    }

    let refreshData = () => {
        setRefresing(true);
        getCompanies();
    }


    // AHHH annoying code! WE CANNOT DIRECTLY MANIPULATE THIS WITHOUT INTRODICING CODE ELSEWHERE THAT CAN INTERPRET PREPENDED RANKS
    // NEED TO THINK ABOUT THIS MORE
    let updateCardRank = (name) => {
        // make copy
        // keysClone = keys.slice(0)
        // for (let i = 0; i < keysClone.length; i++) {
        //     // if we see that the param name is the same and there is no number prepended
        //     let favorite = name === keysClone[i]
        //     // if we see that the param name is the same and there is a number prepended
        //     let unfavorite = name === keysClone[i].substring(1, keysClone[i].length)
        //     if (favorite || unfavorite) {
        //         if (favorite) {
        //             keysClone[i] = "1" + keysClone[i] // add rank
        //         } else {
        //             keysClone[i] = keysClone[i].substring(1, keysClone[i].length) // remove rank
        //         }
        //     }
        // }
        // setKeys(keysClone)
        copySet = new Set(fav)
        if (copySet.has(name)) {
            copySet.delete(name)
        } else {
            copySet.add(name)
        }
        setFav(copySet)
    }

    return (
        <View style={styles.container}>
            {authDisplay && 
                <ModalLibrary
                    isVisible={notAuthorized}
                    backdropOpacity={1}
                >
                    <Authorization incorrect={incorrect} authenticateData={authenticateData} 
                    closeAuth={() => setAuthDisplay(false)}/>
                </ModalLibrary>}
            <Modal animationType="slide" visible={tutorial}>
                {tutorial && <Tutorial disableTutorial={closeTutorial}/>}
            </Modal>
            <View>
                <View style={styles.header}>
                    <TextInput 
                            style={styles.search} 
                            placeholder="search" 
                            placeholderTextColor="white" 
                            value={search}
                            onChangeText={changeSearch}
                            >
                    </TextInput>
                    <TouchableOpacity onPress={() => {setAuthDisplay(true)}}>
                        {notAuthorized ? <Image source={require('../icons/locked.png')} style={styles.image}/> :
                        null}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setTutorial(true)}}>
                        <Image source={require('../icons/question.png')} style={styles.image}/> 
                    </TouchableOpacity>
                </View>
                <ModalLibrary
                    style={styles.modal}
                    isVisible={popup}
                    backdropOpacity={0.9}
                >
                    <Crowdsource 
                        setPopup={setPopup}
                        company={company}
                        allData={companies}
                    />
                </ModalLibrary>
                <FlatList 
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={refreshData}
                            tintColor="#fff"
                            titleColor="#fff"
                        />
                    }
                    refreshing={refreshing}
                    onRefresh={refreshData}
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
                            notAuthorized={notAuthorized}
                            favoriites={fav}
                            setAuthDisplayTrue={() => {
                                setAuthDisplay(true)
                                // setCallBackCard(clickJoin);
                            }}
                            updateCardRank={updateCardRank}
                        />
                    )}
                    keyExtractor={key => key}
                />
            </View>
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
        margin: "1%",
        marginLeft: "3%",
        fontWeight: "bold",
        width: '80%'
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    image: {
        height: 25,
        width: 25,
        margin: "1%",
        marginRight: "3%"
    },
    screen: {
        height: '100%',
        width: '100%',
        backgroundColor: 'black'
    },
    skip: {
        backgroundColor: "black"
    }
});