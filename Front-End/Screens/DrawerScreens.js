import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
// import { AuthContext } from '../components/context';
import MainTabScreen from "./MainTabScreen";
import { DrawerContent } from "@react-navigation/drawer";


const DrawerScreen = ({navigation, route}) =>{
    return(   
        <MainTabScreen/>
    )
}
export default DrawerScreen;