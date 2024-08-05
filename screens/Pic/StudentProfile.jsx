import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import { Border, Color, FontFamily, FontSize } from '../../GlobalStyles';
import CircularProgress from '../CircularProgress';

const StudentProfile = ({route}) => {
  // console.log(route);
  const userData = route.params.userData
  return (
    
    <View style={styles.eventsGallery}>
      <Text style={{
        fontSize: 35,
        fontWeight: '800',
        marginBottom: 50,
        marginLeft: 10,
        marginTop: 20,
        alignSelf: 'flex-start',
        color: 'black',
      }}>Student Profile</Text>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingVertical: 10,
      }}>
      <View  style={{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '600',
          fontFamily: FontFamily.Poppins_Regular,
          color: '#b493ea',
          margin: 5,
        }}>{userData.username}</Text>
      <Text style={{
        margin: 5,
        fontSize: 16,
        fontFamily: FontFamily.Poppins_Regular,
        color: 'black',
      }}>
       {userData.email}
      </Text>
      <Text style={{
        margin: 5,
        fontSize: 16,
        fontFamily: FontFamily.Poppins_Regular,
        color: 'black',
      }}>{userData.rollNo}</Text>
      </View>
      <View>
      <Image
        style={[styles.avatarIcon, styles.containerPosition]}
        resizeMode="cover"
        source={require("../../assets/avatar1.png")}
      />
      </View>
      </View>
      
        <CircularProgress percent={((userData.hours * 5) / 6).toFixed(2)} />
    </View>
    
  );
};

const styles = StyleSheet.create({
  eventsGallery: {
    display: 'flex',

    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    
  }
});
export default StudentProfile;
