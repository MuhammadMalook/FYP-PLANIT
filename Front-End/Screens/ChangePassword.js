import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
} from 'react-native';

import {useTheme} from 'react-native-paper';
import { useRef } from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import {Permissions} from 'expo';
import { Camera } from 'expo-camera';
import * as Animatable from 'react-native-animatable';
import apiLink from '../shared/apiLink';
// import Imageurl from '../assets/plus-icon.png'

const ChangePassword = ({navigation,route}) => {
  const _user = route.params.profile.name;
  const _email = route.params.profile.email;
  const _id = route.params.profile._id;
  const _number = route.params.profile.number;
  console.log(route.params.profile._id)

  const [data, setData] = React.useState({
    api: false,
    CurrentPass : "",
    NewPass : "",
    secureTextEntryCurrPass:true,
    secureTextEntryNewPass:true,
    


    isValidCurrPass: true,
    isValidNewPass: true,
});

  const [image, setImage] = useState(route.params.profile.imageUrl);
  const {colors} = useTheme();



  const updateSecureTextEntryCurrPass = () => {
    setData({
        ...data,
        secureTextEntryCurrPass: !data.secureTextEntryCurrPass
    });
}
const updateSecureTextEntryNewPass = () => {
    setData({
        ...data,
        secureTextEntryNewPass: !data.secureTextEntryNewPass
    });
}

  const handleValidCurrPass = (val) => {
    console.log(val)
    if (val.trim().length >= 8) {
        setData({
            ...data,
            CurrentPass: val,
            isValidCurrPass: true
        })
    }
    else
     {
        setData({
            ...data,
            CurrentPass: val,
            isValidCurrPass: false
        })

    }
}
const handleValidNewPass = (val) => {
    if (val.trim().length >= 8) {
        setData({
            ...data,
            NewPass: val,
            isValidNewPass: true
        })
    }
    else {

        setData({
            ...data,
            NewPass: val,
            isValidNewPass: false
        })
    }
}




  return (
    <ScrollView>
      <Animated.View style={{margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(1.0)),
    }}>
        <Animatable.View
                    animation="fadeInUpBig"
                    style={[styles.footer, {
                        backgroundColor: colors.background
                    }]}
                >
                    <View style={{alignItems:'center' , margin:40}}>
                         <Text style={{fontSize:20}} >Change Password</Text>
                    </View>
                    
                    <View style={{ marginBottom: 10 }}>
                        
                        <View style={styles.action}>
                            <FontAwesome
                                name="lock"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput
                        value={data.CurrentPass}
                        secureTextEntry={data.secureTextEntryCurrPass ? true : false}
                                placeholder="current password"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => handleValidCurrPass(val)}
                            />
                        
                                <TouchableOpacity
                            onPress={updateSecureTextEntryCurrPass} style={{marginTop:8, marginLeft:5}}>
                            {data.secureTextEntryCurrPass ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                        </View>

                        {data.isValidCurrPass ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>

                                <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                            </Animatable.View>
                        }
                    
            </View>
            <View style={{ marginBottom: 10 }}>
                      
                        <View style={styles.action}>
                            <FontAwesome
                                name="lock"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput
                        value={data.NewPass}
                        secureTextEntry={data.secureTextEntryNewPass ? true : false}

                                placeholder="new password"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => handleValidNewPass(val)}
                            />
                        

                        <TouchableOpacity
                            onPress={updateSecureTextEntryNewPass} style={{marginTop:8, marginLeft:5}}>
                            {data.secureTextEntryNewPass ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                        </View>

                        {data.isValidNewPass ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>

                                <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                            </Animatable.View>
                        }
                    
            </View> 
        <TouchableOpacity style={styles.commandButton} onPress={async () => {
           if(data.isValidEmail == false || data.isValidUser == false || data.isValidNumber == false )
           {
               alert("Please Enter All Data Correctly")
               return ;

           }
          //  setData({ ...data, api: true })
           console.log(image)
           const apiBody = {_id, currPass:data.CurrentPass, newPass:data.NewPass };
                                const apiData = await fetch(`${apiLink}/updatePassword`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(apiBody),
                                });
                                const jsonData = await apiData.json();
                                console.log(jsonData," helo")
                                // setData({ ...data, api: false })
                                if (jsonData.success) {
                                    alert("Password Updated")
                                    const data = jsonData.updated
                                  
                                }
                                else {
                                    alert(jsonData.msg)

                                }
         }}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
        </Animatable.View>
      </Animated.View>
    </ScrollView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
    marginBottom:100
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
},
  action: {

    flexDirection: 'row',
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    // flexDirection: 'row',
    // marginTop: 10,
    // marginBottom: 10,
    // borderWidth: 1,
    // borderColor: '#B1624EFF',
    // paddingBottom: 5,
    // borderRadius:10,
    // padding:10
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {

    // flex: 1,
     //marginTop: Platform.OS === 'ios' ? 0 : -12,
    // paddingLeft: 10,
    // color: '#05375a',
 
        marginLeft:5,
        borderStyle:"solid",
        borderWidth: 1,
        borderColor:"#D3D3D3",
        
        borderRadius:10,
        padding:10,
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -8,
        paddingLeft: 10,
        color: '#05375a',
  },
});