import { View, Text, TouchableOpacity, Button, ScrollView, StyleSheet, Image,SafeAreaView} from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomDropdown from './CustomDropdown';
import { useNavigation } from '@react-navigation/native'
import EventCard from './EventCard';
const UserUpcomingEvent =  (props) => {
  console.log(props.route.params)
  const userid=props.route.params.id
  const mentorid=props.route.params.mentor
 const [assign,setAssign]=useState([]);
 const [events,setEvents]=useState([]);
 const navigation=useNavigation();
 const options = [
  { label: 'Rural', value: 'option1' },
  { label: 'Chetana', value: 'option2' },
  { label: 'Adhyayan', value: 'option3' },
  { label: 'Technical Skills', value: 'option4' },
  { label: 'Teaching', value: 'option5' },
  { label: 'Environmental', value: 'option6' },
  { label: 'Prayatna', value: 'option7' },
];
const handleSelect = (option) => {
  setEvents(option);
  console.log(events)
};
 

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

useEffect(()=>{
  getEvents()
 }, []
)
 
  return (
    <View style={{
      flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
  
    }}>
      <View
      style={{
        justifyContent: 'end',
        alignSelf:'flex-end',
        marginTop: '1px',
        marginRight: '3px',
        marginTop: '1px',
        height: '10%',
        width: '10%',
        
      }}
      >
      <TouchableOpacity title="p" onPress={() => {
            props.navigation.navigate('UserProfile', {
              name: props.route.params.name,
            }); // Navigate to HomeScreen when button is clicked
          }} >
           <Image
        style={styles.settingsIcon}
        resizeMode="cover"
        source={require("../assets/settings.png")}
      />
</TouchableOpacity>
      </View>
      <View
       style={{
        justifyContent: 'start',
        width: '95%',
        
        
      }}
      >
        <Text
        style={{
          fontWeight: '900',
          fontSize: 35,
          color: 'black'
        }}
        >Hey {props.route.params.name}!</Text>
      </View>
      <View 
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      alignItems: 'center',
      height: '20%',

    
      }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            margin: 5,
            backgroundColor:"#c5cacd",
            borderRadius: 18,
            justifyContent: 'center',
          
          }}
          onPress={() => {
            props.navigation.navigate('HoursCompleted', {
              name: props.route.params.name,
            }); // Navigate to HomeScreen when button is clicked
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#394047',
              fontSize: 15,
              fontWeight: '500',
              marginBottom: 10,
              marginTop: 10,
            }}>
            Hour Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor:"rgb(44 44 149)",
            borderRadius: 18,


          }}
          onPress={() => {
            props.navigation.navigate('UpcomingEvent', {
              name: props.route.params.name,
            }); // Navigate to HomeScreen when button is clicked
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 15,
              fontWeight: '500',
              marginBottom: 10,
              marginTop: 10,
            }}>
            Upcoming Event
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            margin: 5,
            backgroundColor:"#c5cacd",
            borderRadius: 18,


          }}
          onPress={() => {
            props.navigation.navigate('AttendedEvent', {
              name: props.route.params.name,
            }); // Navigate to HomeScreen when button is clicked
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#394047',
              fontSize: 15,
              fontWeight: '500',
              marginBottom: 10,
              marginTop: 10,
            }}>
            Attended Events
          </Text>
        </TouchableOpacity>
      </View>
      <View
      stye={{
        display: 'flex',
        justifyContent: 'center',

      }}
      >

    
      </View>
      

      <View style={styles.container1}>
       
      <CustomDropdown options={options} onSelect={handleSelect} />
  
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
            if(reccuring==events.label){return (
          
              <View key={index}>
              <SafeAreaView style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                  <EventCard
                    event={event}
                    date={date.slice(0,10)}
                    time={time}
                    venue={venue}
                    hours={hours}
                    desc={desc}
                    organizer={organizer}
                    id={_id}
                    reccuring={reccuring}
                    mentorid={mentorid}
                    userid={userid}
                    images={images}
                   />
        
                </ScrollView>
              </SafeAreaView>
            </View>
            
          )}else {return (
          
            <View key={index}>
            <SafeAreaView style={styles.container}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                <EventCard
                  event={event}
                  date={date.slice(0,10)}
                  time={time}
                  venue={venue}
                  hours={hours}
                  desc={desc}
                  organizer={organizer}
                  id={_id}
                  reccuring={reccuring}
                  mentorid={mentorid}
                  userid={userid}
                  images={images}
                 />
      
              </ScrollView>
            </SafeAreaView>
          </View>
          
        )}})
        }
    </ScrollView>
    </View>
  )
}
const styles=StyleSheet.create({
  settingsIcon: {
    top: 20,
 
    width: 24,
    height: 24,
    position: "absolute",
    overflow: "hidden",
  },
  container1: {
    // flex: 1,
    justifyContent: 'center',
    width: '95%',
    
    // padding: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    alignItems: 'center',
    padding: 10,
  },
})
export default UserUpcomingEvent