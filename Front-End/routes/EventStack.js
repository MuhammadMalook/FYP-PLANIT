import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../Screens/HomeScreen';
import Sign from '../Screens/Sign';
import Header from '../shared/header';

const screens = {
    Login: {
        screen: Sign,
        navigationOptions: ({ navigation }) => 
        {
            return {
                headerTitle: () => <Header title='Login' navigation={navigation} />
            }
        },
    },
    Home: {
        screen: HomeScreen,
        navigationOptions:{
            title:'Home'
        }
    },
    

};

const EventStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
});
export default EventStack;