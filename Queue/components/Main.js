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

    //let data = Object.keys(companies);

    // let renderTitle = (key) => {
    //     return (
    //         <Card 
    //             setPopup={setPopup}
    //             setCompany={setCompany}
    //             queued={queued}
    //             setQueued={setQueued}
    //             socket={props.socket}
    //             key={key} 
    //             name={key} 
    //             positions={companies[key].positions} 
    //             description={companies[key].description}
    //             people={companies[key].line_size}
    //             totalDifference={companies[key].totalDifference}
    //             countDequeued={companies[key].countDequeued}
    //         />
    //     )
    // }

    // let renderContent = () => {
    //     return (
    //         <Text style={styles.color}>This is some data</Text>
    //     )
    // };

    // let updateSections = activeSections => {
    //     console.log("got licked");
    //     setSessions(activeSections);
    // };

    // return (
    //     <View style={styles.container}>
    //         <TextInput style={styles.search}> search </TextInput>
    //         <Modal
    //             style={styles.modal}
    //             isVisible={popup}
    //         >
    //         <Crowdsource 
    //             setPopup={setPopup}
    //             company={company}
    //         />
    //         </Modal>
    //         <Accordion
    //                 sections={data}
    //                 activeSections={activeSessions}
    //                 renderSectionTitle={()=> {}}
    //                 renderContent={renderContent}
    //                 renderHeader={renderTitle}
    //                 onChange={updateSections}
    //             />
    //     </View>
    // )

    let authenticateData = async (password) => {
        try {
            let url = "https://5ch9sufu53.execute-api.us-west-2.amazonaws.com/testing/authenticate?code=";
            //console.log(password);
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

    return (
        <View style={styles.container}>
            <Modal
                style={styles.modal}
                isVisible={notAuthorized}
            >
                <Authorization authenticateData={authenticateData}/>
            </Modal>
            <TextInput style={styles.search}> search </TextInput>
            <Modal
                style={styles.modal}
                isVisible={popup}
            >
                <Crowdsource 
                    setPopup={setPopup}
                    company={company}
                />
            </Modal>
            <FlatList 
                data={Object.keys(companies)}
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
        width: "100%"
    },
    search: {
        color: 'white',
        fontSize: 36,
        marginBottom: 15,
        fontWeight: "bold"
    }
});