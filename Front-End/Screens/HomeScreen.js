import React, { useState } from "react"
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';

import { Card, ListItem, ThemeProvider, Button, Icon } from 'react-native-elements'

import { Text } from "../components/Themed"
import apiLink from "../shared/apiLink";

// import NavContainer from "../routes/NewDrawer";

const HomeScreen = ({navigation, route}) => {
    // const navigation = navigation;
    console.log(route.params, "helloooooooo")
    // console.log(navigation)
    const _user = route.params.name;
    const _email = route.params.email;
    const _id = route.params.id;
    const _number = route.params.number;
    const _requests = route.params.requests;
    console.log("in am called "+_email)


    const [homeScreenData, setScreen] = useState({
        userName: _user,
        email: _email,
        req: _requests,
        num: _number
    })
    const { colors } = useTheme();
    const [data, setData] = useState({
        "success": true,
        "events": [

        ]
    });

    useState(async () => {
        setData({
            ...data, api: true
        });

        const apiBody = { id: _id };
        const apiData = await fetch(`${apiLink}/getEventByUser`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiBody),
        });
        const jsonData = await apiData.json();
         console.log(jsonData + "json");
        if (jsonData.success)
            setData({
                ...data, api: false, events: [...jsonData.events]
            });
        else {
            setData({ ...data, api: false, success : false })

        }

        setScreen({
            userName: _user,
            email: _email,
            req: _requests,
            num: _number
        });


    }, [])
    return (
        <ScrollView>
            
            {
                data.api && <ActivityIndicator color="#0000ff" style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", top: 0 }} size="large" />
            }
            {/* <NavContainer/> */}
            <Card style={[{ backgroundColor: colors.card }]}>

                <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text, marginBottom: 10 }]}>

                    Hi {homeScreenData.userName} ,
                    You Have  {homeScreenData.req} Requests
                </Text>
                <View>
                    <Button onPress={() => {
                        navigate('myRequests', { user: _user, email: _email, number: _number, id: _id })
                    }} title={"View Requests"}>

                    </Button>
                </View>
            </Card>
            <Card style={[{ backgroundColor: colors.card, marginTop: 5 }]}>
                <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text, marginBottom: 10 }]}>

                    Why Are You Waiting ! Just Create New Event
                </Text>
                <View>
                    <Button onPress={() => {
                        navigate('createEvent', { user: _user, email: _email, number: _number, id: _id })
                    }} title={"Create Event"}>

                    </Button>
                </View>
            </Card>

            {
                data.success == true ? data.events.map((eventItem, i) => <Card key={i}>
                    <Card.Title style={[{ backgroundColor: colors.card, fontSize: 18 }]}>{eventItem.eventName}</Card.Title>
                    <Card.Divider />
                    <View key={i} style={[{ backgroundColor: colors.border, borderRadius: 5, padding: 5, color: colors.text }]}>

                        <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                            <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
                                Planner
                            </Text>

                            <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
                                {eventItem.eventDesc}
                            </Text>
                        </View>


                        <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                            <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
                                Planner
                            </Text>

                            <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
                                {eventItem.userName}
                            </Text>


                        </View>


                        <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                            <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
                                Team Members
                            </Text>
                            <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
                                {eventItem.team.length}
                            </Text>
                        </View>
                        <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                            <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
                                Tasks Assigned
                            </Text>
                            <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
                                {eventItem.tasks.length}
                            </Text>
                        </View>
                        <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                            <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
                                Notes
                            </Text>
                            <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
                                {eventItem.notes.length}
                            </Text>
                        </View>
                        <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                            <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
                                Status
                            </Text>
                            <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
                                {eventItem.eventStatus ? "Completed" : "In Progess"}
                            </Text>
                        </View>
                        <View style={[{ margin: 10 }]}>

                            <Button onPress={() => {
                                navigate('OneEvent', { user: _user, email: _email, number: _number, id: _id, eventId: eventItem._id, eventName: eventItem.eventName, eventAdmin: eventItem.userId })
                            }} style={[{ marginTop: 10, marginBottom: 5, width: 50 }]} type="outline" size={3} title={"View"}>
                            </Button>

                        </View>

                    </View>
                </Card>
                ) : <Card style={[{ backgroundColor: colors.card }]}>

                    <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text, marginBottom: 10 }]}>
                        No Events
                    </Text>

                </Card>
            }
        </ScrollView>

    )
}
export default HomeScreen;
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
        flexDirection: 'row',
        alignItems: 'center',
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
    }
});