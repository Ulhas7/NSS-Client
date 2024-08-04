import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
function GetStarted() {
  const navigation = useNavigation();
  function onClickn(){
    navigation.navigate('LoginOption');
  }
  return (
    <View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 120,
          backgroundColor: '#f8f9fa',
          padding: 20,
          borderRadius: 10,
        }}>
        <Image
          source={require('./../images/nsslogo.png')}
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
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            color: '#de2e37',
            marginBottom: 10,
            marginTop: 50,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          NOT ME BUT YOU
        </Text>
      </View>
      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#3b1c6d',
            padding: 10,
            borderRadius: 18,
            justifyContent: 'center',
            marginTop: 120,
          }}
          onPress={() =>onClickn()}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 10,
              marginTop: 10,
            }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default GetStarted;
