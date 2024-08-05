import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, Image, ScrollView, Switch, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const AddSingleStudent = () => {
  const [event, setEvent] = useState('');
  const [desc, setDesc] = useState('');
  const [hours, setHours] = useState('');
  const [time, setTime] = useState('');
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState('');
  const [selectedMentorId, setSelectedMentorId] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSubmit = async () => {
const userData={   
    'username': event,
'rollNo': desc,
'email':hours,
'password': time,
'mentorId': selectedMentorId
}
    console.log(userData);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        alert('No token found');
        return;
      }


      const response = await fetch('https://nss-server-zunb.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(userData)
      });


      const responseBody = await response.json();

      if (response.status === 201) {
        alert('student created successfully');
        setDesc('')
        setEvent('')
        setHours('')
        setTime('')
        setSelectedMentor('')
        setSelectedMentorId('')
      } else {
        alert(`Failed to create student: ${responseBody.message}`);
      }
    } catch (error) {
      console.error('Error adding Student:', error);
      alert('Failed to create student');
    }
  };
  useEffect(() => {
    // Fetch mentors from the API
    const fetchMentors = async () => {
      try {
        const response = await fetch('https://nss-server-zunb.onrender.com/api/admin/mentors',{
            method: 'GET',
          headers: {
            'Authorization': await AsyncStorage.getItem('token'),
          },
        });
        const data = await response.json();
        console.log(data);
        setMentors(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMentors();
  }, []);
  const handleSelectMentor = (mentorId,mentorName) => {
    setSelectedMentor(mentorName);
    setSelectedMentorId(mentorId);
    setDropdownVisible(false);
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
        <TextInput style={styles.text}placeholder="Username" value={event} onChangeText={setEvent} placeholderTextColor={'grey'}/>
        </TouchableOpacity>
      <TouchableOpacity
          style={styles.container}
          >
        <TextInput style={styles.text} placeholder="Roll No." value={desc} onChangeText={setDesc} placeholderTextColor={'grey'}/>
        </TouchableOpacity>
      <TouchableOpacity
          style={styles.container}
          >
        <TextInput style={styles.text} placeholder="Outlook Mail" value={hours} onChangeText={setHours}  placeholderTextColor={'grey'}/>
        </TouchableOpacity>
      <TouchableOpacity
          style={styles.container}
          >
        <TextInput style={styles.text} placeholder="Password" value={time} onChangeText={setTime}  placeholderTextColor={'grey'}/>
        </TouchableOpacity>
        <View style={styles2.container}>
      <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)} style={styles2.button}>
        <Text style={styles2.buttonText}>
          {selectedMentor ? selectedMentor : 'Select a mentor'}
        </Text>
      </TouchableOpacity>

      {dropdownVisible && (
        <ScrollView style={styles2.dropdown}>
          {mentors.map((mentor, index) => (
            <TouchableOpacity
              key={mentor.id ? mentor.id.toString() : `mentor-${index}`}
              style={styles2.dropdownItem}
              onPress={() => handleSelectMentor(mentor._id,mentor.name)}
            >
              <Text style={styles2.dropdownItemText}>{mentor.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>


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
            Add Student
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container:{
    borderWidth: 0.5,
    borderRadius: 8,
    margin: 6,
    justifyContent: 'center',
  },
  text:{  
    color: 'black',
    fontSize: 18,    
    marginBottom: 10,
    marginTop: 10,

  },
  image1:{

   display:'flex',
   alignItems:'center',
   padding :10
    
  },
  imageText:{
  color:"red",
  fontSize:20
    
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    margin: 5,
  },
  image: {
    width: 100,
    height: 100,
  },
  removeText: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: 'red',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 2,
    fontWeight: 'bold',
  },
});
const styles2 = StyleSheet.create({
    container: {
        borderWidth: 0.5,
        borderRadius: 8,
        margin: 6,
        justifyContent: 'center',
    },
    button: {
      padding: 15,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
    },
    buttonText: {
      fontSize: 16,
      color:'grey'
    },
    dropdown: {
      marginTop: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      maxHeight: 200,
    },
    dropdownItem: {
       
        margin: 6,
        justifyContent: 'center',
    },
    dropdownItemText: {
        color: 'black',
        fontSize: 18,    
        marginBottom: 10,
        marginTop: 10,
    },
  });
  
export default AddSingleStudent;
