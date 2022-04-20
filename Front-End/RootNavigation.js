import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './Screens/Login';
import SignInScreen from './Screens/Sign';
import NewAccount from './Screens/NewAccount';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator initialRouteName='Welcome'>
         <RootStack.Screen name='Welcome' component={LoginScreen} />
         <RootStack.Screen name='Login' component={SignInScreen}/>
         <RootStack.Screen name='NewAccount' component={NewAccount}/>  
    </RootStack.Navigator>

);

export default RootStackScreen;