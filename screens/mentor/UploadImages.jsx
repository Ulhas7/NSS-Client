import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '@react-navigation/routers/lib/typescript/src/CommonActions';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';

const UploadImages = (props) => {
  const { reccuring, event, date, time, desc, id, venue } = props.route.params;
  const [images, setImages] = useState([]);

  const pickImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo', selectionLimit: 4 }, (response) => {
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
        setImages([...images, ...selectedImages].slice(0, 4));
      }
    });
  };

  const removeImage = (uri) => {
    setImages(images.filter(image => image.uri !== uri));
  };

  const submitImages = async () => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('images', {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });
    });

    try {
      const response = await fetch(`https://nss-server-zunb.onrender.com/api/mentor/uploadPhoto/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': await AsyncStorage.getItem('token'),
        },
        body: formData,
      });

      const responseBody = await response.json();
      if (response.status === 200) {
        alert('Photos uploaded successfully');
            props.navigation.navigate('UpdateEventPicture');
      } else {
        alert(`Failed to upload photos: ${responseBody.message}`);
      }
    } catch (error) {
      console.error('Error uploading photos:', error);
      alert('Failed to upload photos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>{event}</Text>
      <View style={styles.timeContainer}>
        <Text style={styles.timeDate}>{time} , {date}</Text>
      </View>
      <Text style={styles.recurring}>{reccuring}</Text>
      <ScrollView style={styles.descriptionContainer}>
        <Text style={styles.description}>{desc}</Text>
      </ScrollView>
      <Text style={styles.venue}>VENUE :- {venue}</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadButtonText}>PICK IMAGES</Text>
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

      <Button title="Submit Images" onPress={submitImages} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  eventName: {
    padding: 10,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "black",
  },
  timeDate: {
    fontSize: 16,
    color: '#2b242c',
    marginBottom: 10,
  },
  recurring: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '700',
    color: "black",
  },
  descriptionContainer: {
    flex: 1,
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "black",
  },
  timeContainer: {
    marginBottom: 10,
    paddingTop: 10,
    backgroundColor: '#b493ea',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: "60%",
    height: "9%",
    justifyContent: "center",
    alignItems: "center",
  },
  venue: {
    fontSize: 16,
    color: "black",
    marginBottom: 10,
    marginTop: 20,
    fontWeight: '700',
  },
  uploadButton: {
    backgroundColor: '#3b1c6d',
    padding: 10,
    borderRadius: 18,
    justifyContent: 'center',
    marginTop: 20,
  },
  uploadButtonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
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

export default UploadImages;
