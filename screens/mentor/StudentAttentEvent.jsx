import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventCard2 from './EventCard2';

const StudentAttentEvent = ({route}) => {
  const [assign, setAssign] = useState([]);
const eventId =route.params.id
  const getEvents = async () => {
    try {
      const response = await fetch(`https://nss-server-zunb.onrender.com/api/mentor/studentQuery/${eventId}`, {
        method: "GET",
        headers: {
          'Authorization': await AsyncStorage.getItem('token'),
        },
      });
      if (response.ok) {
        const data = await response.json();
        console.log("events", data);
        setAssign(data.reverse());
      }
    } catch (error) {
      console.error("Error getting events");
    }
  };
const handleApprove=async(id)=>{
 
  try {
    const response = await fetch(`https://nss-server-zunb.onrender.com/api/mentor/markAttend/${id}`, {
      method: "PUT",
      headers: {
        'Authorization': await AsyncStorage.getItem('token'),
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({eventId:eventId})
    });
    if (response.ok) {
      console.log(response)
      getEvents();
    }
  } catch (error) {
    console.error("Error getting events");
  }
}
  useEffect(() => {
    getEvents();
  }, []);
  return (
    <View>
      <View stye={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          width: '100%'
        }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {assign.map((curElem, index) => (
            <View key={index} style={{
              width: '95%',
              marginLeft: 10,
              // backgroundColor: 'white',
              borderRadius: 10,
              flexDirection: 'row',
              // justifyContent:'space-between'
            }}>
              <View style={{
                width:"57%",
                height:80
              }}>
            <EventCard2  eventName={curElem.username} reccuring={curElem.rollNo}/>
            </View>
            <TouchableOpacity onPress={()=>handleApprove(curElem._id)}>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 80,
              backgroundColor: 'white',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: 'gray',
              marginTop: 12,
            }}>
              <Text style={{
                color:"black",
                fontWeight: '600',
                fontSize: 14,
                marginBottom: 10,
                marginTop: 10,
              }}>  Approve</Text>
            </View>
            </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

export default StudentAttentEvent