import { View, Text, Image, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
const MentorLogin = (props) => {

    const navigation=useNavigation();
    const[password,setPassword]=useState('')
    const[email,setEmail]=useState('')

    function handlePassword(e){
        const namevar=e.nativeEvent.text
        setPassword(namevar)
    }
    function handleEmail(e){
        const emailvar=e.nativeEvent.text
        setEmail(emailvar)
    }
   async function handleSubmit(){

        const userData={
            email:email,
            password:password
        };
     const response = await  fetch(`https://nss-server-zunb.onrender.com/api/mentor/login`,{
            method:"POST",
            headers:{
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(userData)
          })
          if(response.ok){
            const res_data= await response.json();
            Alert.alert("login succesfully")
            AsyncStorage.setItem("token",res_data.token);
            AsyncStorage.setItem("isLoggedInMentor",JSON.stringify(true));
            navigation.navigate("MentorTab")
            console.log("res_data",res_data.token)
          }
    }
  return (
    <ScrollView
    contentContainerStyle={{flexGrow:1}}
    keyboardShouldPersistTaps={'always'}
    >
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 35,
          backgroundColor: '#f8f9fa',
          padding: 20,
          borderRadius: 10,
        }}>
        <Image
          source={require('./../../images/nsslogo.png')}
          style={{
            width: 200,
            height: 200,
            borderRadius: 100,
            backgroundColor: '#007bff',
          }}
        />
      </View>
      <View
      style={{
        marginBottom: 10,
       
        marginTop: 10,
        marginLeft: 12,
        marginRight: 12,
      }}
      >
        <Text
        style={{
            fontWeight: '900',
            fontSize: 35,
            color: 'black'
          }}>
            Welcome!
        </Text>
      </View>
      <View
      style={{
        
        marginLeft: 12,
        marginRight: 12,
      }}
      >
        <TextInput placeholder='Outlook Mail Address'style={{
            borderWidth: 0.5,
            padding: 10,
            borderRadius: 8,
            marginTop: 12,
            justifyContent: 'center',
            fontSize: 18,    
            color:"black"
          }}
          onChange={e=>handleEmail(e)}
          placeholderTextColor={"#394047"}                
          
          />       
      </View>
      <View
      style={{
        
        marginLeft: 12,
        marginRight: 12,
      }}
      >
        <TextInput placeholder='Password'style={{
            borderWidth: 0.5,
            padding: 10,
            borderRadius: 8,
            marginTop: 12,
            justifyContent: 'center',
            fontSize: 18,    
            color: '#394047',
          }}
          onChange={e=>handlePassword(e)}
          
          placeholderTextColor={"#394047"}                
          />       
      </View>
      <View
       style={{
        
        marginLeft: 12,
        marginRight: 12,
      }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: 'rgb(44 44 149)',
            padding: 10,
            borderRadius: 18,
            justifyContent: 'center',
            marginTop: 120,
          }}
          onPress={()=>handleSubmit()}
         >
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
              marginTop: 10,
            }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default MentorLogin