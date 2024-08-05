import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity,PermissionsAndroid, Platform  } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const SpecificEvent = ({ route }) => {
  const { reccuring,event,date,time,desc,hours,id,venue,organizer} = route.params;
  const [deviceId, setDeviceId] = useState('');

  const requestPhoneStatePermission = async () => {
    try {
      if (Platform.OS === 'android' && Platform.Version >= 23) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
          {
            title: 'Phone State Permission',
            message: 'This app needs access to your phone state to get the device ID.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('You can read the phone state')
        } else {
          console.log('Phone state permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    const fetchDeviceId = async () => {
      await requestPhoneStatePermission();
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
    };

    fetchDeviceId();
  }, []);
  const rerquestAttendance=async (ulhas)=>{
    const token=await AsyncStorage.getItem('token')
    try {
      const response = await fetch(
        `https://nss-server-zunb.onrender.com/api/user/contact/${ulhas}`,
        {
          method: "POST",
          headers:{
            Authorization:token,
            device_id:deviceId,
            'Content-Type': 'application/json',
          }
        }
      );
     if(!response.ok){
      alert(response.status)
     }else{
      alert(response.status)
     }
    } catch (error) {
      console.log("error", error);
    }
    
  }
  return (
    <View style={styles.container}>
    <Text style={styles.eventName}>{event}</Text>
    <View style={styles.timecontainer}>
    <Text style={styles.timeDate}>{time} , {date}</Text>
    </View>
    <Text style={styles.recurring}>{reccuring}</Text>
    <ScrollView style={styles.descriptionContainer}>
      <Text style={styles.description}>{desc}</Text>
    </ScrollView>
    <Text style={styles.venue}>VENUE :- {venue}</Text>

    <TouchableOpacity
          style={{
            backgroundColor: '#3b1c6d',
            padding: 10,
            borderRadius: 18,
            justifyContent: 'center',
            marginTop: 20,
          }}
          onPress={()=>rerquestAttendance(id)}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
              marginTop: 10,
            }}>
            UPLOAD IMAGES
          </Text>
        </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  eventName: {
    padding: 10,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color:"black"
  },
  timeDate: {
    fontSize: 15,
    color: '#2b242c',
    marginBottom: 10,
  },
  recurring: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '700',
    color:"black"



  },
  descriptionContainer: {
    flex: 1,
    marginTop: 10,

  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color:"black"

  },
  timecontainer:{
    marginBottom: 10,
    paddingTop: 10,
    backgroundColor: '#b493ea',
    borderRadius: 10,
    shadowColor: "#000",  
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width:"60%",
    height:"9%",
    justifyContent:"center",
    alignItems:"center",
  },
  venue:{
    fontSize: 16,
    color:"black",
    marginBottom: 10,
    marginTop: 20,
    fontWeight: '700'
  }
});

export default SpecificEvent;


