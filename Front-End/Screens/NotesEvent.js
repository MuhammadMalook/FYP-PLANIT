import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'
import apiLink from "../shared/apiLink";



const NotesEvent = ({route, navigation}) => {
   // const navigation = props.navigation;

    const _user = route.params.user;
    const _email = route.params.email;
    const _id = route.params.id;
    const _number = route.params.event;
    const _eventName = route.params.eventName;
    const _eventId = route.params.eventId;
    const _eventAdmin = route.params.eventAdmin;

    const anim = {
        0: { translateY: 0 },
        0.5: { translateY: 50 },
        1: { translateY: 0 },
      }

    const { colors } = useTheme();
    const [data, setData] = useState({ success: false, api:true });

    useEffect(async () => {
        const apiBody = { eventId: _eventId };
        const apiData = await fetch(`${apiLink}/notesOfEvent`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiBody),
        });
        const jsonData = await apiData.json();
        // console.log(jsonData);

        if (jsonData.success) {
            const noteListsFound = jsonData.noteListsFound
            setData({ ...data, api:false, success: true, notes: [...noteListsFound] })
        }
        else {
            alert("No Notes")
            setData({ ...data, api:false, success: false})
        }

    }, [])
    return (
        <ScrollView>
            {
                data.api && <ActivityIndicator color="#0000ff" style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", top: 250 }} size="large" />
            }
            <View>
                <Card.Title style={[{ backgroundColor: colors.card, fontSize: 30 }]}>{_eventName}</Card.Title>

                <View style={[{ marginTop: 20, marginBottom: 5, marginLeft: 40, marginRight: 40 }]}>
                    <Button onPress={() => {
                        navigation.navigate('newNote', { user: _user, email: _email, number: _number, id: _id, eventId: _eventId, eventName: _eventName, eventAdmin: _eventAdmin })
                    }
                    } size={5} title={"Add New Note"}></Button>

                </View>
                {
                    data.success ? data.notes.map((note, i) => <Card containerStyle={{backgroundColor:'#30D5C8'}} key={i}>
                        <Card.Title style={[{ backgroundColor: "#30D5C8" }]}>Note : {i+1} </Card.Title>
                        <Card.Divider />
                        <View style={[{ backgroundColor: "#000080", borderRadius: 5, padding: 5, color: colors.text }]}>
                            <View>
                                <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "white" }]}>
                                    {note.NotesText}
                                </Text>
                                <View style={[{ marginTop: 20, marginBottom: 5, marginLeft: 30, marginRight: 30 }]} >
                                    <Button onPress={async () => {
                                        const apiBody = { eventId: _eventId , plannerId: _eventAdmin, noteId :note._id   };
                                        const apiData = await fetch(`${apiLink}/removeNote`, {
                                            method: 'POST', // or 'PUT'
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify(apiBody),
                                        });
                                        const jsonData = await apiData.json();
                                        // console.log(jsonData);

                                        if (jsonData.success) {
                                            const new_Notes =  data.notes.filter(noteItem=> noteItem._id != note._id )

                                            setData({...data,notes :[...new_Notes] })
                                            alert("Note removed")
                                        }
                                        else {
                                            alert("Incomplete")
                                        }

                                   }}

                                        buttonStyle={{backgroundColor:"red"}} size={3} title={"Remove Note"}>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </Card>
                    )
                        : !data.api ? <View style={[[styles.listEmpty]]}>
                        <Animatable.Image source={require('../assets/error.png') }
                        animation={anim}
                        easing="ease-in-out"
                        duration={3000}
                        style={{ width: 300, height: 160}}
                        iterationCount="infinite">
                       
                      </Animatable.Image> 
                      </View>: <Text></Text>
                }
            </View>

        </ScrollView>
    )
}
export default NotesEvent;



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
    },
    listEmpty: {
        height: 500,
       alignItems: 'center',
       justifyContent: 'center',
     },
});