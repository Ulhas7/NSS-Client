import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
const LoginOption = (props) => {
  const navigation=useNavigation();
    console.log(props)
  return (
    <View>
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
        fontSize: 50,
        color: 'black'
      }}
      >Your Role</Text>
      </View>
      <View
      style={{
        marginBottom: 35,
        marginLeft: 12
      }}
      >
      <Text
      style={{
        fontWeight: '200',
        fontSize: 17,
        color: 'black'
      }}
      >Choose the option which describe your role.</Text>
        
      </View>
      <View
      style={{
        
        marginLeft: 12,
        marginRight: 12,
      }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            padding: 10,
            borderRadius: 8,
            marginTop: 12,
            justifyContent: 'center',
          }}
          onPress={() => {
            props.navigation.navigate("StudentLogin")
          }}>
          <Text
            style={{  
              color: 'black',
              fontSize: 18,    
              marginBottom: 10,
              marginTop: 10,

            }}>
            Student
          </Text>
        </TouchableOpacity>
      </View>
      <View
      style={{
        
        marginLeft: 12,
        marginRight: 12,
      }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            padding: 10,
            borderRadius: 8,
            marginTop: 12,
            justifyContent: 'center',
          }}
          onPress={() => {
            props.navigation.navigate("MentorLogin")
          }}>
          <Text
            style={{  
              color: 'black',
              fontSize: 18,    
              marginBottom: 10,
              marginTop: 10,

            }}>
            Mentor
          </Text>
        </TouchableOpacity>
      </View>
      <View
      style={{
        
        marginLeft: 12,
        marginRight: 12,
      }}
      >
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            padding: 10,
            borderRadius: 8,
            marginTop: 12,
            justifyContent: 'center',
          }}
          onPress={() => {
            props.navigation.navigate("PICLogin")
          }}>
          <Text
            style={{  
              color: 'black',
              fontSize: 18,    
              marginBottom: 10,
              marginTop: 10,

            }}>
            PIC/GenSec
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginOption