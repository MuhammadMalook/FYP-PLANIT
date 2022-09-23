import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';


import LoginScreen from './Login';
import MyEvents from './MyEvents'
import ListScreen from '../List/ListScreen';
import Profile from './Profile';
import { useTheme } from 'react-native-paper';
import * as RootNavigation from '../navigatorRoot';
import Notifications from './Notifications';
import CreateEvent from './CreateEvents';





const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) =>(
  <TouchableOpacity style={{top:-30, justifyContent: 'center', alignItems:'center', ...style.ShadowRoot}}
  onPress={onPress}
  > 
  <View style={{width:70, height: 70, borderRadius:35 , backgroundColor: 'e32f45'}}>{children}</View>
  </TouchableOpacity>
)


// const LogoutAccount = ({children, onPress}) =>(
//   <TouchableOpacity style={{top:-30, justifyContent: 'center', alignItems:'center', ...style.ShadowRoot}}
//   onPress={onPress}
//   > 
//   <View style={{width:70, height: 70, borderRadius:35 , backgroundColor: 'e32f45'}}>{children}</View>
//   </TouchableOpacity>
// )
// const onPress = () =>{
  
// }

const MainTabScreen = ({navigation,route}) =>{
  console.log(route)
  const {colors} = useTheme();
  
  
  return(
    <>
    <Tab.Navigator initialRouteName='Home'
    screenOptions={{
      tabBarShowLabel:false,
      tabBarStyle:{
        position:'absolute',
        bottom:5,
        left:10,
        right:10,
        elevation:0,
        backgroundColor:'#ffffff',
        borderRadius:15,
        height:90,
       ...style.ShadowRoot
      }
    }}
      >
         <Tab.Screen
        name="Home"
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{alignItems:'center',justifyContent:'center',}}>
                <Image source={require('../assets/home.png')} resizeMode="contain" style={{ 
                  width:30, height:30, tintColor:focused ? '#e32f45' : 'black'
                }}/>
                  <Text style={{color:focused? "#e32f45" : "black" , fontSize:10}}>Home</Text>
            </View>
          ),
        }} initialParams={route.params.data}
      />

       <Tab.Screen
        name="Events"
        component={ListScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{alignItems:'center',justifyContent:'center',}}>
                <Image source={require('../assets/events.png')} resizeMode="contain" style={{ 
                  width:30, height:30, tintColor:focused ? '#e32f45' : 'black'
                }}/>
                  <Text style={{color:focused? "#e32f45" : "black" , fontSize:10}}>Events</Text>
            </View>
          ),
        }} initialParams={route.params.data}
      />
      <Tab.Screen 
        name="Create"
        component={CreateEvent}
        
        options={{ tabBarHideOnKeyboard:true,
          tabBarIcon: ({ focused }) => (
                <Image source={require('../assets/plus.png')} resizeMode="contain" style={{ 
                  width:50, height:50, tintColor:focused ? '#e32f45' : '#21bf60'
                }}/>
                
          ),
          tabBarButton: (route) =>(
            <CustomTabBarButton {...route}/>
          )
        }} initialParams={route.params.data}
      />
      
      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{alignItems:'center',justifyContent:'center',}}>
                <Image source={require('../assets/notification.png')} resizeMode="contain" style={{ 
                  width:30, height:30, tintColor:focused ? '#e32f45' : 'black'
                }}/>
                  <Text style={{color:focused? "#e32f45" : "black" , fontSize:10}}>notifications</Text>
            </View>
          ),
          // headerRight: () => (
          //   <View style={{marginRight: 10}}>
          //     <MaterialCommunityIcons.Button
          //       name="account-edit"
          //       size={25}
          //       backgroundColor={colors.background}
          //       color={colors.text}
          //       // onPress={() => RootNavigation.navigate('Root', { screen: 'EditProfile' })}
          //     />
          //   </View>)
          // tabBarButton: (route) =>(
          //   <LogoutAccount {...route}/>
          // // )
          // tabBarButton: route => (
          //   <TouchableOpacity {...route} onPress={() => signOut()} />
          // ),
        }}
        initialParams={route.params.data}
    />
       <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          
          tabBarIcon: ({ focused }) => (
            <View style={{alignItems:'center',justifyContent:'center',}}>
            <Image source={require('../assets/profile.png')} resizeMode="contain" style={{ 
              width:30, height:30, tintColor:focused ? '#e32f45' : 'black'
            }}/>
              <Text style={{color:focused? "#e32f45" : "black" , fontSize:10}}>Profile</Text>
        </View>
          ),
          // headerRight: () => (
          //   <View style={{marginRight: 10}}>
          //     <MaterialCommunityIcons.Button
          //       name="account-edit"
          //       size={25}
          //       backgroundColor={colors.background}
          //       color={colors.text}
          //       // onPress={() => RootNavigation.navigate('Root', { screen: 'EditProfile' })}
          //     />
          //   </View>)
          // tabBarButton: (route) =>(
          //   <LogoutAccount {...route}/>
          // // )
          // tabBarButton: route => (
          //   <TouchableOpacity {...route} onPress={() => signOut()} />
          // ),
        }} initialParams={route.params.data}
      />
    </Tab.Navigator>
   
     
    </>
    
  )
}

export default MainTabScreen;


const style = StyleSheet.create({
  ShadowRoot:{
    shadowColor:"#7F5DF0",
    shadowOffset:{
      width:0,
      height:10,
    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:5
  }
})

