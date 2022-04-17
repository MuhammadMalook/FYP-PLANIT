// import "react-native-gesture-handler";


import { Platform } from "react-native";
import { StyleSheet } from "react-native";
// import DrawerComponent from "./screens/DrawerHome";


// import Navigator from './routes/NewDrawer';


import React from "react";
import NavContainer from "./routes/NewDrawer";




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f",
    padding: Platform.OS === "android" ? 20 : 0
  }
})

export default function App() {

  // const isLoadingComplete = useLoadedAssets();
  // const colorScheme = useColorScheme();

  // if (!isLoadingComplete) {
  //   return null;
  // } else {
  //   return (
  //     <SafeAreaProvider>
  //       <Navigation colorScheme={colorScheme} />
  //       <StatusBar />
  //     </SafeAreaProvider>
  //   );
  // }



  return (
    <NavContainer/>
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


  )

}



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
