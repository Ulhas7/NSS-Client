import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { View, Image, StyleSheet, FlatList, Dimensions, Text, TouchableOpacity } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const EventGallery = ({ route }) => {
  const [images, setImages] = useState(route.params.imagearray);
  const eventId = route.params.id;

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }

    return data;
  };

  const handleDelete = async (image) => {
    console.log(image);
    try {
      const response = await fetch(`https://nss-server-zunb.onrender.com/api/admin/events/${eventId}/images`, {
        method: "DELETE",
        headers: {
          'Authorization': await AsyncStorage.getItem('token'),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ imageName: image })
      });
      if (response.ok) {
        setImages((prevImages) => prevImages.filter((img) => img !== image));
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const renderItem = ({ item, index }) => {
    if (!item||item.empty) {
      return <View style={[styles.item, styles.itemInvisible]} >
        <Text style={{color:'black'}}>No more images to display</Text>
      </View>;
    }

    const itemStyle = index % 3 === 0 ? styles.itemLarge : styles.itemSmall;

    return (
      <View style={[styles.item, itemStyle]}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item)}
        >
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
        <Image source={{ uri: item }} style={styles.image} />
      </View>
    );
  };

  return (
    <FlatList
      data={formatData(images, 3)}
      style={styles.container}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    flex: 1,
    margin: 5,
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemLarge: {
    height: screenWidth / 2,
  },
  itemSmall: {
    height: screenWidth / 3,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: -3,
    right: -3,
    zIndex: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 2,
  },
  deleteButtonText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default EventGallery;
