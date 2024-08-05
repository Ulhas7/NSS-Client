import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Pressable, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EventCard from './EventCard';

const MarkAttendance = (props) => {
  const navigation = useNavigation();
  const [assign, setAssign] = useState([]);
  const [search, setSearch] = useState('');
  
  const getEvents = async () => {
    try {
      const response = await fetch("https://nss-server-zunb.onrender.com/api/form/event", {
        method: "GET",
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

 

 
  useEffect(() => {
    getEvents();
  }, []);

  return (
    <View
      style={{
        display: 'flex',

        // justifyContent: 'center',
        alignItems: 'center',
        height: '70%',
        width: '100%',
      }}>
      <View
        style={{
          justifyContent: 'end',
          alignSelf: 'flex-end',
          marginTop: '1px',
          marginRight: '3px',
          marginTop: '1px',
          height: '10%',
          width: '10%',
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('MentorProfile'); // Navigate to HomeScreen when button is clicked
          }}>
          <Image
            style={styles.settingsIcon}
            resizeMode="cover"
            source={require('../../assets/settings.png')}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: 'start',
          width: '95%',
        }}>
        <Text
          style={{
            fontWeight: '900',
            fontSize: 30,
            color: 'black',
          }}>
          Hey Mentor!
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '15%',
        }}>
        <TouchableOpacity
          style={{
            flex: 1,
            margin: 5,
            backgroundColor: 'rgb(44 44 149)',
            borderRadius: 18,
            justifyContent: 'center',
          }}
          onPress={() => {
            props.navigation.navigate('MarkAttendance'); // Navigate to HomeScreen when button is clicked
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 16,
              margin:10,
              fontWeight: '600',
            }}>
            Mark Attendance
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#c5cacd',
            borderRadius: 18,
            margin: 5,
          }}
          onPress={() => {
            props.navigation.navigate('UpdateEventPicture'); // Navigate to HomeScreen when button is clicked
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#394047',
              fontSize: 16,
              fontWeight: '600',
              margin: 10,
            
            }}>
            Upload picture
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by event name or wings"
        placeholderTextColor={'black'}
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
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
                width:"63%",
                height:80
              }}>
            <EventCard  eventName={curElem.event} reccuring={curElem.reccuring} hours={curElem.hours}/>
            </View>
            <TouchableOpacity onPress={() => {
    navigation.navigate('StudentAttentEvent',{
      id:curElem._id
    })
  }}>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 80,
              backgroundColor: 'white'
            }}>
              <Text style={{
                color:"black",
                fontWeight: '600',
                fontSize: 14,
                marginBottom: 10,
                marginTop: 10,
              }}> Mark Attendance</Text>
            </View>
            </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  settingsIcon: {
    top: 20,

    width: 24,
    height: 24,
    position: 'absolute',
    overflow: 'hidden',
  },
  searchInput: {
    width: '90%',
    height: '8%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    color: 'black',
  },
});
export default MarkAttendance;
