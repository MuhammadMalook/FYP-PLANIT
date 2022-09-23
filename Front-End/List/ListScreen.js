import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, ActivityIndicator, View, TurboModuleRegistry } from 'react-native'
import Styles from '../common/Styles';
import Colors from '../constants/Colors';
// import MyHeader from '../components/MyHeader';
import MyHeader from '../components/MyHeader'
import { Button, List } from 'react-native-paper';
import * as Animatable from 'react-native-animatable'
import Icon, { Icons } from '../components/Icons';
import { Animations } from '../constants/Animations';
import { Image } from 'react-native-animatable';
import apiLink from '../shared/apiLink';
import {EventImages} from '../events-images/EventImages';
import { useIsFocused } from '@react-navigation/native';


const colorAr = [
    '#264653',
  '#60c5a8',
  '#CCCCCC',
  '#ff5454',
  '#039a83',
  '#dcb834',
  '#8f06e4',
  'skyblue',
  '#ff4c98',
]
// import birthday from '../assets/events-images/birthday.png'

const birthday = '../assets/events-images/birthday.png'
const bgColor = (i) => colorAr[i % colorAr.length];

const ListItem = ({ item, index, animation, navigation, admin }) => {
  
// const id = item._id;
console.log(item,"hhhhhhhh")

  return (
    <Animatable.View
      animation={animation}
      duration={1000}
      delay={index * 300}
    >
      <View style={styles.listItem}>
        <TouchableOpacity key={item}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('OneEvent',{...item,admin})}>
          {/* <View style={[styles.image, { backgroundColor: bgColor(index) }]} /> */}
          <Image source={EventImages[item.eventName.toLowerCase()]} style={[styles.image, { backgroundColor: bgColor(index) }]}></Image>
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{item.eventName}</Text>
          <Icon type={Icons.Feather} name="more-vertical" size={20} color={Colors.black} />
        </View>
      </View>
    </Animatable.View>
  )
}

export default function ListScreen({ route, navigation }) {

  const isFocused = useIsFocused()
  console.log(route.params, "helloooooooo")
  // console.log(navigation)
  const _user = route.params.name;
  const _email = route.params.email;
  const _id = route.params._id;
  const _number = route.params.number;
  const _requests = route.params.requests;
  console.log("in am called "+_email)

  const [homeScreenData, setScreen] = useState({
      userName: _user,
      email: _email,
      req: _requests,
      num: _number,
      id : _id
  })

  // const { colors } = useTheme();

  const [data, setData] = useState({
    "success": true,
    "events": [
       
    ]});

 
   async function getData()
  {
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

  if (jsonData.success){
   
      setData({
          ...data, api: false, events: [...jsonData.events],
      }); 
    }
  else {
      setData({ ...data, api: false, success : false })

  }
  setScreen({
      userName: _user,
      email: _email,
      req: _requests,
      num: _number,
      id : _id
  });


}
useEffect(() => {
  getData() 
}, [isFocused])
// useEffect(() => {
//   isloading()
// }, [data])

  const viewRef = useRef(null);
  const animation = Animations[Math.floor(Math.random() * Animations.length)]
  console.log('====================================');
  console.log(Math.floor(Math.random() * Animations.length), Math.random() * Animations.length, Animations.length);
  console.log('====================================');

  const renderItem = ({ item, index }) => (
    
    <ListItem item={item} index={index} animation={animation} navigation={navigation} admin={homeScreenData} />)

  const ListEmptyComponent = () => {
    const anim = {
      0: { translateY: 0 },
      0.5: { translateY: 50 },
      1: { translateY: 0 },
    }
    return (
      <View style={[[styles.listEmpty]]}>
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
    )
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      viewRef.current.animate({ 0: { opacity: 0.5, }, 1: { opacity: 1 } });
    })
    //  ToastAndroid.show(animation+ ' Animation', ToastAndroid.SHORT);
    return () => unsubscribe;
  }, [])

  return (
    <>
    {
       data.api && <ActivityIndicator color="#0000ff" style={{ position: "absolute", left: 0, right: 0, bottom: -20, top: 0 }} size="large" />
    }
  
    <View style={[Styles.container]}>
      <Animatable.View
        ref={viewRef}
        easing={'ease-in-out'}
        duration={500}
        style={Styles.container}>
        <FlatList
          data={data.events.map(item=>item).fill(0, NaN, NaN) }
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

const styles = StyleSheet.create({
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  },
  listEmpty: {
     height: Dimensions.get('window').height/2-16,
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
    borderRadius: 10,
    borderRadius: 10,
    shadowColor:'silver',
    shadowOpacity:0.8,
    shadowOffset:{width:-5, height:8}
  },
  image: {
    height: 250,
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
})
