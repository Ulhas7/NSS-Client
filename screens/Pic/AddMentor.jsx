import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '@react-navigation/routers/lib/typescript/src/CommonActions';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, Image, ScrollView, Switch, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const AddMentor = () => {
  const [mentorData, setMentorData] = useState({ name: '', email: '', password: '' });

  const handleChange = (name, value) => {
    setMentorData({ ...mentorData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        alert('No token found');
        return;
      }

      const response = await fetch('https://nss-server-zunb.onrender.com/api/mentor/register', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(mentorData)
      });

      const responseBody = await response.json();

      if (response.status === 201) {
        alert('Mentor created successfully');
        setMentorData({
          name: '',
          email: '',
          password: '',
        })
      } else {
        alert(`Failed to create Mentor: ${responseBody.message}`);
      }
    } catch (error) {
      console.error('Error adding mentor:', error);
      alert('Failed to create mentor');
    }
  };

  return (
    <ScrollView>
      <View
        style={{
          marginBottom: 10,
          marginTop: 10,
          marginLeft: 12,
          marginRight: 12,
        }}>

        <Text
          style={{
            fontWeight: '900',
            fontSize: 30,
            color: 'black'
          }}
        >Add Student</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.container}
        >
          <TextInput
            style={styles.text}
            placeholder="Name"
            value={mentorData.name}
            onChangeText={(text) => handleChange('name', text)}
            placeholderTextColor={'grey'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
        >
          <TextInput
            style={styles.text}
            placeholder="Email"
            value={mentorData.email}
            onChangeText={(text) => handleChange('email', text)}
            placeholderTextColor={'grey'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container}
        >
          <TextInput
            style={styles.text}
            placeholder="Password"
            value={mentorData.password}
            onChangeText={(text) => handleChange('password', text)}
            placeholderTextColor={'grey'}
            secureTextEntry={true}
          />
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#3b1c6d',
              padding: 10,
              borderRadius: 18,
              justifyContent: 'center',
              margin: 10,
            }}
            onPress={handleSubmit}>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 10,
                marginTop: 10,
              }}>
              Add Mentor
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginStart: 10,
    marginEnd: 10,
    marginBottom: 5,
    marginTop: 10,  
    borderRadius: 8,
    margin: 6,
    justifyContent: 'center',
    backgroundColor:'#d8d4f8',
  },
  text: {
    color: 'black',
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
  }
});

export default AddMentor;
