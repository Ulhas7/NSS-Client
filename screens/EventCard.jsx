// components/EventCard.js
import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import  { useState, useEffect } from 'react';
// import RNFS from 'react-native-fs';
// {reccuring,event,date,time,desc,hours,images,venue,organizer}
const EventCard = ({ reccuring,event,date,time,desc,hours,images,venue,organizer,id,userid,mentorid }) => {
 const navigation=useNavigation();
//  const [imagePath, setImagePath] = useState(null);
//  const s3ImageUrl = images[0]; // Replace with your S3 image URL

//  useEffect(() => {
//    downloadImage();
//  }, []);

//  const downloadImage = async () => {
//    try {
//      const downloadDest = `${RNFS.DocumentDirectoryPath}/eventImg/${event}`;
//      const options = {
//        fromUrl: s3ImageUrl,
//        toFile: downloadDest,
//      };
//      const result = await RNFS.downloadFile(options).promise;
//      if (result.statusCode === 200) {
//        setImagePath(downloadDest);
//      } else {
//        console.error('Failed to download image');
//      }
//    } catch (error) {
//      console.error('Error downloading image:', error);
//    }
//  };
        const handlePress = () => {
          navigation.navigate('SpecificEvent', { reccuring,event,date,time,desc,hours,id,userid,mentorid,venue,organizer});
        };
  return (
    <TouchableOpacity style={styles.card}
    onPress={handlePress}
    >
    
      {/* <Image source={{ uri: images }} style={styles.image} /> */}
      <Image source={require("../images/nsslogo.png")} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.header}>
          <Text style={styles.eventName}>{event}</Text>
          <Text style={styles.eventTimeDate}>{date} at {time}</Text>
        </View>
        <Text style={styles.description}>Venue :{venue}</Text>
        <Text style={styles.description}>hours :{hours}</Text>
        <Text style={{
    fontSize: 0

        }}>{reccuring}</Text>
        <Text style={{
    fontSize: 0

        }}>{desc}</Text>
        <Text style={{
    fontSize: 0

        }}>{organizer}</Text>
        <Text style={{
    fontSize: 0

        }}>{id}</Text>
        <Text style={{
    fontSize: 0

        }}>{userid}</Text>
        <Text style={{
    fontSize: 0

        }}>{mentorid}</Text>
      </View>
    
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
    margin: 10,
    width: '100%',
     backgroundColor:"#C8C5E3",
    border:"2px solid",
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 6,

  },
  image: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    resizeMode: 'contain'
    
  },
  details: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  eventName: {
    fontSize: 22,
    fontWeight: 'bold',
    color:"black"
  },
  eventTimeDate: {
    fontSize: 15,
    color: '#555',
    marginTop:24,
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
});

export default EventCard;
