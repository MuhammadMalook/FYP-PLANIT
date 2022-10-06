


import React, { useState, useEffect } from 'react';
import {View, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../components/Context';
import apiLink from '../shared/apiLink';
import { useIsFocused } from '@react-navigation/native';

const Profile = ({route, navigation}) => {
  console.log(route.params, 'paramssss')
  const profile = route.params
  const {_id} = route.params._id;

  const { signOut } = React.useContext(AuthContext);
  // console.log(route.params._id, 'iddddddd')
  // console.log(route.params.imageUrl)
  console.log(route)


  const [data, setData] = useState({"totalEvents":0, "myEvents":0, "completed":0, "tasksAssigned":0,"pendingEvents":0, "totalNotes":0, "requests":0})

  const isFocused = useIsFocused()

  async function getData()
  {
    
  const apiBody = { id: route.params._id };
  
  const apiData = await fetch(`${apiLink}/getEventsInfo`, {
      method: 'POST', // or 'PUT'
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(apiBody),
  });
  const jsonData = await apiData.json();
   console.log(jsonData.obj, "json");

  if (jsonData.success){
    
      setData(
          jsonData.obj,
      ); 
    }
  else {
      setData({ ...data, success : false })

  }

}

useEffect(() => {
  getData() 
}, [isFocused])



  return (
<ScrollView style={{marginBottom:100}}>
    <SafeAreaView style={styles.container}>

      <View style={styles.userInfoSection}>
        <View style={{ marginTop: 15}}>
          <Avatar.Image style={{alignSelf:'center'}}
            source={
              {uri:route.params.imageUrl} }
            size={120}
          />
          <View style={{alignItems:'center'}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{route.params.name}</Title>
            <Caption style={styles.caption}>Hey there! I am using Plan-It</Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
      
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{route.params.number}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{route.params.email}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>{data.totalEvents}</Title>
            <Caption>Total Events</Caption>
          </View>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>{data.myEvents}</Title>
            <Caption>Your Events</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{data.completed}</Title>
            <Caption>Completed Events</Caption>
          </View>
      </View>





      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {navigation.navigate('ChangePassword',{profile})}}>
          <View style={styles.menuItem}>
            <Icon name="lock-open-plus-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Change Password</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {navigation.navigate('EditProfile',{profile})}}>
          <View style={styles.menuItem}>
            <Icon name="account-settings-outline" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {signOut()}}>
          <View style={styles.menuItem}>
            <Icon name="logout" color="#FF6347" size={25}/>
            <Text style={styles.menuItemText}>Logout</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    marginBottom: 25,
    alignSelf:'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    flex:1,
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },

  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32
},
statsBox: {
    alignItems: "center",
    flex: 1
},

text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D"
},
subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
},
});