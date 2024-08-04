import {
  View,
  Text,
  TouchableOpacity,
  Button,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CircularProgress from './CircularProgress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
const UserHour = props => {
  const [hours, setHours] = useState({});
  const navigation = useNavigation();
  async function userAuthentication() {
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(
        'https://nss-server-zunb.onrender.com/api/auth/user',
        {
          method: 'GET',
          headers: {
            Authorization: token,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setHours(data.userData);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error('Error getting 3');
    }
  }

  useEffect(() => {
    userAuthentication();
  }, []);
  console.log(hours);
  let num = 13.3333334;
  let slicedNum = parseFloat(num.toFixed(2));
  return (
    <View
      style={{
        display: 'flex',

        // justifyContent: 'center',
        alignItems: 'center',
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
            props.navigation.navigate('UserProfile', {
              name: hours.username,
              rollNo: hours.rollNo,
              id: hours._id,
            }); // Navigate to HomeScreen when button is clicked
          }}>
          <Image
            style={styles.settingsIcon}
            resizeMode="cover"
            source={require('../assets/settings.png')}
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
            fontSize: 35,
            color: 'black',
          }}>
          Hey {hours.username}!
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '20%',
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
            props.navigation.navigate('HoursCompleted', {
              name: hours.username
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
            Hour Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: '#c5cacd',
            borderRadius: 18,
          }}
          onPress={() => {
            props.navigation.navigate('UpcomingEvent', {
              name: hours.username
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
            Upcoming Event
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            margin: 5,
            backgroundColor: '#c5cacd',
            borderRadius: 18,
          }}
          onPress={() => {
            props.navigation.navigate('AttendedEvent', {
              name: hours.username
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
        }}>
        <CircularProgress percent={((hours.hours * 5) / 6).toFixed(2)} />
      </View>
      <View
        style={{
          marginBottom: 30,

          marginTop: 50,
          marginLeft: 12,
          marginRight: 12,
        }}>
        <Text
          style={{
            fontWeight: '900',
            fontSize: 30,
            color: 'black',
          }}>
          {' '}
          {hours.hours}/ 120 hours completed
        </Text>
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
});
export default UserHour;
