import React, { useState , useRef, useEffect} from "react"
import { View,Dimensions, FlatList, StyleSheet, ScrollView, ActivityIndicator,TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';

import Styles from '../common/Styles';
import Colors from '../constants/Colors';

import { Card, ThemeProvider, Button } from 'react-native-elements'

import { Text } from "../components/Themed"
import apiLink from "../shared/apiLink";
// import Icon, { Icons } from '../components/Icons';
// import { Icon } from "react-native-vector-icons/FontAwesome";
// import { Icon } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Animations } from '../constants/Animations';
import MyHeader from '../components/MyHeader'
import * as Animatable from 'react-native-animatable'
import { color } from "react-native-reanimated";

// import NavContainer from "../routes/NewDrawer";



// const colorAr = [
//    // '#637aff',
//    '#05668d',
//    //'#4d5e80',
//     //'#60c5a8',
//     // '#CCCCCC',
//     //'#ff5454',
//     //'#039a83',
//    // '#dcb834',
//     //'#8f06e4',
//     // 'skyblue',
//      //'#ff4c98',
//   ]
//   const cardColorAr=[
//     Colors.
//     //'#60c5a8',
//     //'#ff5454',

//     // '#616247FF',
//     //  'skyblue',
//     //  '#ff4c98',
//      //'#8f06e4',
// ]
  const bgColor = (i) => colorAr[i % colorAr.length];
  const bgColorCard = (i) => cardColorAr[i % cardColorAr.length];
  
  const ListItem = ({ item, index, animation, navigation, admin, events }) => {

    console.log(events[1], "hello", index)
    return (  
      <>
       <Animatable.View 
        animation={animation}
        duration={1000}
        delay={index * 300}
      >
        <View style={styles.listItem}>
          <TouchableOpacity key={events[index]}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('OneEvent',{...events[index],admin})}>
             <View style={[styles.image, { backgroundColor: Colors.cardsColor,  padding:10, bottom:3}]}>
               <View  style={{flexDirection:'row', justifyContent:'space-between', top:10}}><Text style={styles.innerText}>Planner </Text><Text style={styles.smallText}>{item[2]}</Text></View>
               <View  style={{flexDirection:'row', justifyContent:'space-between', top:10}}><Text style={styles.innerText}>Guests </Text><Text style={styles.smallText}>{item[3]}</Text></View>
               <View  style={{flexDirection:'row', justifyContent:'space-between', top:10}}><Text style={styles.innerText}>Notes </Text><Text style={styles.smallText}>{item[4]}</Text></View>
               <View  style={{flexDirection:'row', justifyContent:'space-between', top:10}}><Text style={styles.innerText}>Tasks</Text><Text style={styles.smallText}>{item[5]}</Text></View>
               <View  style={{flexDirection:'row', justifyContent:'space-between', top:10}}><Text style={styles.innerText}>Team Members </Text><Text style={styles.smallText}>{item[6]}</Text></View>
               <View  style={{flexDirection:'row', justifyContent:'space-between', top:10}}><Text style={styles.innerText}>Event Status </Text><Text style={styles.smallText}>{item[8]? "Completed" : "In Progess"}</Text></View>
               
               {/* <Text style={{fontSize:16}}>Guests </Text><Text style={{display:'flex', justifyContent:'flex-end', position:'relative', bottom:20 }}>{item[3]}</Text>
               <Text style={{fontSize:16}}>Notes </Text><Text style={{display:'flex', justifyContent:'flex-end', position:'relative', bottom:20 }}>{item[4]}</Text>
               <Text style={{fontSize:16}}>Tasks </Text><Text style={{display:'flex', justifyContent:'flex-end', position:'relative', bottom:20 }}>{item[5]}</Text>
               <Text style={{fontSize:16}}>Team Members </Text><Text style={{display:'flex', justifyContent:'flex-end', position:'relative', bottom:20 }}>{item[5]}</Text>
               <Text style={{fontSize:16}}>Event status </Text><Text style={{display:'flex', justifyContent:'flex-end', position:'relative', bottom:20 }}>{item[8]? "Completed" : "In Progess"}</Text> */}
             </View>
           
          </TouchableOpacity>
          <View style={styles.detailsContainer}>
            <Text style={styles.name}>{item[0]}</Text>
            
            {/* <Icon type={Icons.Feather} name="more-vertical" size={20} color={Colors.black} /> */}
            {item[8] ?  <Button title='' buttonStyle={{backgroundColor:'green'}} type="solid" icon={ <Icon name="check-circle" size={15}   color="white"/>}
            ></Button> : <Button
            buttonStyle={{backgroundColor:'rgba(199, 43, 98, 1)', borderRadius:5,borderColor:'white'}}  titleStyle={{
              color: 'white',

            }} title='Complete' type="outline" style={{fontSize:12}}></Button>}
          </View>
        </View>
      </Animatable.View>
      </>  
      
    )
  }




