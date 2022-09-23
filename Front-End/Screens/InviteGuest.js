import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
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
    ActivityIndicator,
    ScrollView
} from 'react-native';
import apiLink from '../shared/apiLink';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';




const { height } = Dimensions.get("screen");
const height_logo = height * 0.25;
const InviteGuest = ({route, navigation}) => {


    
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
        api: false,
        validData: true,
        eventName: _eventName,
        eventPlanner: _eventAdmin,
        username: "",
        number: "",
        isValidNumber: true,
        isValidUser:true
    });

    const [clicked, setClicked] = useState(false)


    const [nameList, setList] = useState([]);
const [FilteredList, setFilteredList] =
    useState([]);

    const handleValidNumber = (val) => {
        console.log(data)
        if (val.trim().length > 10) {
            setData({
                ...data,
                number: val,
                isValidNumber: true
            })
        }
        else {

            setData({
                ...data,
                number: val,
                isValidNumber: false
            })
        }
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }
    const textInputChange = (val) => {
        if (val != "") 
        {
            const newList = nameList.filter(word => {
                if (word.match(val))
                    return word;
            });
            setFilteredList([...newList])
        }
        if(val=="")
        {
            setFilteredList([])
        }

        if (val.trim().length >= 4) {
            console.log(val,"hee")
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }
    useEffect( async ()=>
    {
        const apiData = await fetch(`${apiLink}/getAllName`, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const jsonData = await apiData.json();
        // console.log(jsonData);
        if (jsonData.success) {
            const list = jsonData.namesList
            setData({ ...data, success: true, namesList: [...list] })
            setList([...list])
        }
        else {
            alert("Not getting names")
        }


    },[])
    useEffect(()=>{
        console.log(data, "data")
        //const name = data.username
        if(clicked)
            getNumber(data)
    },[clicked])
    
    const getNumber = async (props) =>{
        console.log(props.username, "hello")
        const apiBody = {name:props.username}
        
        const jsonData = await fetch(`${apiLink}/getNumberByName`, {
            method:"POST",
            headers:{
                "Content-type":"Application/json"
            },
            body:JSON.stringify(apiBody)
        })

        const result = await jsonData.json()
        console.log(result)
        if(result.success)
        {
            const number = result.number;
            console.log(number)
            setData({...data, number:number, isValidNumber:true})
        }
        else
        {
            console.log(result.msg)
        }
    }
    
    return (
        <ScrollView>
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />

            {
                data.api && <ActivityIndicator color="#0000ff" style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", top: 0 }} size="large" />
            }
            <View style={styles.text_header}>
                <Text style={[styles.text_header, { margin: 10 }]}>  Request Information  </Text>
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

                            editable={false}
                            placeholder="Event Name"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            value={_eventName}
                            autoCapitalize="none"
                        // onChangeText={(val) => textInputChange(val)}

                        // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}

                        />
                        {data.validData ?
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

                </View>


                <View style={{ marginBottom: 15 }}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Event Planner</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            editable={false}
                            placeholder="Your Username"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            // onChangeText={(val) => textInputChange(val)}
                            // onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                            value={_AdminName}
                        />
                        {data.validData ?
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
                </View>

                <View style={{ marginBottom: 15 }}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Guest Name</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            value={data.username}
                            placeholder="UserName"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                        />
                        {data.isValidUser ?
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

                    {data.isValidUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Name Should Be Valid.</Text>
                        </Animatable.View>
                    }
                </View>
                {
                    FilteredList.length != 0 && FilteredList.map((items, i) => <TouchableOpacity key={i}>
                        <View style={styles.itemContainer} >
                            <Text onPress={async () => {
                            setFilteredList([]);
                            setData({ ...data, username: items, isValidUser:true,check_textInputChange: true });
                            setClicked(true)

                          
                            
                            console.log(data,"on prss in text")
                            
                                
                        }} style={{padding:10, fontSize:20,}}>
                            {items}
                            </Text>
                        </View>
                    </TouchableOpacity>)
                }

                <View>
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Number</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="phone"
                                color={colors.white}
                                size={20}
                            />
                            <TextInput
                        value={data.number}

                                placeholder="Guest Number"
                                placeholderTextColor="#666666"
                                keyboardType='numeric'
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => handleValidNumber(val)}
                            />
                            {data.isValidNumber ?
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

                        {data.isValidNumber ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>

                                <Text style={styles.errorMsg}>Number must be 11 characters </Text>
                            </Animatable.View>
                        }
                    </View>



                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={
                            async () => {
                                if(data.isValidNumber == false || data.validData == false)
                                {
                                    alert("please enter Complete Data")
                                    return;
                                }

                                setData({
                                    ...data, api: true
                                });
                                const apiBody = { eventId: `${_eventId}`, plannerId: `${_eventAdmin}`, guestName: `${data.username}`, guestNumber: `${data.number}` };
                                const apiData = await fetch(`${apiLink}/addGuest`, {
                                    method: 'POST', // or 'PUT'
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(apiBody),
                                });
                                const jsonData = await apiData.json();
                                // console.log(jsonData);
                                setData({
                                    ...data, api: false
                                });

                                if (jsonData.success) 
                                {
                                    alert("Guest Invited")
                                }
                                else {
                                    alert("Not Invited")
                                }
                            }
                        }
                        // onPress={() => navigation.navigate('SignUpScreen}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 5
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Send Request</Text>
                    </TouchableOpacity>

                </View>

            </Animatable.View>

        </View>
        </ScrollView>
    )
}

export default InviteGuest;
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
        fontSize: 18,
        marginLeft:25,
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
        marginLeft: 5,
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
