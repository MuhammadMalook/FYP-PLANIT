import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Button,
    View,
    Text,
    Dimensions,
    StyleSheet,
    StatusBar,
    TextInput,
    Platform,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import apiLink from '../shared/apiLink';



const { height } = Dimensions.get("screen");
const height_logo = height * 0.25;
const CreateNote = ({route,navigation}) => {

    //const navigation = props.navigation;
    console.log(route)
    const _user = route.params.user;
    const _email = route.params.email;
    const _id = route.params.id;
    const _number = route.params.event;
    const _eventName = route.params.eventName;
    const _eventId = route.params.eventId;
    const _eventAdmin = route.params.eventAdmin;
    const _AdminName = route.params.user; 

    const { colors } = useTheme();


    
    const handleEventId = (value) => {
        if (value.trim().length > 4) {
            setData({
                ...data,
                eventID: value,
                isValidEventId: true
            })
        }
        else {

            setData({
                ...data,
                eventID: value,
                isValidEventId: false
            })
        }
    }


    const handlePlannerId = (value) => {
        if (value.trim().length > 4) {
            setData({
                ...data,
                plannerId: value,
                isValidPlanner: true
            })
        }
        else {

            setData({
                ...data,
                plannerId: value,
                isValidPlanner: false
            })
        }
    }

    const handleDesc = (value) => {
        if (value.trim().length > 4) {
            setData({
                ...data,
                eventDesc: value,
                isValidDesc: true,
                textChange : true,
            })
        }
        else {

            setData({
                ...data,
                eventDesc: value,
                isValidDesc: false,
                textChange : false,
            })
        }
    }

    const [data, setData] = useState({
        isValidEventId: true,
        apiHit: false,
        isValidPlanner: true,
        isValidDesc: true,
        eventID: _eventId,
        plannerId: _eventAdmin,
        eventDesc: "",
        textChange:false,
    });


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />

            <View style={styles.text_header}>
                <Text style={[styles.text_header, { margin: 10 }]}> Create New Note  </Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >

                <View style={{ marginBottom: 15 }}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Event Name</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="group"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            editable = {false}
                            value={_eventName}
                            placeholder="Event Name"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handleEventId(val)}
                        />
                        {data.isValidEventId ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>

                    {data.isValidEventId ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>

                            <Text style={styles.errorMsg}>Event Name Should be Valid.</Text>
                        </Animatable.View>
                    }
                </View>


                <View style={{ marginBottom: 15 }}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>
                        Your Name
                    </Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                        value={_user}
                            editable = {false}
                            placeholder="Your Username"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePlannerId(val)}
                        />
                        {data.isValidPlanner ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>

                    {data.isValidPlanner ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>

                            <Text style={styles.errorMsg}>Your Name Must be Valid.</Text>
                        </Animatable.View>
                    }
                </View>

                <View style={{ marginBottom: 15 }}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Note </Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="file-text-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            multiline={true}
                            numberOfLines={5}
                            placeholder="Description"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handleDesc(val)}
                        />
                        {data.textChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : <Text>      </Text>}
                    </View>

                    {data.isValidDesc ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>

                            <Text style={styles.errorMsg}>Description Should Be Valid.</Text>
                        </Animatable.View>
                    }
                </View>

                {
                    data.api && <ActivityIndicator color="#0000ff" style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", top: 0 }} size="large" />
                }
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={async () => {
                            
                            if(!data.isValidDesc)
                            {
                                alert("please Write Complete Description ")
                                return;
                            }

                            setData({
                                ...data,api: true 
                            });

                            const apiBody = { eventId: `${_eventId}`, plannerId: `${_eventAdmin}`, noteText: `${data.eventDesc}` };
                            const apiData = await fetch(`${apiLink}/addNote`, {
                                method: 'POST', // or 'PUT'
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(apiBody),
                            });
                            const jsonData = await apiData.json();
                            setData({
                                ...data,api: false 
                            });
    
                            if(jsonData.success)
                            {
                                const apiBody = {eventId:_eventId, eventName:_eventName, from: _AdminName, Message:"note created", type:'note', noteId:jsonData.note._id}
                                console.log(apiBody, "Body")
                                        const result = await fetch(`${apiLink}/addNotification`, {
                                            method:'POST',
                                            headers:{
                                                'Content-type':'application/json'
                                            },
                                            body: JSON.stringify(apiBody)

                                        })
                                        const jsonResult = await result.json()
                                        setData({
                                            ...data, api: false
                                        });
                                        if(jsonResult.success)
                                        {
                                            console.log('notification added')
                                        }
                                        else{
                                            console.log('notification not added')
                                        }

                                alert("Note Created")
                            }
                            else
                            {
                                alert("Note Not created")
                            }

                        }}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 5
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Create New Note</Text>
                    </TouchableOpacity>

                </View>

            </Animatable.View>

        </View>
    )
}
export default CreateNote;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        marginLeft: 8,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#D3D3D3",
        borderRadius: 10,
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
