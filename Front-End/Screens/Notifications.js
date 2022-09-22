import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ActivityIndicator,  } from 'react-native';
import {Card } from 'react-native-elements';
import { Avatar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable'
import apiLink from '../shared/apiLink';
import { Button } from 'react-native-elements';

const Notifications = ({route,navigation}) => {
  const userId = route.params._id
  //console.log(route)
  console.log(userId, "helloooooooooo")

  const [data, setData] = useState({
    "success":false,
    api:true,
    "notifications":[]
  })
  const [accepted, setAccepted] = useState(false)
  const [status, setStatus] = useState("")
 // console.log(route.params)
 
  const anim = {
    0: { translateY: 0 },
    0.5: { translateY: 50 },
    1: { translateY: 0 },
  }
  
  useEffect( async ()=>{
    const apiData = await fetch(`${apiLink}/getNotifications/${userId}`, {
      method:'GET',
      headers:{
        'Content-type':'application/json'
      },
    })
    const jsonData = await apiData.json()
    console.log(jsonData)
    if(jsonData.success)
    {
      setData({...data, api:false, success:true, notifications:[...jsonData.filtered.reverse()]})
    }
    else{
      setData({...data, api:false, sucess:false})
    }
  },[])

   
    // {
    //   "sucess":true,
    //   "api": true,
    //   notifications:
    //   [
      
    //     {
    //         imageUrl:'',
    //         eventName:'Tea',
    //         from:'Ali',
    //         Message:'',
    //         type:'MemberRequest'
    //   },
    //   {
    //     imageUrl:'',
    //     eventName:'LUNCH',
    //     from:'Ali',
    //     Message:'',
    //     type:'MemberRequest'
    //   },
    //   {
    //     imageUrl:'',
    //     eventName:'TEA',
    //     from:'Ali',
    //     Message:'',
    //     type:'MemberRequest'
    //   },
    //   {
    //     imageUrl:'',
    //     eventName:'TEA',
    //     from:'Ali',
    //     Message:'',
    //     type:'MemberRequest'
    //   },
    //   {
    //     imageUrl:'',
    //     eventName:'Tea',
    //     from:'Ali',
    //     Message:'',
    //     type:'MemberRequest'
    //   },
    //   {
    //     imageUrl:'',
    //     eventName:'Tea',
    //     from:'Ali',
    //     Message:'',
    //     type:'MemberRequest'
    //   },
    //   {
    //     imageUrl:'',
    //     eventName:'Tea',
    //     from:'Ali',
    //     Message:'',
    //     type:'MemberRequest'
    //   },
    //   {
    //     imageUrl:'',
    //     eventName:'Tea',
    //     from:'Ali',
    //     Message:'',
    //     type:'MemberRequest'
    //   },
  
    // ]
  
    // }



    return (
      <ScrollView style={styles.container}>
      
        {
            //  const reversedData = [...data.notifications] = data.notifications.reverse()
            //  console.log(reversedData)
         data.success == true ? data.notifications.map((element, index) => <Card key={index} containerStyle={{width: Dimensions.get('window').width-10 , borderRadius:20, alignSelf:'center', backgroundColor:'#1d2021', top:-index*12}}>
            <View style={{flexDirection:'row'}}>
            <Avatar.Image style={{width:50, height:50, flexDirection:'row', marginRight:15, left:-5, alignSelf:'center'}}
                source={
                  {uri:element.imageUrl} }  
              />
              <View style={{width:Dimensions.get('window').width-90}}>
                <Text style={{fontWeight:'bold', color:'white'}}>{element.eventName}</Text>
                 
                  {
                     element.type == "MemberRequest" ?  <>
                     <Text style={{color:'white'}}>Member Invitatation</Text>
                     <Text style={styles.Message}>{element.from} has invited you to the event</Text>
                     {
                      accepted == false ?
                      <View style={{flexDirection:'row', justifyContent:'flex-start', marginTop:8 }}> 
                     <Button buttonStyle={{ borderRadius:25, width:100}} type="solid" size={5} title={"Accept"}
                     onPress={async ()=>{
                          console.log(userId, "hel ", element.eventId)
                          const apiBody = {userId: userId, eventId:element.eventId, eventName:"" }
                          const apiData = await fetch(`${apiLink}/acceptRequest`, {
                            method:'POST',
                            headers:{
                              'Content-type':'application/json'
                            },
                            body: JSON.stringify(apiBody)
                          })
                          const jsonData = await apiData.json()
                          console.log(jsonData)
                          if(jsonData.success){
                            setAccepted(true)
                            setStatus("Accepted")
                            const apiBody = {_id:element._id, eventId:element.eventId}
                            const apiData = await fetch(`${apiLink}/removeNotification`, {
                              method:'POST',
                              headers:{
                                'Content-type':'application/json'
                              },
                              body: JSON.stringify(apiBody)
                            })
                            const result = await apiData.json()
                            if(result.success)
                            {

                            }
                            else{
                              console.log('Network error')
                            }
                          }
                          else{
                            alert("Can not accept at this moment!. Try again later")
                          }

                     }}
                     />
                     
                     <Button buttonStyle={{marginLeft:20, backgroundColor:'silver' , borderRadius:25, width:100}} type="solid" size={5} title={"Reject"} 
                      onPress={async()=>{
                        const apiBody = {userId: userId, eventId:element.eventId }
                        const apiData = await fetch(`${apiLink}/cancelRequest`, {
                          method:"POST",
                          headers:{
                            "Content-type":"application/json"
                          },
                          body: JSON.stringify(apiBody)
                        })

                        const jsonData = await apiData.json()
                        if(jsonData.success){
                          setAccepted(true)
                          setStatus("Rejected")
                          const apiBody = {_id:element._id, eventId:element.eventId}
                          const apiData = await fetch(`${apiLink}/removeNotification`, {
                            method:'POST',
                            headers:{
                              'Content-type':'application/json'
                            },
                            body: JSON.stringify(apiBody)
                          })
                          const result = await apiData.json()
                          if(result.success)
                          {

                          }
                          else{
                            console.log('Network error')
                          }
                        }
                        else{
                          alert("Can not reject at this moment!. Try again later")
                        }
                      }}
                     />
                    
                     </View> :
                     <Text style = {{fontSize:12, color:'white', fontStyle:'italic'}}>Request {status}</Text>
                     }
                     
                     </> : element.type == "GuestInvitation" ? 
                     <>
                          <Text style={{color:'white', marginTop:2}}>Guest Invitatation</Text>
                          <Text style={styles.Message}>{element.from} has invited you to the event as guest</Text>
                     </>: element.type == "task" ? 
                     <>
                          
                          <Text style = {{color:'white',marginTop:2}}>{element.from} has assigned task to {element.to}</Text>
                          <Text style={styles.Message}>{element.Message}</Text>
                     </>: 
                        <>
                          <Text style = {{color:'white',marginTop:2}}>{element.from} has added a note to the event</Text>
                          <Text style={styles.Message}>{element.Message}</Text>
                        </>
                  }
                
                </View>
                </View> 
            </Card> 
            ) : data.api == false ?
            <View style={[[styles.listEmpty]]}>
                    <Animatable.Image source={require('../assets/error.png') }
                    animation={anim}
                    easing="ease-in-out"
                    duration={3000}
                    style={{  width: 300, height: 160}}
                    iterationCount="infinite">
                   
                  </Animatable.Image>
                
                  </View> : <View style={[styles.box, styles.horizontal]}>
                  
                    <ActivityIndicator size="large" color="#0000ff" />
                  
                  </View>

          
          }
          
        
       
        {/* <Card key={"1"} containerStyle={{width: Dimensions.get('window').width , alignSelf:'center', backgroundColor:'#dce0e0', top:-12}}>
        <View style={{flexDirection:'row'}}>
        <Avatar.Image style={{width:50, height:50, flexDirection:'row', marginRight:15, left:-5, alignSelf:'center'}}
            source={
              {uri:route.params.imageUrl} }  
          />
            <View>
            <Text style={{flexDirection:'row'}}>Tea</Text>
            <Text>Ali has invited you to event</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
            <Button style={[{ marginTop: 10, marginBottom: 5, }]} type="outline" size={5} title={"Accept"}/>
            <Button style={[{ marginTop: 10, marginBottom: 5, }]} type="outline" size={5} title={"Reject"}/>
            </View>
            </View>
            </View> 
        </Card>
        <Card key={"1"} containerStyle={{width: Dimensions.get('window').width , alignSelf:'center', backgroundColor:'#dce0e0',  top:0}}>
        <View style={{flexDirection:'row'}}>
        <Avatar.Image style={{width:50, height:50, flexDirection:'row', marginRight:15, left:-5, alignSelf:'center'}}
            source={
              {uri:route.params.imageUrl} }  
          />
            <View>
            <Text style={{flexDirection:'row'}}>Tea</Text>
            <Text>Ali has invited you to event</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}> 
            <Button style={[{ marginTop: 10, marginBottom: 5, }]} type="outline" size={5} title={"Accept"}/>
            <Button style={[{ marginTop: 10, marginBottom: 5, }]} type="outline" size={5} title={"Reject"}/>
            </View>
            </View>
            </View> 
        </Card> */}
        
      </ScrollView>
    );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    top:-12,
    // alignItems: 'center', 
    // justifyContent: 'center'
  },
  card:{
  
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
  },
  listEmpty: {
    height: 500,
   alignItems: 'center',
   justifyContent: 'center',
 },
 box: {
  flex: 1,
  justifyContent: "center",
  marginTop:250
},
horizontal: {
  flexDirection: "row",
  justifyContent: "space-around",
  padding: 10,
},
Message:{
  fontStyle:'italic',
  color:'white',
  marginTop:2

}
});