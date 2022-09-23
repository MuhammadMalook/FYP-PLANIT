import {React,useEffect,useState} from 'react';
import {
    Button,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar,
    Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient'
import { useTheme } from '@react-navigation/native';
const LoginScreen = ({route, navigation}) => {
    const { colors } = useTheme();
    console.log(route,"he;llo")
   
    const deviceToken = route.params.data;
    console.log(route)

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <View style={styles.header}>
                <Animatable.Image
                    animation="bounceIn"
                    duraton="1500"
                    
                    source={require('../assets/dark_logo.png')}
                    style={styles.logo}
                    resizeMode="stretch"
                />
            </View>
            <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
                
            }]}animation="fadeInUpBig">
            
            
            <Text style={[styles.title, {
                color: colors.text
            }]}>Make Your Events Happen</Text>
            
            <View style={{flexDirection:"row", marginTop:20}}>

            <TouchableOpacity
                    onPress={() => navigation.navigate('NewAccount', {deviceToken:deviceToken})}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15,
                        marginRight:10
                        
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign Up</Text>
                </TouchableOpacity>

            <TouchableOpacity
                    onPress={() => navigation.navigate('Login', {deviceToken:deviceToken})}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15,
                        
                        marginRight:10
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign In</Text>
                </TouchableOpacity>

           
            
            </View> 
        </Animatable.View>
        </View>

    )
}
const {height} = Dimensions.get("screen");
// const height_logo = height * 0.15;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: 300,
        height: 260
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop: 5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'black',
        fontWeight: 'bold'
    },
});


export default LoginScreen;