const HomeScreen = ({navigation, route}) => {


    
    // // const navigation = navigation;
    // console.log(route.params, "helloooooooo")
    // // console.log(navigation)
    // const _user = route.params.name;
    // const _email = route.params.email;
    // const _id = route.params._id;
    // const _number = route.params.number;
    // const _requests = route.params.requests;
    // console.log("in am called "+_email)


    // const [homeScreenData, setScreen] = useState({
    //     userName: _user,
    //     email: _email,
    //     req: _requests,
    //     num: _number
    // })
    // const { colors } = useTheme();
    // const [data, setData] = useState({
    //     "success": true,
    //     "events": [

    //     ]
    // });

    // useState(async () => {
    //     setData({
    //         ...data, api: true
    //     });

    //     const apiBody = { id: _id };
    //     const apiData = await fetch(`${apiLink}/getEventByUser`, {
    //         method: 'POST', // or 'PUT'
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(apiBody),
    //     });
    //     const jsonData = await apiData.json();
    //      console.log(jsonData + "json");
    //     if (jsonData.success)
    //         setData({
    //             ...data, api: false, events: [...jsonData.events]
    //         });
    //     else {
    //         setData({ ...data, api: false, success : false })

    //     }

    //     setScreen({
    //         userName: _user,
    //         email: _email,
    //         req: _requests,
    //         num: _number
    //     });


    // }, [])
    // return (
    //     <ScrollView>
            
    //         {
    //             data.api && <ActivityIndicator color="#0000ff" style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", top: 0 }} size="large" />
    //         }
    //         {/* <NavContainer/> */}
    //         <Card style={[{ backgroundColor: colors.card }]}>

    //             <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text, marginBottom: 10 }]}>

    //                 Hi {homeScreenData.userName} ,
    //                 You Have  {homeScreenData.req} Requests
    //             </Text>
    //             <View>
    //                 <Button onPress={() => {
    //                     navigate('myRequests', { user: _user, email: _email, number: _number, id: _id })
    //                 }} title={"View Requests"}>

    //                 </Button>
    //             </View>
    //         </Card>
    //         <Card style={[{ backgroundColor: colors.card, marginTop: 5 }]}>
    //             <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text, marginBottom: 10 }]}>

    //                 Why Are You Waiting ! Just Create New Event
    //             </Text>
    //             <View>
    //                 <Button onPress={() => {
    //                     navigate('createEvent', { user: _user, email: _email, number: _number, id: _id })
    //                 }} title={"Create Event"}>

    //                 </Button>
    //             </View>
    //         </Card>

    //         {
    //             data.success == true ? data.events.map((eventItem, i) => <Card key={i}>
    //                 <Card.Title style={[{ backgroundColor: colors.card, fontSize: 18 }]}>{eventItem.eventName}</Card.Title>
    //                 <Card.Divider />
    //                 <View key={i} style={[{ backgroundColor: colors.border, borderRadius: 5, padding: 5, color: colors.text }]}>

    //                     <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

    //                         <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
    //                             Planner
    //                         </Text>

    //                         <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
    //                             {eventItem.eventDesc}
    //                         </Text>
    //                     </View>


    //                     <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

    //                         <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
    //                             Planner
    //                         </Text>

    //                         <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
    //                             {eventItem.userName}
    //                         </Text>


    //                     </View>


    //                     <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

    //                         <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
    //                             Team Members
    //                         </Text>
    //                         <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
    //                             {eventItem.team.length}
    //                         </Text>
    //                     </View>
    //                     <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

    //                         <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
    //                             Tasks Assigned
    //                         </Text>
    //                         <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
    //                             {eventItem.tasks.length}
    //                         </Text>
    //                     </View>
    //                     <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

    //                         <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
    //                             Notes
    //                         </Text>
    //                         <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
    //                             {eventItem.notes.length}
    //                         </Text>
    //                     </View>
    //                     <View style={[{ marginTop: 5, flexDirection: "row", justifyContent: "space-between" }]}>

    //                         <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
    //                             Status
    //                         </Text>
    //                         <Text style={[{ textAlign: "center", fontSize: 13, fontWeight: "bold", color: colors.text }]}>
    //                             {eventItem.eventStatus ? "Completed" : "In Progess"}
    //                         </Text>
    //                     </View>
    //                     <View style={[{ margin: 10 }]}>

    //                         <Button onPress={() => {
    //                             navigate('OneEvent', { user: _user, email: _email, number: _number, id: _id, eventId: eventItem._id, eventName: eventItem.eventName, eventAdmin: eventItem.userId })
    //                         }} style={[{ marginTop: 10, marginBottom: 5, width: 50 }]} type="outline" size={3} title={"View"}>
    //                         </Button>

    //                     </View>

    //                 </View>
    //             </Card>
    //             ) : <Card style={[{ backgroundColor: colors.card }]}>

    //                 <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text, marginBottom: 10 }]}>
    //                     No Events
    //                 </Text>

    //             </Card>
    //         }
    //     </ScrollView>

    // )

     // const navigation = navigation;
   
    // console.log(navigation)
    const _user = route.params.name;
    const _email = route.params.email;
    const _id = route.params._id;
    const _number = route.params.number;
    const _requests = route.params.requests;
    console.log("in am called "+_email)

    const [eventStats, setEventStats] = useState({"totalEvents":0, "myEvents":0, "completed":0, "tasksAssigned":0,"pendingEvents":0, "totalNotes":0, "requests":0})

    const [homeScreenData, setScreen] = useState({
        userName: _user,
        email: _email,
        req: _requests,
        num: _number
    })

    const { colors } = useTheme();

    const [data, setData] = useState({
        "success": true,
        "events": [
        ]});
   
  
 
        
  async function getData()
  {
    
  const apiBody = { id: route.params._id };
  const apiData = await fetch(`${apiLink}/getEventsInfo`, {
      method: 'POST', // or 'PUT'
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiBody),
  });
  const jsonData = await apiData.json();
   console.log(jsonData.obj, "json");

  if (jsonData.success){
    
      setEventStats(
          jsonData.obj,
      ); 
    }
  else {
      setEventStats({ ...eventStats, success : false })

  }

}

