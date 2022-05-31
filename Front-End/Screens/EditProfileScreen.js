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

const EditProfileScreen = ({navigation,route}) => {
  const _user = route.params.profile.name;
  const _email = route.params.profile.email;
  const _id = route.params.profile._id;
  const _number = route.params.profile.number;
  console.log(route.params.profile._id)

  const [data, setData] = React.useState({
    api: false,
    username: _user,
    email: _email,
    number: _number,
    id : route.params.profile._id,
    imageUrl : image,


    isValidNumber: true,
    isValidUser: true,

    isValidEmail: true,
});

  const [image, setImage] = useState(route.params.profile.imageUrl);
  const {colors} = useTheme();
  const  bs = useRef(0)
  const  fall = new Animated.Value(1);
  const uri=null;

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
     // setImage(result.uri);
      // uri=image;
      let newfile = { 
        uri:result.uri,
        type:`test/${result.uri.split(".")[1]}`,
        name:`test.${result.uri.split(".")[1]}` 
        
    }
      uploadImage(newfile)
    }
  };



  const handleValidUser = (val) => {
    console.log(val)
    if (val.trim().length > 4) {
        setData({
            ...data,
            username: val,
            isValidUser: true
        })
    }
    else
     {
        setData({
            ...data,
            username: val,
            isValidUser: false
        })

    }
}
const handleValidEmail = (val) => {
    if (val.trim().length > 8) {
        setData({
            ...data,
            email: val,
            isValidEmail: true
        })
    }
    else {

        setData({
            ...data,
            email: val,
            isValidEmail: false
        })
    }
}
const handleValidNumber = (val) => {
  if (val.trim().length > 10) {
      setData({
          ...data,
          number: val,
          isValidNumber: true
      })
  }
  else {

      setData({
          ...data,
          number: val,
          isValidNumber: false
      })
  }
}




async function askForPermissions() {
   const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
        Alert.alert('Error', 'You did not give the right to create a photo');
        return false;
    }
    return true;
}
  const captureImage = async ()=>{
      const hasPermissions = await askForPermissions();
  
      if (!hasPermissions) {
        return;
      }
  
      let img = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        allowsEditing: false,
        aspect: [16, 9],
      });
      
  //     const manipResult = await ImageManipulator.manipulateAsync(
  //       img.uri,
  //       [{ rotate: 90 }, { flip: ImageManipulator.FlipType.Vertical }],
  //       { compress: 1, format: ImageManipulator.SaveFormat.PNG }
  // );
  console.log(img)
  if(!img.cancelled){
    let newfile = { 
      uri:img.uri,
      type:`test/${img.uri.split(".")[1]}`,
      name:`test.${img.uri.split(".")[1]}` 
      
  }
    uploadImage(newfile)
  }
  //uploadImage(img)
      //setImage(img.uri);
      
      // onPick(img.uri);
  }
  const uploadImage = (image)=>{
        const data = new FormData();
        data.append("file",image)
        data.append('upload_preset','user-profile')
        data.append('cloud_name',"djzufotuv")
      //   let base64Img = `data:image/jpg;base64,${img.base64}`;
      // let data = {
      //   "file": base64Img,
      //   "upload_preset": "user-profile",
      // }

      fetch("https://api.cloudinary.com/v1_1/djzufotuv/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json()).
        then(data=>{
          console.log(data.url,'hello')
            setImage(data.url)
        }).catch(err=>{
            Alert.alert("error while uploading")
        })
  }

  // const TakePhotoFromCamera = () => {
  //   ImagePicker.openCamera({
  //     compressImageMaxWidth: 300,
  //     compressImageMaxHeight: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7
  //   }).then(image => {
  //     console.log(image);
  //     setImage(image.path);
  //     this.bs.current.snapTo(1);
  //   });
  // }

  // const ChoosePhotoFromLibrary = () => {
  //   ImagePicker.openCamera({
  //     width: 300,
  //     height: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7
  //   }).then(image => {
  //     console.log(image);
  //     setImage(image.path);
  //     this.bs.current.snapTo(1);
  //   });
  // }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={captureImage}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
         onPress={() => bs.current.snapTo(1)}
        >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

 const RenderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );


 



  return (
    <ScrollView>
    <View style={styles.container}>
      <BottomSheet
         ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={RenderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <Animated.View style={{margin: 20,
        opacity: Animated.add(0.1, Animated.multiply(1.0)),
    }}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity 
          onPress={() => bs.current.snapTo(0)}
          >
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{
                  uri:image
                }
                }
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
            John Doe
          </Text>
        </View>
        <Animatable.View
                    animation="fadeInUpBig"
                    style={[styles.footer, {
                        backgroundColor: colors.background
                    }]}
                >
                    <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Fullrname</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="user-o"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput
                        value={data.username}

                                placeholder="Your Fullname"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => handleValidUser(val)}
                            />
                            {data.isValidUser ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null}
                        </View>

                        {data.isValidUser ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>

                                <Text style={styles.errorMsg}>Username must be 4 characters long.</Text>
                            </Animatable.View>
                        }
                    
            </View>
            <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Email</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="envelope-o"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput
                        value={data.email}

                                placeholder="Your email"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => handleValidEmail(val)}
                            />
                            {data.isValidEmail ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null}
                        </View>

                        {data.isValidEmail ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>

                                <Text style={styles.errorMsg}>email should be valid.</Text>
                            </Animatable.View>
                        }
                    
            </View>
            <View style={{ marginBottom: 10 }}>
                        <Text style={[styles.text_footer, {
                            color: colors.text
                        }]}>Phone</Text>
                        <View style={styles.action}>
                            <FontAwesome
                                name="phone"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput
                        value={data.number}
                        keyboardType='number-pad'

                                placeholder="Your Number"
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val) => handleValidNumber(val)}
                            />
                            {data.isValidNumber ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                : null}
                        </View>

                        {data.isValidNumber ? null :
                            <Animatable.View animation="fadeInLeft" duration={500}>

                                <Text style={styles.errorMsg}>phone must be 11 characters long.</Text>
                            </Animatable.View>
                        }
                    
            </View>

        {/* <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="First Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Feather name="phone" color={colors.text} size={20} />
          <TextInput
            placeholder="Phone"
            placeholderTextColor="#666666"
            keyboardType="number-pad"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="globe" color={colors.text} size={20} />
          <TextInput
            placeholder="Country"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.action}>
          <Icon name="map-marker-outline" color={colors.text} size={20} />
          <TextInput
            placeholder="City"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View> */}
        <TouchableOpacity style={styles.commandButton} onPress={async () => {
           if(data.isValidEmail == false || data.isValidUser == false || data.isValidNumber == false )
           {
               alert("Please Enter All Data Correctly")
               return ;

           }
           setData({ ...data, api: true })
           console.log(image)
           const apiBody = {id:route.params.profile._id, name: data.username, email: data.email, number: data.number, imageUrl:image };
                                const apiData = await fetch(`${apiLink}/person`, {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify(apiBody),
                                });
                                const jsonData = await apiData.json();
                                console.log(jsonData," helo")
                                setData({ ...data, api: false })
                                if (jsonData.success) {
                                    alert("Profile Updated")
                                    const data = jsonData.updated
                                    navigation.navigate('Profile',{...data})
                                }
                                else {
                                    alert("Not Updated")

                                }
         }}>
          <Text style={styles.panelButtonTitle}>Submit</Text>
        </TouchableOpacity>
        </Animatable.View>
      </Animated.View>
    </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

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