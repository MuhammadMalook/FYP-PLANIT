import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import EventStack from './EventStack';
import WelcomeStack from './WelcomeStack';

const RootDrawerNavigator = createDrawerNavigator(
    {
        
        Logout: {
            screen: WelcomeStack,
        }, 
        Home: {
             screen:EventStack,
         },
        
    });

export default createAppContainer(RootDrawerNavigator);


