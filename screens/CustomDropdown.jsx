import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const CustomDropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View >
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.dropdown}>
        <Text style={styles.selectedText}>
          {selectedOption ? selectedOption.label : 'Select an option'}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    padding: 5,
    
  },
  selectedText: {
    fontSize: 17,
    fontWeight:"900",
    color: '#394047'

  },
  optionsContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginTop: 4,
  },
  option: {
    padding: 4,
    backgroundColor:"#C8C5E3",
    color: '#394047'
  },
  optionText: {
    fontSize: 16,
    color: '#394047'
  }
});

export default CustomDropdown;
