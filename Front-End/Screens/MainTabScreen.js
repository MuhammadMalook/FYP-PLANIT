import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import { AuthContext } from '../components/Context';
import LoginScreen from './Login';




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

const MainTabScreen = (props) =>{
  
  const { signOut } = React.useContext(AuthContext);
  return(
    <Tab.Navigator initialRouteName='Home'
    screenOptions={{
      tabBarShowLabel:false,
      tabBarStyle:{
        position:'absolute',
        bottom:15,
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
                  width:30, height:30, tintColor:focused ? '#e32f45' : '#748c4'
                }}/>
                  <Text style={{color:focused? "#e32f45" : "#748c4" , fontSize:10}}>Home</Text>
            </View>
          ),
        }} initialParams={props.data}
      />

       <Tab.Screen
        name="Events"
        component={DetailsScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{alignItems:'center',justifyContent:'center',}}>
                <Image source={require('../assets/events.png')} resizeMode="contain" style={{ 
                  width:30, height:30, tintColor:focused ? '#e32f45' : '#748c4'
                }}/>
                  <Text style={{color:focused? "#e32f45" : "#748c4" , fontSize:10}}>Events</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Create"
        component={DetailsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
                <Image source={require('../assets/plus.png')} resizeMode="contain" style={{ 
                  width:50, height:50, tintColor:focused ? '#e32f45' : '#748c4'
                }}/>
                
          ),
          tabBarButton: (props) =>(
            <CustomTabBarButton {...props}/>
          )
        }}
      />
      
      <Tab.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{alignItems:'center',justifyContent:'center',}}>
                <Image source={require('../assets/notification.png')} resizeMode="contain" style={{ 
                  width:30, height:30, tintColor:focused ? '#e32f45' : '#748c4'
                }}/>
                  <Text style={{color:focused? "#e32f45" : "#748c4" , fontSize:10}}>notifications</Text>
            </View>
          ),
        }}
      />
       <Tab.Screen
        name="Profile"
        component={HomeScreen}
        options={{
          
          tabBarIcon: ({ focused }) => (
            <View style={{alignItems:'center',justifyContent:'center',}}>
            <Image source={require('../assets/profile.png')} resizeMode="contain" style={{ 
              width:30, height:30, tintColor:focused ? '#e32f45' : '#748c4'
            }}/>
              <Text style={{color:focused? "#e32f45" : "#748c4" , fontSize:10}}>Profile</Text>
        </View>
          ),
          // tabBarButton: (props) =>(
          //   <LogoutAccount {...props}/>
          // )
          tabBarButton: props => (
            <TouchableOpacity {...props} onPress={() => signOut()} />
          ),
        }}
      />
    </Tab.Navigator>
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
// const HomeStackScreen = ({navigation}) => (
// <Tab.Navigator >
//         <Tab.Screen name="Home" component={HomeScreen} options={{
//         headerLeft: () => (
//             <Icon.Button name="ios-menu" size={25} backgroundColor="#009387"></Icon.Button>
//         )
//         }} initialParams={{name:"malook"}}/>
// </Tab.Navigator>
// );

// const DetailsStackScreen = ({navigation}) => (
// <Tab.Navigator>
//         <Tab.Screen name="Details" component={DetailsScreen} options={{
//         headerLeft: () => (
//             <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" ></Icon.Button>
//         )
//         }} />
// </Tab.Navigator>
// );

