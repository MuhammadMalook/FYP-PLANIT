import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image,ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { useTheme } from '@react-navigation/native';
import { CheckBox } from 'react-native';
import apiLink from "../shared/apiLink";
import * as Animatable from 'react-native-animatable'
import { FAB } from "react-native-paper";
import Colors from "../constants/Colors";
//import { TouchableOpacity } from "react-native-gesture-handler";
// import { tapGestureHandlerProps } from "react-native-gesture-handler/lib/typescript/handlers/TapGestureHandler";

const Tasks = ({route, navigation}) => {
    const colors = useTheme();
    const data_task = route.params;
    const admin = route.params.user;
  
    console.log(route, "tasks")
   // const navigation = props.navigation;
   // const [apiState,setApi] = useState(false);
    const [data, setData] = useState({
        "success": true,
         api:true,
        "tasks":[]
    });

    const anim = {
        0: { translateY: 0 },
        0.5: { translateY: 50 },
        1: { translateY: 0 },
      }

   async function getData()
    {
        
    }

    useEffect(async()=>{  
    
        
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
            setData({...data, api:false, sucees:false})
        }
    },[])
return(
    <View style={{flex:1}}>
    <ScrollView>
        {
            data.api && <ActivityIndicator color="#0000ff" style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", top: 250 }} size="large" />
        }
        

            {
               data.tasks.length > 0 ? data.tasks.map((item,i) => <Card containerStyle={{backgroundColor:Colors.cardsColor, borderRadius:10}} key={i}>
                    <Card.Title style={{color:Colors.white }}>
                        {item.taskText}
                    </Card.Title>
                    <Card.Divider />
                    <View>
                        <View style={[{ marginTop: 8, flexDirection: "row", justifyContent: "space-between" }]}>
                            <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: Colors.white }]}>
                                Assigned To
                            </Text>

                            <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: Colors.white  }]}>
                                {item.assignTo}
                            </Text>
                        </View>

                        <View style={[{ marginTop: 8, flexDirection: "row", justifyContent: "space-between" }]}>
                            <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: Colors.white  }]}>
                                Event
                            </Text>

                            <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: Colors.white  }]}>
                                {data_task.eventName}
                            </Text>
                        </View>

                        <View style={[{ marginTop: 8, flexDirection: "row", justifyContent: "space-between" }]}>
                            <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: Colors.white  }]}>
                                Task Status
                            </Text>

                            <Text style={[{ textAlign: "center", fontSize: 10, fontWeight: "bold", color: Colors.white  }]}>
                                {item.taskStatus === true ? "Completed" : "Not Completed"}
                            </Text>
                        </View>
                        {item.taskStatus === true ? <Button  style={[{ marginTop: 10, marginBottom: 5, marginLeft: 20, marginRight: 20 }]} type="solid" size={5} title={"Completed"} disabled>

                        </Button> : <Button containerStyle={{marginTop:20}} style={[{ marginTop: 10, marginBottom: 5, marginLeft: 20, marginRight: 20 }]} type="solid" size={5} title={"Complete Task"} 
                        onPress={async()=>{
                            const jsonBody = {taskId:item._id, user:admin}
                            console.log(jsonBody)
                            const completeTask = await fetch(`${apiLink}/completeTask`,{
                                method:"POST",
                                headers:{
                                    "Content-type":"application/json"
                                },
                                body: JSON.stringify(jsonBody)
                            })
                            const jsonData = await completeTask.json()
                            if(jsonData.success)
                            {
                                alert("Task completed")
                                
                            }
                            else
                            alert(jsonData.msg)
                        }}
                        >
                        
                        </Button>}

                    </View>
                </Card>) : !data.api ?
                 <View style={[[styles.listEmpty]]}>
                 <Animatable.Image source={require('../assets/error.png') }
                 animation={anim}
                 easing="ease-in-out"
                 duration={3000}
                 style={{ width: 300, height: 160}}
                 iterationCount="infinite">
                
               </Animatable.Image>
            
               </View>: <Text></Text>
            }  
   

    

    </ScrollView> 
    <FAB 
                icon="plus"
                label="Add Task"
                style={styles.fab}
                onPress={() => {
                    if(data_task.eventAdmin === data_task.id){
                        navigation.navigate('createTask', {...data_task})
                    }
                    else
                    {
                        alert("you are not admin of this event");

                    }
                }}
            />
    </View>
    
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
    listEmpty: {
        height: 500,
       alignItems: 'center',
       justifyContent: 'center',
     },
     fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      },
  });

export default Tasks;