useEffect(() => {
  getData() 
}, [])

    
    useState(async () => {
        setData({
            ...data, api: true
        });

        const apiBody = { id: _id };
        const apiData = await fetch(`${apiLink}/getEventByUser`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiBody),
        });
        const jsonData = await apiData.json();
         console.log(jsonData + "json");
        if (jsonData.success)
            setData({
                ...data, api: false, events: [...jsonData.events]
            });
        else {
            setData({ ...data, api: false, success : false })

        }

        setScreen({
            userName: _user,
            email: _email,
            req: _requests,
            num: _number
        });


    }, [])    
    
      const viewRef = useRef(null);
      const animation = Animations[Math.floor(Math.random() * Animations.length)]
      console.log('====================================');
      console.log(Math.floor(Math.random() * Animations.length), Math.random() * Animations.length, Animations.length);
      console.log('====================================');
    
      const renderItem = (props) => (
        // console.log(props)
         <ListItem item={props.item} index={props.index} animation={animation} navigation={navigation} admin={homeScreenData} events={data.events} />
        )
    
      const ListEmptyComponent = () => {
        const anim = {
          0: { translateY: 0 },
          0.5: { translateY: 50 },
          1: { translateY: 0 },
        }
        return (
         <>
    
          <View style={[styles.listEmpty]}>
            <Animatable.Image source={require('../assets/error.png') }
          animation={anim}
          easing="ease-in-out"
          duration={3000}
          style={{  width: 300, height: 160}}
          iterationCount="infinite">
         
        </Animatable.Image>
        {/* <Animatable.Text style={{color:'red', fontSize:24, fontFamily:'sans-serif', marginLeft:20}} animation={anim}
          easing="ease-in-out"
          duration={3000} 
          iterationCount="infinite"
          >
           No Events Found
        </Animatable.Text> */}
          </View>
         </> 
        )
      }

      const iterateThrough =["requests","pendingEvents","tasksAssigned","totalNotes"]
      let counter =0;

      const ListCards = ({ item, index, animation, navigation }) => {
        return (
          <Animatable.View
            animation={animation}
            duration={1000}
            delay={index * 300}
          >
            <View style={styles.cardItem}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Screen')}>
                <View style={[styles.cardimage, { backgroundColor: Colors.primary}]} >
                    <Text style={styles.cardText}>{item}</Text>
                    <Text style={styles.numText}>{eventStats[iterateThrough[counter++]]}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.detailsContainer}>
               
                
              </View>
            </View>
          </Animatable.View>
        )
      }


      const renderCards = ({ item, index }) => (
        <ListCards item={item} index={index} animation={animation} navigation={navigation} />)
    
      const CardEmptyComponent = () => {
        const anim = {
          0: { translateY: 0 },
          0.5: { translateY: 50 },
          1: { translateY: 0 },
        }
        return (
         
          <View style={[styles.listEmpty]}>
            <Animatable.Text
              animation={anim}
              easing="ease-in-out"
              duration={3000}
              style={{ fontSize: 24 }}
              iterationCount="infinite">
              Empty List!
            </Animatable.Text>
          </View>
        )
      }



      useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          viewRef.current.animate({ 0: { opacity: 0.5, }, 1: { opacity: 1 } });
        })
        // ToastAndroid.show(animation+ ' Animation', ToastAndroid.SHORT);
        return () => unsubscribe;
      }, [navigation])
    
      return (
      <>
        {
                data.api && <ActivityIndicator color="#0000ff" style={{ position: "absolute", left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", top: 0 }} size="large" />
        }
        
      <View style={[Styles.dashborad]}>
        <Animatable.View
        ref={viewRef}
        easing={'ease-in-out'}
        duration={500}
        style={Styles.container}>
        <FlatList
          data={["Requests", "Pending Events","Tasks Assigned", "Notes"]}
          keyExtractor={(_, i) => String(i)}
          numColumns={2}
          renderItem={renderCards}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={!data.api? CardEmptyComponent:""}
        />
      </Animatable.View>
      </View>
      <View  style={Styles.container}>
            {/* <Card style={[{ backgroundColor: colors.card }]}>

                <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text, marginBottom: 10 }]}>

                    Hi {homeScreenData.userName} ,
                    You Have  {homeScreenData.req.length} Requests
                </Text>
                <View>
                    <Button buttonStyle={{backgroundColor:'#00203FFF', borderRadius:10}}  onPress={() => {
                        // navigate('myRequests', { user: _user, email: _email, number: _number, id: _id })
                    }} title={"View Requests"}>

                    </Button>
                </View>
            </Card>
            <Card style={[{ backgroundColor: colors.card, marginTop: 5 }]}>
                <Text style={[{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: colors.text, marginBottom: 10 }]}>

                    Why Are You Waiting ! Just Create New Event
                </Text>
                <View>
                    <Button buttonStyle={{backgroundColor:'#00203FFF', borderRadius:10}} onPress={() => {
                        // navigate('createEvent', { user: _user, email: _email, number: _number, id: _id })
                    }} title={"Create Event"}>

                    </Button>
                </View>
            </Card> */}

          <Animatable.View
            ref={viewRef}
            easing={'ease-in-out'}
            duration={500}
            style={Styles.container}>
              
            <FlatList
              data={data.events.map((item)=>[item.eventName, item.eventDesc, item.userName, item.guestList.length, item.notes.length, 
              item.tasks.length, item.team.length, item.userId,  item.eventStatus])}
              keyExtractor={(_, i) => String(i)}
              numColumns={1}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 130 }}
              ListEmptyComponent={!data.api? ListEmptyComponent : ""}
            />
          </Animatable.View>
        </View>
        </>
      )


}
export default HomeScreen;
const styles = StyleSheet.create({
  innerText:{
    fontSize:18, fontWeight:'bold', color:'white'
  },
  smallText:{
    fontSize:18,color:'white'
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
    },




    name: {
        fontWeight: 'bold',
        fontSize: 18,
        color: 'black',
      },
      separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'rgba(0, 0, 0, .08)',
      },
      listEmpty: {
        height: Dimensions.get('window').height/4-20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      listItem: {
        height: 300,
        width:'auto',
         //width: Dimensions.get('window').width / 2 - 16,
        //width:'auto',
        backgroundColor: 'white',
        margin: 8,
        // borderRadius: 10,
        // borderRadius: 10,
        // shadowColor:'silver',
        // shadowOpacity:0.8,
        // shadowOffset:{width:-5, height:8}
      },
      image: {
        height: 230,
        width:'auto',
        margin: 5,
        borderRadius: 10,
        backgroundColor: Colors.primary,
      },
      detailsContainer: {
        paddingHorizontal: 16,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },


      cardItem: {
        
        height: 100,
        //width:'auto',
         width: Dimensions.get('window').width / 2 - 16,
        //width:'auto',
       
        margin: 8,
        
        // borderRadius: 10,
        // borderRadius: 10,
        // shadowColor:'silver',
        // shadowOpacity:0.8,
        // shadowOffset:{width:-5, height:8}
      },
      cardimage: {
        height: 100,
        padding:8,
        width:'auto',
        margin: 5,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        justifyContent:'flex-start',
   
       
        
      },

      cardText: {
        fontWeight: 'bold',
      
        fontSize: 18,
        color: 'white',
        alignSelf:'center'
      },
      numText: {
        fontWeight: 'bold',
      
        fontSize: 18,
        color: Colors.primaryTextColor,
        alignSelf:'center',
        textAlignVertical:'center',
        marginTop:10
      },
});