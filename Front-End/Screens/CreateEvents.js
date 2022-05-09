import { useTheme } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    StatusBar,
    TextInput,
    Platform, ScrollView,
    TouchableOpacity,ActivityIndicator,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import apiLink from '../shared/apiLink';
import Dialog, { DialogContent,DialogTitle,SlideAnimation } from 'react-native-popup-dialog';
import { ButtonGroup } from 'react-native-elements/dist/buttons/ButtonGroup';
import { Button } from 'react-native-paper';
import { EventImages } from '../events-images/EventImages';


const { height } = Dimensions.get("screen");
const height_logo = height * 0.25;



const CreateEvent = ({route,navigation}) => {

 const [visible, setVisible] = useState(false)
   // const navigation = props.navigation;
    
    const _user = route.params.name;
    const _email = route.params.email;
    const _id = route.params._id;
    const _number = route.params.event;
    const { colors } = useTheme();

    const [data, setData] = useState({
        api:false,
        isValidEventName: false,
        isValidPId : true,
        isValidDesc:false,
        isValidPlanner: true,
        eventName: "",
        plannerId: _id,
        eventStatus: false,
        eventDesc: "",
        PlannerName: _user
    });
    
    const handleValidPlannerId = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidPId: true
            });
        } else {
            setData({
                ...data,
                isValidPId: false
            });
        }
    }

    
    const  eventNameChange = (value)=>
    {
        console.log(value)
        if(value.trim().length>4)
        setData({
            ...data,
            eventName: value,
            isValidEventName: true
        })
        else
        setData({
            ...data,
            eventName: value,
            isValidEventName: false
            
        })
    }
    const  eventPlannerId = (value)=>
    {
        if(value.trim().length>4)
        setData({
            ...data,
            isValidPId: value,
            isValidPId: true
        })
        else
        setData({
            ...data,
            isValidPId: value,
            isValidPId: false
        })
    }

    const  eventPlannerName = (value)=>
    {
        if(value.trim().length>4)
        setData({
            ...data,
            
            PlannerName: value,
            isValidPlanner: true
        })
        else
        setData({
            ...data,
            PlannerName: value,
            isValidPlanner: false
        })
    }
    

    const  eventDesc = (value)=>
    {
        if(value.trim().length>4)
        setData({
            ...data,
            eventDesc: value,
            isValidDesc: true
        })
        else
        setData({
            ...data,
            eventDesc: value,
            isValidDesc: false
        })
    }

    return (

  <ScrollView style={{paddingBottom:100}}>
    
  <Dialog dialogAnimation={new SlideAnimation({
      slideFrom: 'bottom',
    })}
    dialogTitle={<DialogTitle title="Select Event" />}
    visible={visible}
    onTouchOutside={() => {
      setVisible(false);
      console.log()
    }} 
    dialogStyle={{margin:20, borderRadius:20, borderWidth:5, borderColor:'#E3B448'}}
  >
    <DialogContent style={{flexDirection:'row', flex:1, justifyContent:'flex-start',flexWrap:'wrap'}}>
      {
          Object.keys(EventImages).map((key, value)=>{
            
             return <Button key={key} mode='outlined' onPress={(e,word)=>{setVisible(false)
                    console.log(key)
                    data.eventName=key.toUpperCase()
                    //eventNameChange(e.target.innerText)
                }
                } style={{margin:3}}>{key}</Button>
          })
         
      }
          {/* <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button>
          <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button>
          <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button>
          <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button>
          <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button>
          <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button>
          <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button>
          <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button>
          <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button>
          <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button>
          <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button>
          <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button>
          <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button>
          <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button>
          <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button>
          <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button>
          <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button>
          <Button mode='outlined' onPress={()=>setVisible(false)}>Tea</Button> */}
          
    
    </DialogContent>
  </Dialog>
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            
            <View style={styles.text_header}>
                <Text style={[styles.text_header,{margin:10}]}> Enter Event Information  </Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >

                <View style={{ marginBottom: 10 }}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Event Name</Text>
                    <View style={styles.action} >
                        <FontAwesome
                            name="group"
                            color={colors.text}
                            size={20}
                        />
                       
                        <TextInput
                            placeholder="Event Name"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                           // onChangeText={(val) => eventNameChange(val)}
                             ///onEndEditing={(e) => handleValidEventName(e.nativeEvent.text)}
                            value={data.eventName}
                            onFocus={()=> {
                                setVisible({ visible: true });
                              }}
                        

                        />
                       
                        {data.isValidEventName ?
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

                    {data.isValidEventName ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>

                            <Text style={styles.errorMsg}>Event Name must be 4 characters long.</Text>
                        </Animatable.View>
                    }
                </View>


                <View style={{ marginBottom: 10 }}>
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
                        value={data.PlannerName}
                            placeholder="Your Username"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            editable={false}
                            autoCapitalize="none"
                            onChangeText={(val) => eventPlannerName(val)}
                            // onEndEditing={(e) => handleValidPlannerName(e.nativeEvent.text)}
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

                            <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                        </Animatable.View>
                    }
                </View>

                <View style={{ marginBottom: 10 }}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Planner ID</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="id-card-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                        editable={false}
                        value={data.plannerId}
                            placeholder="Your ID"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => eventPlannerId(val)}
                            // onEndEditing={(e) => handleValidPlannerId(e.nativeEvent.text)}
                        />
                        {data.isValidPId ?
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

                    {data.isValidPId ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>

                            <Text style={styles.errorMsg}>Id Should Be Valid.</Text>
                        </Animatable.View>
                    }
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Description</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="file-text-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Description"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => eventDesc(val)}
                            // onEndEditing={(e) => handleValidDesc(e.nativeEvent.text)}
                        />
                        {data.isValidDesc ?
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

                    {data.isValidDesc ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>

                            <Text style={styles.errorMsg}>Description Should Be Valid.</Text>
                        </Animatable.View>
                    }
                </View>
                
            <View style={styles.button}>
            <TouchableOpacity
            onPress={ async ()=>{
                if(data.eventName == "" || data.eventDesc == "" )
                {
                    alert("please Enter the All Data")
                    return;
                }
                setData({
                                ...data,api:true 
                            });

                const apiBody = { userName: `${_user}`, plannerId: `${_id}`, eventName: data.eventName,  eventStatus : false,  eventDesc: data.eventDesc   };
                            const apiData = await fetch(`${apiLink}/event`, {
                                method: 'POST', // or 'PUT'
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(apiBody),
                            });
                            const jsonData = await apiData.json();
                            {/* console.log(jsonData);                         */}
                            setData({
                                ...data,api: false 
                            });
    
                            if(jsonData.success)
                            {
                                alert("Event Created")
                            }
                            else
                            {
                                alert("Event Not created")
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
                    }]}>Create New Event</Text>
                </TouchableOpacity>

            </View>
            {
                data.api && <ActivityIndicator color="#0000ff" style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", top: 0 }} size="large" />
            }

            </Animatable.View>

        </View>
</ScrollView>
    )
}

export default CreateEvent;
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
    
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    textInput: {
        marginLeft:5,
        borderStyle:"solid",
        borderWidth: 1,
        borderColor:"#D3D3D3",
        
        borderRadius:10,
        
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
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
