// import "react-native-gesture-handler";

import { registerRootComponent } from "expo";
import { View } from "react-native-animatable";
import { ActivityIndicator } from "react-native-paper";
import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DrawerComponent from "./screens/DrawerHome";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import Navigator from './routes/NewDrawer';
import LoginScreen from "./Screens/Login";
import {React, useState, useEffect,useReducer, useMemo } from "react";
// import NavContainer from "./routes/NewDrawer";
import SignInScreen from "./Screens/Sign";
import NewAccount from "./Screens/NewAccount";
import HomeScreen from "./Screens/HomeScreen";
import { AuthContext } from './components/Context';
import RootStackScreen from "./RootNavigation";
import DrawerScreen from "./Screens/DrawerScreens";
import MainTabScreen from "./Screens/MainTabScreen";
// import { navigationRef } from './RootNavigation';
// import * as RootNavigation from './RootNavigation'



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f",
    padding: Platform.OS === "android" ? 20 : 0
  }
})




const Stack = createStackNavigator()
export default function App() {

  const initialLoginState = {
    isLoading: true,
    // userName: null,
    userData:{},
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          userData: action.data,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userToken: action.token,
          userData: action.data,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          //userName: null,
          userToken: null,
          userData: {},
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          //userName: action.id,
          userToken: action.token,
          userData: action.data,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState)

  const authContext = useMemo(() => ({
    signIn: async(userToken, userData) => {
    
      // const userToken = String(foundUser[0].userToken);
      // const userName = foundUser[0].username;
      
      try {
        console.log(userToken + " "+ userData)
        await AsyncStorage.setItem('token', userToken);
        await AsyncStorage.setItem('user', userData);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', token: userToken, data: JSON.parse(userData) });
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    // toggleTheme: () => {
    //   setIsDarkTheme( isDarkTheme => !isDarkTheme );
    // }
  }), []);


useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
    // await AsyncStorage.clear();
      let userToken, userdata;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('token');
        userdata = await AsyncStorage.getItem('user');
       console.log(userdata + " in useEffect")
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken, data: JSON.parse(userdata)});
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }
  return(
    
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      { loginState.userToken !== null ? (
       
          <MainTabScreen data={loginState.userData}/>
        
      )
    :
      <RootStackScreen/>
    }
    </NavigationContainer>
    </AuthContext.Provider>
  )
// if(Token === null){
//   return (
//     <NavigationContainer>
//     <stack.Navigator initialRouteName='Welcome'>
//         <stack.Screen name='Welcome' component={LoginScreen} />
//         <stack.Screen name='Login' component={SignInScreen}/>
//         <stack.Screen name='NewAccount' component={NewAccount}/>  
//     </stack.Navigator>
//   </NavigationContainer>
//   )
// }
// else if( loginState.isLoading ) {
//   return(
//     <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//       <ActivityIndicator size="large"/>
//     </View>
//   );
// }
// else{
//   return(
//     // RootNavigation.navigate('Login')
//     <NavigationContainer>
//     <stack.Navigator initialRouteName='Home'>
//         <stack.Screen name='Home' component={Home}>
       
//         </stack.Screen>
//     </stack.Navigator>
//   </NavigationContainer>
//   )
}
//{props => <HomeScreen {...props} extraData={{name:"malook"}} />}
    // <Navigator/>

    // <NavigationContainer>
    //   <Drawer.Navigator >
    //     <Drawer.Screen name="Send Request" component={SendRequest} />
    //     <Drawer.Screen name="All Members of Event" component={EventTeam} />
    //     <Drawer.Screen name="Create Event" component={CreateEvent} />
    //     <Drawer.Screen name="Home" component={MyEvents} />
    //     <Drawer.Screen name="Requests" component={MyRequests} />
    //     <Drawer.Screen name="Events" component={DisplayAllEvents} />
    //     <Drawer.Screen name="My Events" component={MyEvents} />
    //     <Drawer.Screen name="My Tasks" component={Tasks} />
    //     <Drawer.Screen name="Logout" component={LoginScreen} />
    //     <Drawer.Screen name="Sign In" component={SignInScreen} />
    //     <Drawer.Screen name="Create New Note" component={CreateNote} />
    //     <Drawer.Screen name="Create New Task" component={CreateTask} />
    //     <Drawer.Screen name="Notes Of Event" component={NotesEvent} />




    //   </Drawer.Navigator>
    // </NavigationContainer>


    // <View>
    // {/* <SignScreen/> */}
    //   {/* <LoginScreen></LoginScreen> */}
    //   {/* <NewAccount/> */}
    // </View>


  //)


// import * as RootNavigation from './RootNavigation.js';


// // RootNavigation.navigate('ChatScreen', { userName: 'Lucy' });
// const GotoLogin = ({navigation,route})=>{
//   console.log(RootNavigation)
//     RootNavigation.navigate('Login')

// }



// import { StatusBar } from 'expo-status-bar';
// import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
// import LoginScreen from './Screens/Login';

// export default function App() {
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* <Text style={styles.txt}>Open up App.js to start working on your app!</Text> */}
//       <LoginScreen/>
      
//       <StatusBar style="auto" />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex:1,
//     backgroundColor: 'gold',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   txt:{
//     color:'blue',
//   }
// });

registerRootComponent(App);