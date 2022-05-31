import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image,ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useTheme } from '@react-navigation/native';
import { CheckBox } from 'react-native';
import apiLink from "../shared/apiLink";
//import { TouchableOpacity } from "react-native-gesture-handler";
// import { tapGestureHandlerProps } from "react-native-gesture-handler/lib/typescript/handlers/TapGestureHandler";

const Tasks = ({route, navigation}) => {
    const colors = useTheme();
    const data_task = route.params;
  
    console.log(route)
   // const navigation = props.navigation;
   // const [apiState,setApi] = useState(false);
    const [data, setData] = useState({
        "success": true,
         "api":true,
        "tasks":[ {
            "_id": "6191254806d9d4318b2f83f1",
            "eventId": "619032f2271ff186b1c1eca7",
            "taskText": "Bring Cake",
            "assignTo": "61903152fd325904426375da",
            "__v": 0,
            "taskStatus": true
        },
        {
            "_id": "6197e64193c8dc7293981279",
            "eventId": "619032f2271ff186b1c1eca7",
            "taskText": "Bring Candles",
            "assignTo": "61903152fd325904426375da",
            "__v": 0
        },
        {
            "_id": "6191254806d9d4318b2f83f1",
            "eventId": "619032f2271ff186b1c1eca7",
            "taskText": "Bring Cake",
            "assignTo": "61903152fd325904426375da",
            "__v": 0,
            "taskStatus": true
        },
        {
            "_id": "6197e64193c8dc7293981279",
            "eventId": "619032f2271ff186b1c1eca7",
            "taskText": "Bring Candles",
            "assignTo": "61903152fd325904426375da",
            "__v": 0
        }]
    });


   async function getData()
    {
        
    }

    useEffect(async()=>{  
    
        setData({
            ...data, api: false
        });
        const tasks = await fetch(`${apiLink}/getEventTasks/${data_task.eventId}`,{
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const taskList = await tasks.json();
        console.log(taskList)
        if(taskList.success)
        {
           setData({...data, api:false, tasks:[...taskList.tasks]})
        }
        else{
            setData({...data, sucees:false})
        }
    },[])
return(
    data.api ? <ActivityIndicator color="#0000ff" style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", top: 0 }} size="large" />

        : <>
            <ScrollView>      
            {
                data.tasks.map((item,i) => <Card key={i}>
                    <Card.Title>
                        {item.taskText}
                    </Card.Title>
                    <Card.Divider />
                    <View>
                        <View style={[{ marginTop: 8, flexDirection: "row", justifyContent: "space-between" }]}>
                            <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                Assigned To
                            </Text>

                            <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                {item.assignTo}
                            </Text>
                        </View>

                        <View style={[{ marginTop: 8, flexDirection: "row", justifyContent: "space-between" }]}>
                            <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                Event
                            </Text>

                            <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                {data_task.eventName}
                            </Text>
                        </View>

                        <View style={[{ marginTop: 8, flexDirection: "row", justifyContent: "space-between" }]}>
                            <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                Task Status
                            </Text>

                            <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: colors.text }]}>
                                {item.taskStatus === true ? "Completed" : "Not Completed"}
                            </Text>
                        </View>
                        {item.taskStatus === true ? <Button style={[{ marginTop: 10, marginBottom: 5, marginLeft: 20, marginRight: 20 }]} type="solid" size={5} title={"Completed"} disabled>

                        </Button> : <Button style={[{ marginTop: 10, marginBottom: 5, marginLeft: 20, marginRight: 20 }]} type="outline" size={5} title={"Complete Task"}>

                        </Button>}

                    </View>
                </Card>)
            }
            
    </ScrollView> 
    <View style={{flex:1}}>
            <View style = {styles.containerMain}>
       <TouchableOpacity
        onPress={()=> {
            if(data_task.eventAdmin === data_task.id){
            navigation.navigate('createTask', {...data_task})
        }
        else{
            alert("you are not admin of this event")
        }
        }}
        style={styles.bottomView}
         >

           <Image source={require('../assets/plus.png')} resizeMode="contain" style={{ 
                  width:50, height:50,
                   alignItems:'center'
                }}
                
            
            />
         </TouchableOpacity>
         </View>
       </View>
    </>
    
)
    

}

const styles = StyleSheet.create({
    containerMain: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    bottomView: {
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute', //Here is the trick
      bottom: 0, //Here is the trick
    },
    textStyle: {
      color: '#fff',
      fontSize: 18,
    },
  });

export default Tasks;