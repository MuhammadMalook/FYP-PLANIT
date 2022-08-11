// import "react-native-gesture-handler";
import * as Device from 'expo-device';
import { registerRootComponent } from "expo";
import { View } from "react-native-animatable";
import { ActivityIndicator } from "react-native-paper";
import { Platform } from "react-native";
import { StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DrawerComponent from "./screens/DrawerHome";
import { createStackNavigator } from "@react-navigation/stack";

// import Navigator from './routes/NewDrawer';
import LoginScreen from "./Screens/Login";
import {React, useState, useEffect,useReducer, useMemo, useRef} from "react";
import {Text} from 'react-native'
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

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from './navigatorRoot';
import EditProfile from "./Screens/EditProfile";
import EditProfileScreen from "./Screens/EditProfileScreen.js";
import OneEvent from "./Screens/OneEvent";
import Tasks from "./Screens/Tasks";
import CreateTask from "./Screens/createTasks";
import EventTeam from "./Screens/EventTeam";
import NotesEvent from "./Screens/NotesEvent";
import CreateNote from "./Screens/createNote";
import SendRequest from "./Screens/SendRequest";
import EventGuest from './Screens/EventGuest';
import InviteGuest from './Screens/InviteGuest'


    
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f",
    padding: Platform.OS === "android" ? 20 : 0
  }
})




const Stack = createStackNavigator()
// Stack.Navigator.defaultProps = {
//   headerMode: 'none',
// };
export default function App() {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

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
  registerForPushNotification().then(token=>setExpoPushToken(token));

  notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    setNotification(notification);
  });

  // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    console.log(response);
  });



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

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);


 
  async function registerForPushNotification(){
    // const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    // if (status != 'granted') {
    //   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    //   // finalStatus = status;
    // }
    // if (status !== 'granted') {
    //   alert('Failed to get push token for push notification!');
    //   return;
    // }
    // token = (await Notifications.getExpoPushTokenAsync()).data;
    // return token
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token,"hhhh");
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }

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
       
          <AllScreens data={loginState.userData}/>
        
      )
    :expoPushToken ?
      <RootStackScreen data={expoPushToken}/> : <Text></Text>
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


   export const AllScreens = (props)=>(
            
          <Stack.Navigator  initialRouteName="MainTab">
            <Stack.Screen name="MainTab" component={MainTabScreen} initialParams={props} options={{headerShown: false}}/> 
            <Stack.Screen name="EditProfile" component={EditProfileScreen}/>
            <Stack.Screen name="OneEvent" component = {OneEvent}/>
            <Stack.Screen name="eventTasks" component={Tasks}/>
            <Stack.Screen name="createTask" component={CreateTask}/>
            <Stack.Screen name="eventTeam" component={EventTeam}/>
            <Stack.Screen name="eventNotes" component={NotesEvent}/>
            <Stack.Screen name="newNote" component={CreateNote}/>
            <Stack.Screen name="sendRequest" component={SendRequest}/>
            <Stack.Screen name="eventGuest" component={EventGuest}/>
            <Stack.Screen name = "inviteGuest" component={InviteGuest}/>



 
            {/* <Stack.Screen name="All Members of Event" component={EventTeam} /> */}
            {/* <Stack.Screen name="Create Event" component={CreateEvent} />
            <Stack.Screen name="Home" component={MyEvents} />
            <Stack.Screen name="Requests" component={MyRequests} />
            <Stack.Screen name="Events" component={DisplayAllEvents} />
            <Stack.Screen name="My Events" component={MyEvents} />
            <Stack.Screen name="My Tasks" component={Tasks} />
            <Stack.Screen name="Logout" component={LoginScreen} />
            <Stack.Screen name="Sign In" component={SignInScreen} />
            <Stack.Screen name="Create New Note" component={CreateNote} />
            <Stack.Screen name="Create New Task" component={CreateTask} />
            <Stack.Screen name="Notes Of Event" component={NotesEvent} /> */}
          </Stack.Navigator>

    )

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