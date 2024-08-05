import {View, Text, Button} from 'react-native';
import React, { useEffect, useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import GetStarted from './screens/GetStarted';
import LoginOption from './screens/LoginOption';
import UserHour from './screens/UserHour';
import UserUpcomingEvent from './screens/UserUpcomingEvent';
import UserAttemptEvent from './screens/UserAttemptEvent';
import StudentLogin from './screens/StudentLogin';
import PICLogin from './screens/PICLogin';
import MentorLogin from './screens/mentor/MentorLogin';
import MarkAttendance from './screens/mentor/MarkAttendance';
import UpdateEventPicture from './screens/mentor/UpdateEventPicture';
import AsyncStorage from '@react-native-async-storage/async-storage'
import UserProfile from './screens/UserProfile';
import Events from './screens/Pic/Events';
import StudentView from './screens/Pic/StudentView';
import AddEvent from './screens/Pic/AddEvent';
import StudentList from './screens/Pic/StudentList';
import SpecificEvent from './screens/SpecificEvent';
import MentorProfile from './screens/mentor/MentorProfile';
import PicProfile from './screens/Pic/PicProfile';
import StudentAttentEvent from './screens/mentor/StudentAttentEvent';
import UploadImages from './screens/mentor/UploadImages';
import EventGallery from './screens/Pic/EventGallery';

    


const UserNav = () => {
  const Tab = createNativeStackNavigator();

  return (
    <Tab.Navigator initialRouteName='HoursCompleted' screenOptions={{
      headerShown:false
    }} >
      <Tab.Screen name="HoursCompleted" component={UserHour} />
      <Tab.Screen name="UpcomingEvent" component={UserUpcomingEvent} />
      <Tab.Screen name="AttendedEvent" component={UserAttemptEvent} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
      <Tab.Screen name="SpecificEvent" component={SpecificEvent}  />
      <Tab.Screen name="StackNav" component={StackNav} />
    </Tab.Navigator>
  );
};
const MentorNav = () => {
  const stack = createNativeStackNavigator();

return(
  <stack.Navigator initialRouteName='MarkAttendance' screenOptions={{
    headerShown:false
  }}>
         <stack.Screen name="MarkAttendance" component={MarkAttendance}  />
         <stack.Screen name="UpdateEventPicture" component={UpdateEventPicture}/>
         <stack.Screen name="MentorProfile" component={MentorProfile}/>
         <stack.Screen name="StudentAttentEvent" component={StudentAttentEvent}/>
         <stack.Screen name="UploadImages" component={UploadImages}/>
      <stack.Screen name="StackNav" component={StackNav} />

        </stack.Navigator>
)
}
const StackNav = () => {
  const stack = createNativeStackNavigator();

return(
  <stack.Navigator initialRouteName="GetStarted" screenOptions={{
    headerShown:false
  }}>
          <stack.Screen name="GetStarted" component={GetStarted} />
          <stack.Screen name="LoginOption" component={LoginOption} />
          <stack.Screen name="StudentLogin" component={StudentLogin} />
          <stack.Screen name="PICLogin" component={PICLogin} />
          <stack.Screen name="MentorLogin" component={MentorLogin} />
          <stack.Screen name="UserTab" component={UserNav} />
          <stack.Screen name="MentorTab" component={MentorNav} />
          <stack.Screen name="PicTab" component={PicNav} />
        </stack.Navigator>
)
}
const PicNav = () => {
  const stack = createNativeStackNavigator();

return(
  <stack.Navigator initialRouteName="StudentList" screenOptions={{
    headerShown:false
  }}>
          <stack.Screen name="StudentList" component={StudentList} />

          <stack.Screen name="Events" component={Events} />
          <stack.Screen name="StudentView" component={StudentView} />
          <stack.Screen name="AddEvent" component={AddEvent} />
          <stack.Screen name="EventGallery" component={EventGallery} />
          
          <stack.Screen name="PicProfile" component={PicProfile} />
          <stack.Screen name="StackNav" component={StackNav} />
        </stack.Navigator>
)
}

const App = () => {
const[ isLoggedInUser,setIsLoggedInUser]=useState(false);
const[ isLoggedInMentor,setIsLoggedInMentor]=useState(false);
const[ isLoggedInPic,setIsLoggedInPic]=useState(false);
 async function getUserLogInData(){
  const data = await AsyncStorage.getItem('isLoggedInUser')
  console.log(data)
  setIsLoggedInUser(data);
 }
 async function getMentorLogInData(){
  const data = await AsyncStorage.getItem('isLoggedInMentor')
  console.log(data)
  setIsLoggedInMentor(data);
 }
 async function getPicLogInData(){
  const data = await AsyncStorage.getItem('isLoggedInPic')
  console.log(data)
  setIsLoggedInPic(data);
 }

 useEffect(()=>{
  getUserLogInData(),
  getMentorLogInData(),
  getPicLogInData()
 },[])
  return (
    
    <>
      <NavigationContainer>
      
        
{isLoggedInUser?<UserNav/>:(isLoggedInMentor?<MentorNav/>:(isLoggedInPic?<PicNav/>:<StackNav/>))}
      </NavigationContainer>

    </>
  );
};

export default App;
