import { View, Text, TouchableOpacity, Button, Image, StyleSheet, FlatList, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import CircularProgress from './CircularProgress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import EventCard from './EventCard';

const UserAttempt = (props) => {
  const navigation = useNavigation();
  const [assign, setAssign] = useState([]);

  const getEvents = async () => {
    try {
      const response = await fetch("https://nss-server-zunb.onrender.com/api/user/getAtendedEvent", {
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

  useEffect(() => {
    getEvents();
  }, []);

  const renderEventCard = ({ item }) => (
    <View style={styles.card}>
      <EventCard name={item.event} hours={item.hours} />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.settingsContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('UserProfile', {
              name: props.route.params.name,
            });
          }}
        >
          <Image
            style={styles.settingsIcon}
            resizeMode="cover"
            source={require("../assets/settings.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>Hey {props.route.params.name}!</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('HoursCompleted', {
              name: props.route.params.name,
            });
          }}
        >
          <Text style={styles.buttonText}>Hour Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate('UpcomingEvent', {
              name: props.route.params.name,
            });
          }}
        >
          <Text style={styles.buttonText}>Upcoming Event</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.activeButton]}
          onPress={() => {
            props.navigation.navigate('AttendedEvent', {
              name: props.route.params.name,
            });
          }}
        >
          <Text style={[styles.buttonText, styles.activeButtonText]}>Attended Events</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
    contentContainerStyle={{flexGrow:1}}

    style={{
      width: '100%',
    }}
    > 
    
        {
          assign.map((curElem, index) =>{
            const {reccuring,event,date,time,desc,hours,images,venue,organizer,_id} = curElem
          return (
          
              <View key={index}>
              <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                  <EventCard/>
        
                </ScrollView>
              </SafeAreaView>
            </View>
            
          )})
        }
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  settingsContainer: {
    alignSelf: 'flex-end',
    margin: 3,
    height: '10%',
    width: '10%',
    marginTop: '7%',
  },
  settingsIcon: {
    width: 24,
    height: 24,
  },
  greetingContainer: {
    width: '95%',
    justifyContent: 'flex-start',
  },
  greetingText: {
    fontWeight: '900',
    fontSize: 35,
    color: 'black',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
  },
  button: {
    flex: 1,
    margin: 5,
    backgroundColor: "#c5cacd",
    borderRadius: 18,
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: "rgb(44 44 149)",
  },
  buttonText: {
    textAlign: 'center',
    color: '#394047',
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 10,
  },
  activeButtonText: {
    color: 'white',
  },
  cardListContainer: {
    flex: 1,
  },

  card: {
    height: Dimensions.get('window').height * 0.1, // 10% of the screen height
    width: '100%', // 90% of the screen width
    height:"90vh",
    backgroundColor: 'black',
    borderRadius: 10,
  },
  // emptyContainer: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: '50%',
  // },
  // emptyText: {
  //   fontWeight: '900',
  //   fontSize: 25,
  //   color: 'black',
  // },
  // subText: {
  //   fontWeight: '350',
  //   fontSize: 18,
  //   color: 'black',
  // },
  // attendButton: {
  //   backgroundColor: 'rgb(44 44 149)',
  //   padding: 8,
  //   paddingLeft: 20,
  //   paddingRight: 20,
  //   borderRadius: 18,
  //   justifyContent: 'center',
  //   marginTop: 25,
  // },
  // attendButtonText: {
  //   textAlign: 'center',
  //   color: 'white',
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginVertical: 10,
  // },
});

export default UserAttempt;
