
import React, { useEffect, useState } from "react";
import { Card, Button } from 'react-native-elements'

import { View, Text, StyleSheet } from "react-native";
import { useTheme } from '@react-navigation/native';
import apiLink from "../shared/apiLink";

const ViewGuest = ({route, navigation}) => 
{
    const { colors } = useTheme();
    
    //const navigation = navigation;

    const _id = route.params.id;
    const _name = route.params.name;
    const _number = route.params.number;
    const eventid = route.params.eventId;
    

    const [data, setData] = useState({
        
    });

 useEffect = async()=>{
    const apiData = await fetch(`${apiLink}/getEventGuest/${eventid}`, {
        method:"GET",
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const jsonData = await apiData.json();
    setData(jsonData);

 }   
    

    return (
        <View>
        
            <View>
                <Card>
                    <Card.Title style={[{ backgroundColor: colors.card , fontSize: 25 }]}>{data.name}</Card.Title>
                    <Card.Divider />

                    <View style={[{ backgroundColor: colors.border, borderRadius: 8, padding: 5, color: colors.text }]}>
                        
                     
                        <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

                            <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text }]}>
                                Number
                            </Text>
                            <Text style={[{ textAlign: "center", fontSize: 20, fontWeight: "bold", color: colors.text }]}>
                                {data.number}
                            </Text>

                        </View>
                    </View>

                </Card>
            </View>

            
        </View>
    )
}
export default ViewGuest;

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