import React, { useState } from "react"
import { StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

// import { Card, ListItem,ThemeProvider, Button, Icon } from 'react-native-elements'
import { Card } from "react-native-elements";
import { ThemeProvider } from "react-native-elements";
import { Button } from "react-native-elements";

import { Text } from "../components/Themed"
import { ScrollView } from "react-native";
import { View } from "react-native";
const MyEvents = (props) => {
    const navigation = props.navigation;

    const { colors } = useTheme();
    const [data, setData] = useState({
        "success": true,
        "events": [
           
        ]
    });
    return (

        <View style={{flex:1}}>
        <ScrollView style={{marginBottom:100}}>
                {
                    data.api == true && data.events.map((eventItem, i) => <Card key={i} containerStyle={{shadowColor:'#7F5DF0', shadowOffset:{width:2, height:3},shadowOpacity:0.1}}>
                        <Card.Title style={[{ backgroundColor: colors.card }]}>{eventItem.eventName}</Card.Title>
                        <Card.Divider />
                        <View key={i} style={[{ backgroundColor: colors.border, borderRadius: 10, padding: 5, color: colors.text, shadowColor:'#7F5DF0', shadowOffset:{width:2, height:3},shadowOpacity:0.1}]}>
                            <View>
                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    Description
                                </Text>
                                <Text style={[styles.section, { color: colors.text, paddingLeft: 5 }]}> {eventItem.eventDesc} </Text>

                            </View>

                            <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    Planner
                                </Text>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    {eventItem.userId}
                                </Text>


                            </View>
                            <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    Team Members
                                </Text>
                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    {eventItem.team.length}
                                </Text>
                            </View>
                            <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    Tasks Assigned
                                </Text>
                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    {eventItem.tasks.length}
                                </Text>
                            </View>
                            <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    Notes
                                </Text>
                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    {eventItem.notes.length}
                                </Text>
                            </View>
                            <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    Status
                                </Text>
                                <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                    {eventItem.eventStatus ? "Completed" : "In Progess" }
                                </Text>
                            </View>
                            <View style={[styles.row, { justifyContent: "space-evenly" }]}>

                                <ThemeProvider >

                                {eventItem.eventStatus ? 
                                     <Button type="outline" size={3} style={[{ marginTop: 10, marginBottom: 5, width:50 , color: "red" }]} title={"Complete"} disabled>
                                    </Button> : <Button type="outline" size={3} style={[{ marginTop: 10, marginBottom: 5, width:50 , color: "red" }]} title={"Complete"}>
                                    </Button> }

                                </ThemeProvider>

                                <Button onPress={()=> {
                                    navigation.navigate('OneEvent')
                                }} style={[{ marginTop: 10 , marginBottom: 5, width: 50 }]} type="outline" size={3} title={"View"}>
                                </Button>

                            </View>
                        </View>


                    </Card>
                    )

                }

        </ScrollView>
        </View>
    )
}
export default MyEvents;





const styles = StyleSheet.create({
    ShadowRoot:{
        shadowColor:"#7F5DF0",
        shadowOffset:{
          width:0,
          height:20,
        },
        shadowOpacity:0.80,
        shadowRadius:10.5,
        elevation:5,
        borderRadius:50,
       
        
      },
        container: {
            flex: 1,
            backgroundColor: '#009387'
        },
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