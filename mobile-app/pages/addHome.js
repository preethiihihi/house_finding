import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const AddHome = ({ route, navigation }) => {
  const { userId } = route.params;
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [rate, setRate] = useState("");

  const handleSubmit = () => {
    axios.post('http://192.168.43.40:1290/addhome', {
      user: userId,
      title: title,
      location: location,
      description: description,
      rate: rate
    })
    .then(() => {
      // Optionally handle success
      Alert.alert('Success', 'Home added successfully.');
     
      navigation.goBack(); 
    })
    .catch((err) => {
      console.log(err);
      Alert.alert('Error', 'Failed to add home.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Home</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Rate"
        value={rate}
        onChangeText={setRate}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AddHome;
