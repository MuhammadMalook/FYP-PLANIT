import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Card, ListItem, ThemeProvider, Button, Icon } from 'react-native-elements'
import { useTheme } from '@react-navigation/native';
import apiLink from "../shared/apiLink";
import * as Animatable from 'react-native-animatable'

const theme = {
    Button: {
        titleStyle: {
            // color: 'blue'
        }
    }
};

const EventGuest = ({route, navigation}) => {
   
    const _user = route.params.user;
    const _email = route.params.email;
    const _id = route.params.id;
    const _number = route.params.event;
    const _eventName = route.params.eventName;
    const _eventId = route.params.eventId;
    const _eventAdmin = route.params.eventAdmin;
    const _AdminName = route.params.adminName;


    
    const { colors } = useTheme();
    const [data, setData] = useState({
        api: true,
        "success": true,
        "guestList":
            [

            ]
    });

    const anim = {
        0: { translateY: 0 },
        0.5: { translateY: 50 },
        1: { translateY: 0 },
      }


    useEffect(async () => {
        // const apiBody = { eventId: _eventId };
        const apiData = await fetch(`${apiLink}/getEventGuest/${_eventId}`, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const jsonData = await apiData.json();
        console.log(jsonData);

        if (jsonData.success) {
            const guestList = jsonData.guestList
            setData({ ...data, success: true, api:false, guestList: [...guestList] })
        }
        else {
            setData({ ...data, success: false, api:false })
        }

    }, [])

    return (
        <ScrollView>

            <View>
                <View style={[{ marginTop: 25, marginBottom: 5, marginLeft: 40, marginRight: 40 }]}>

                    <Button onPress={() => {
                        if(_eventAdmin == _id)
                        {
                            navigation.navigate('inviteGuest', { user: _user, email: _email, number: _number, id: _id, eventId: _eventId, eventName: _eventName, eventAdmin: _eventAdmin,adminName : _AdminName })
                        
                        }
                        else
                        {
                            alert("Not Authorized")

                        }
                    }} size={5} title={"Invite New Guest"}>

                    </Button>
                </View>
                {
                    data.success == true ? data.guestList.map((guest, i) => <Card key={i} >
                        <View style={[{ backgroundColor: "#ADD8E6", borderRadius: 5, padding: 5, color: colors.text }]}>
                            <View>
                                <Text style={[{ textAlign: "center", fontSize: 20, fontWeight: "bold", color: colors.text }]}>
                                    {guest.name}
                                </Text>
                                <Text style={[{ textAlign: "center", fontSize: 14, fontStyle:'italic', color: colors.text }]}>
                                    {guest.number}
                                </Text>
                            </View>
                            <View style={[styles.row, { justifyContent: "space-evenly",  }]}>

                                
                                    
                                    <View style={{flex:1, margin:2,color:"black"}}>
                                        <Button
                                        onPress={async () => {

                                            setData({
                                                ...data, api: true
                                            });
                                            console.log(_id,"hello")
                                            if(_id === _eventAdmin)
                                            {
                                                const apiBody = { eventId: `${guest.eventId}`, plannerId: `${_eventAdmin}`, guestId: guest._id };
                                            const apiData = await fetch(`${apiLink}/removeGuest`, {
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
                                            

                                            if (jsonData.success) 
                                            {
                                                alert("Guest Removed ")
                                            }
                                            else {
                                                alert("Guest Not Removed")
                                            }

                                        }
                                        else
                                        {
                                            console.log(_id,"hello")
                                            alert("You cannnot remove Guest")
                                        }
                                    
                                    }
                                }

                                     buttonStyle={[{backgroundColor:'red'}]} title={"Remove"}>
                                    </Button>
                                    </View>
                                    <View style={{flex:1, margin:2}}>
                                        <Button onPress={() => {
                                        navigation.navigate('ViewProfile', { name: guest.name, id: guest._id });
                                    }} buttonStyle={[{ backgroundColor:'blue'}]} title={"View"}  >
                                    </Button>
                                    </View>   

                      

                            </View>
                        </View>
                    </Card>
                    ) : 
                     <View style={[[styles.listEmpty]]}>
                    <Animatable.Image source={require('../assets/error.png') }
                    animation={anim}
                    easing="ease-in-out"
                    duration={3000}
                    style={{  width: 300, height: 160}}
                    iterationCount="infinite">
                   
                  </Animatable.Image>
                
                  </View>

                }

                {

                    data.api && <ActivityIndicator color="#0000ff" style={{ position: "absolute", left: 0, right: 0, bottom: -20, top: 250 }} size="large" />
                }

            </View>

        </ScrollView>
    )
}
export default EventGuest;
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
    button: {
        color: "#ff5c5c",
    },
    listEmpty: {
        height: 500,
       alignItems: 'center',
       justifyContent: 'center',
     },
});