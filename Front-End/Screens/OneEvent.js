import React, { useEffect, useState } from "react";
import { Card, Button } from 'react-native-elements'

import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useTheme } from '@react-navigation/native';
import apiLink from "../shared/apiLink";
import { useBackHandler } from "@react-native-community/hooks"

const OneEvent = ({ route, navigation }) => {

   // const tasks_data = route.params;
    // const navigation = props.navigation;

    console.log(route)    

    const _user = route.params.admin.userName;
    const _email = route.params.admin.email;
    const _id = route.params.admin.id;
    const _number = route.params.admin.num;
    const _eventName = route.params.eventName;
    const _eventId = route.params._id;
    const _eventAdmin = route.params.userId;
    console.log(_eventAdmin)

    const backActionHandler = () => console.log("back Button")
    useBackHandler(backActionHandler);

    const { colors } = useTheme();
    const [data, setData] = useState({
        api: false,

        event: {
            "_id": "",
            "userId": "",
            "eventName": "",
            "eventDesc": "",
            "team": [],
            "tasks": [],
            "guestList": [],
            "notes": [],
            "eventStatus": false,
            "__v": 0
        }

    }
    );

    useEffect(async () => {
        // const apiBody = { eventId: _eventId };

        const apiData = await fetch(`${apiLink}/event/${_eventId}`, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const jsonData = await apiData.json();
        // console.log(jsonData);

        if (jsonData.success) {
            setData({ ...data, event: jsonData.event })

        }
        else {
            alert("No Notes")
        }
    }, [])

    return (
        <ScrollView>
        <View>
            <Card>
                <Card.Title style={[{ backgroundColor: colors.card, fontSize: 20 }]}>{data.event.eventName}</Card.Title>
                <Card.Divider />
               
                <View style={[{ backgroundColor: "#00203FFF", borderRadius: 8, padding: 10, color: "white", paddingBottom:30 }]}>
                    <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                        {/* <Text style={[{ fontSize: 15, fontWeight: "bold", color: "white" }]}>
                            Description
                        </Text> */}
                        <Text style={[{marginBottom:30, fontSize: 18, fontWeight: "bold", color: "white", color:'yellow' }]}>
                            {data.event.eventDesc}
                        </Text>


                    </View>


                    <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "white" }]}>
                            Planner
                        </Text>
                        <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "white" }]}>
                            {data.event.userName}
                        </Text>


                    </View>


                    <View style={[{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "white" }]}>
                            Team Members
                        </Text>
                        <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "white" }]}>
                            {data.event.team.length}
                        </Text>
                    </View>
                    <View style={[{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "white" }]}>
                            Tasks Assigned
                        </Text>
                        <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "white" }]}>
                            {data.event.tasks.length}
                        </Text>
                    </View>
                    <View style={[{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "white" }]}>
                            Notes
                        </Text>
                        <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "white" }]}>
                            {data.event.notes.length}
                        </Text>
                    </View>
                    <View style={[{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "white" }]}>
                            Guest
                        </Text>
                        <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "white" }]}>
                            {data.event.guestList.length}
                        </Text>
                    </View>


                    <View style={[{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }]}>

                        <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "white" }]}>
                            Status
                        </Text>
                        <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "white" }]}>
                            {data.event.eventStatus ? "Completed" : "In Progess"}
                        </Text>
                    </View>

                <View style={[styles.row, { justifyContent: "space-between"}]}>
                    <View style={{flex:1 , margin:2}}>
                        <Button onPress={() => {

                            navigation.navigate('eventTasks', { user: _user, email: _email, number: _number, id: _id, eventId: _eventId, eventName: _eventName, eventAdmin: _eventAdmin, adminName: data.event.userName })

                        }} buttonStyle={[{ marginTop: 10, backgroundColor:'#F95700FF'}]} type="solid"  title={"View Tasks"}>
                        </Button>
                    </View>
                     <View style={{flex:1 , margin:2}}>
                        <Button onPress={() => {
                            navigation.navigate('eventNotes',
                                { user: _user, email: _email, number: _number, id: _id, eventId: _eventId, eventName: _eventName, eventAdmin: _eventAdmin, adminName: data.event.userName })
                        }} buttonStyle={[{ marginTop: 10,backgroundColor:'#F95700FF'}]} type="solid" title={"View Notes"}>
                        </Button>
                     </View>

                 </View>

                 <View style={[styles.row, { justifyContent: "space-evenly", }]}>
                    <View style={{flex:1 , margin:2}}>  
                        <Button onPress={() => {
                            navigation.navigate('eventTeam',
                                { user: _user, email: _email, number: _number, id: _id, eventId: _eventId, eventName: _eventName, eventAdmin: _eventAdmin, adminName: data.event.userName })
                        }} buttonStyle={[{ marginBottom: 5,backgroundColor:'#F95700FF'}]} type="solid" size={3} title={"View Members "}>
                        </Button>
                     </View>  
                     <View style={{flex:1 , margin:2}}> 
                        <Button onPress={() => {
                            navigation.navigate('eventGuest',
                                { user: _user, email: _email, number: _number, id: _id, eventId: _eventId, eventName: _eventName, eventAdmin: _eventAdmin, adminName: data.event.userName })
                        }} buttonStyle={[{ marginBottom: 5,backgroundColor:'#F95700FF' }]} type="solid" size={3} title={"View Guests "}>
                        </Button>
                      </View>  
                    </View>

                 

                    <View style={[styles.row, { justifyContent: "space-evenly" }]}>
                        {
                            data.event.eventStatus == false ? <Button onPress={async () => {

                                setData({
                                    ...data, api: true
                                });

                                const apiBody = { eventId: `${_eventId}`, plannerId: `${_eventAdmin}`, eventStatus: true };
                                const apiData = await fetch(`${apiLink}/changeStatus`, {
                                    method: 'POST', // or 'PUT'
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(apiBody),
                                });
                                const jsonData = await apiData.json();
                                 console.log(jsonData);
                                setData({
                                    ...data, api: false
                                });


                                if (jsonData.success) {
                                    alert(" Event Completed ")
                                }
                                else {
                                    alert("You are not creator of this event")
                                }

                            }} buttonStyle={[{ marginTop: 10, marginBottom: 5,backgroundColor:'green' }]} type="solid" size={3} title={"Complete Event"}>
                            </Button>
                                : <Button disabled type="solid" title={"Completed"} ></Button>
                        }
                    </View>

                </View>


            </Card>
        </View>
    </ScrollView>
    )
}
export default OneEvent;



const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection:'row',
        alignItems: 'center'  
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    blackColor: {
        color: "black",
    },
    buttonBackColor:{
       borderRadius:5,borderColor:'#FC766AFF', borderWidth:1,
    },
    
});