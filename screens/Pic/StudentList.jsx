import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Padding, Border, FontFamily, FontSize, Color } from '../../GlobalStyles';
import FloatingActionButton from './FloatingActionButton'; // Adjust the path as needed
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventCard from '../mentor/EventCard';

const StudentList = (props) => {
  const navigation = useNavigation();
  const [usersData, setUsersData] = useState([]);
  const [search, setSearch] = useState('');

  const signout = () => {
    AsyncStorage.setItem('isLoggedInPic', '');
    AsyncStorage.setItem('token', '');
    props.navigation.navigate('StackNav', { screen: 'GetStarted' });
  };

  const UsersData = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    try {
      const response = await fetch('https://nss-server-zunb.onrender.com/api/admin/users', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      });
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUsersData(data);
      } else {
        console.error('Error getting data');
      }
    } catch (error) {
      console.error('Error getting');
    }
  };

  
  const handlePress = () => {
    console.log('FAB Pressed');
  };

  useEffect(() => {
    UsersData();
  }, []);

  return (
    
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}>
      <View
        style={{
          justifyContent: 'end',
          alignSelf: 'flex-end',
          marginRight: '3px',
          height: '8%',
          width: '10%',
        }}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('PicProfile');
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
          height: '8%',
        }}>
        <Text
          style={{
            fontWeight: '900',
            fontSize: 30,
            color: 'black',
          }}>
          Hey PIC!
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: '8%',
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
            props.navigation.navigate('StudentList');
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 10,
              marginTop: 10,
            }}>
            StudentList
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
            props.navigation.navigate('Events');
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#394047',
              fontSize: 16,
              fontWeight: '600',
              marginBottom: 10,
              marginTop: 10,
            }}>
            Events
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name or roll number"
        placeholderTextColor={'black'}
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <View
        contentContainerStyle={{ flexGrow: 1 }}
        style={{
          width: '95%',
          height: "68%",
        }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {
            usersData.length > 0 ? (
              usersData.filter((item) => {
                const searchText = search.toLowerCase();
                return searchText === ''
                  ? item
                  : item.username?.toLowerCase().includes(searchText) ||
                    item.rollNo?.toLowerCase().includes(searchText);
              }).map((item, index) => (
                <View key={index} style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                  <View style={{
                    flex: 1
                  }}>
                    <EventCard eventName={item.username} reccuring={item.rollNo} />
                  </View>
                  <TouchableOpacity>
                    <View>
                      <Text style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: 16,
                        padding: 10,
                      }}> View Attendance</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text> No User</Text>
            )
          }
        </ScrollView>
      </View>
      <SafeAreaView style={styles.container}>
        <Text>My React Native App</Text>
        <FloatingActionButton onPress={handlePress} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionFlexBox: {
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_xs,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    height: '100%',
    width: '100%'
  },
  eventsLayout: {
    height: 517,
    width: "100%",
    position: 'absolute',
  },
  barBg: {
    backgroundColor: Color.neutralLightLightest,
    position: 'absolute',
  },
  timeClr: {
    color: Color.neutralDarkDarkest,
    position: 'absolute',
  },
  settingsIcon: {
    top: 20,
    width: 24,
    height: 24,
    position: 'absolute',
    overflow: 'hidden',
  },
  section3: {
    color: Color.colorWhitesmoke_200,
    textAlign: 'center',
  },
  section2: {
    zIndex: 2,
    backgroundColor: Color.colorDarkslateblue_100,
    paddingVertical: Padding.p_5xs,
    paddingHorizontal: Padding.p_xs,
    borderRadius: Border.br_xs,
  },
  contentSwitcher: {
    top: 179,
    right: 16,
    left: 13,
    borderRadius: Border.br_base,
    padding: Padding.p_9xs,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Color.neutralLightLight,
    position: 'absolute',
  },
  events: {
    top: 250,
  },
  pageTitle: {
    marginTop: -8.5,
    marginLeft: -113,
    left: '50%',
    textAlign: 'right',
    top: '50%',
    color: Color.neutralDarkDarkest,
    fontFamily: FontFamily.headingH4,
    fontWeight: '800',
    fontSize: FontSize.size_6xl,
  },
  navBar: {
    top: 94,
    right: 76,
    left: -28,
    height: 88,
    position: 'absolute',
    overflow: 'hidden',
  },
  tableruserFilled: {
    left: 270,
    top: 66,
    width: 32,
    height: 32,
    position: 'absolute',
  },
  studentsList: {
    height: '100%',
    overflow: 'hidden',
    flex: 1,
    width: '100%',
    backgroundColor: Color.neutralLightLightest,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    width: '90%',
    height: '6%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    color:'black'
  },

});

export default StudentList;