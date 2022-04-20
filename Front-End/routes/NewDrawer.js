import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import EventStack from './EventStack';
import WelcomeStack from './WelcomeStack';
import { shadow } from 'react-native-paper';


const RootDrawerNavigator = createDrawerNavigator(
    {
        Logout: {
            screen: WelcomeStack
        }, 
        Home: {
             screen:EventStack,
         },
        
    });

export default createAppContainer(RootDrawerNavigator);


