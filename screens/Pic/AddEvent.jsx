import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, ScrollView, Switch, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const AddEvent = () => {
  const [event, setEvent] = useState('');
  const [desc, setDesc] = useState('');
  const [hours, setHours] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [reccuring, setReccuring] = useState('');
  const [images, setImages] = useState([]);

  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo', selectionLimit: 10 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const selectedImages = response.assets.map(asset => ({
          uri: asset.uri,
          type: asset.type,
          name: asset.fileName,
        }));
        setImages([...images, ...selectedImages]);
      }
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('event', event);
    formData.append('desc', desc);
    formData.append('hours', hours);
    formData.append('time', time);
    formData.append('date', date);
    formData.append('venue', venue);
    formData.append('organizer', organizer);
    formData.append('reccuring', reccuring);

    images.forEach((image, index) => {
      formData.append('images', {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });
    });

    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        alert('No token found');
        return;
      }

      console.log('Token:', token); // Log the token to ensure it's being retrieved

      const response = await fetch('https://nss-server-zunb.onrender.com/api/admin/event/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      console.log('Response:', response); // Log the response object

      const responseBody = await response.json();
      console.log('Response Body:', responseBody); // Log the response body

      if (response.status === 201) {
        alert('Event created successfully');
      } else {
        alert(`Failed to create event: ${responseBody.message}`);
      }
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to create event');
    }
  };
  const removeImage = (uri) => {
    setImages(images.filter(image => image.uri !== uri));
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
      >Add Event</Text>
      </View>
      <View>
      <TouchableOpacity
          style={styles.container}
          >
        <TextInput style={styles.text}placeholder="Event" value={event} onChangeText={setEvent} placeholderTextColor={'grey'}/>
        </TouchableOpacity>
      <TouchableOpacity
          style={styles.container}
          >
        <TextInput style={styles.text} placeholder="Description" value={desc} onChangeText={setDesc} placeholderTextColor={'grey'}/>
        </TouchableOpacity>
      <TouchableOpacity
          style={styles.container}
          >
        <TextInput style={styles.text} placeholder="Hours" value={hours} onChangeText={setHours}  placeholderTextColor={'grey'}/>
        </TouchableOpacity>
      <TouchableOpacity
          style={styles.container}
          >
        <TextInput style={styles.text} placeholder="Time" value={time} onChangeText={setTime}  placeholderTextColor={'grey'}/>
        </TouchableOpacity>
      <TouchableOpacity
          style={styles.container}
          >
        <TextInput style={styles.text} placeholder="Date" value={date} onChangeText={setDate}  placeholderTextColor={'grey'}/>
        </TouchableOpacity>
      <TouchableOpacity
          style={styles.container}
          >
        <TextInput style={styles.text}placeholder="Venue" value={venue} onChangeText={setVenue} placeholderTextColor={'grey'}/>
        </TouchableOpacity>
      <TouchableOpacity
          style={styles.container}
          >
        <TextInput style={styles.text}placeholder="Organizer" value={organizer} onChangeText={setOrganizer} placeholderTextColor={'grey'}/>
        </TouchableOpacity>
      <TouchableOpacity
          style={styles.container}
          >
        <TextInput style={styles.text}placeholder="Reccuring" value={reccuring} onChangeText={setReccuring} placeholderTextColor={'grey'}/>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.image1} onPress={pickImage} >
        <Text style={styles.imageText}>+ Upload Images</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          {images.map((image, index) => (
            <View key={index} style={styles.imageWrapper}>
              <TouchableOpacity onPress={() => removeImage(image.uri)}>
                <Image source={{ uri: image.uri }} style={styles.image} />
                <Text style={styles.removeText}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
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
            Add Event
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
export default AddEvent;
