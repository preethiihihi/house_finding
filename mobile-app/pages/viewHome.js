import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const ViewHome = ({ route, navigation }) => {
  const { userId } = route.params;
  const [myHomes, setMyHomes] = useState([]);

  useEffect(() => {
    axios.post('http://192.168.43.40:1290/home/mine', { user: userId }) // Replace with your server's IP address
      .then((result) => setMyHomes(result.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.post('http://192.168.43.40:1290/deletehome', { id: id }) // Replace with your server's IP address
      .then(() => {
        // Refresh the data after deletion (optional)
        axios.post('http://192.168.43.40:1290/home/mine', { user: userId })
          .then((result) => setMyHomes(result.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Error', 'Failed to delete home.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Hello {userId}</Text>
      {
        myHomes.length === 0 ? (
          <Text>No records</Text>
        ) : (
          <ScrollView style={styles.scrollView}>
            {myHomes.map((house, index) => (
              <View key={index} style={styles.homeCard}>
                <Text>{house._id}</Text>
                <Text style={styles.user}>{house.user}</Text>
                <Text style={styles.title}>{house.title}</Text>
                <Text>Location: {house.location}</Text>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(house._id)}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )
      }
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
  },
  scrollView: {
    marginTop: 10,
  },
  homeCard: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  user: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ViewHome;
