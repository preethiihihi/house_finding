import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity  } from 'react-native';
import axios from 'axios';


const Home = ({navigation , route}) => {
  const [houses, setHouses] = useState([]);
  
  const { user } = route.params;
  const userId=user;
 

  useEffect(() => {
    axios.get('http://192.168.43.40:1290/get/home')
      .then(result => setHouses(result.data))
      .catch(err => console.log("error", err));
  }, []);

  const handleClick = (user2) => {
    navigation.navigate('PersonalChat', { userId: userId, userId2: user2, add: 1 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>I am home {userId}</Text>
      <View style={styles.touch}> 
      <TouchableOpacity
        onPress={() => navigation.navigate('AddHome', { userId: userId })}
        style={styles.link}
      >
        <Text style={styles.linkText}>Add Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('ViewHome', { userId: userId })}
        style={styles.link}
      >
        <Text style={styles.linkText}>View Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Chats', { userId: userId })}
        style={styles.link}
      >
        <Text style={styles.linkText}>Chats</Text>
      </TouchableOpacity>
</View>
      
      
      <ScrollView>
        {
          houses.length === 0 ? (
            <Text>No result</Text>
          ) : (
            houses.map((house, index) => (
              <View key={index} style={styles.house}>
                <Text style={styles.user}>{house.user}</Text>
                <Text style={styles.title}>{house.title}</Text>
                <Text>Location: {house.location}</Text>
                <Text>Description: {house.description}</Text>
                <Text>Rate: {house.rate}</Text>
                <Button title="Chat" onPress={() => handleClick(house.user)} />
              </View>
            ))
          )
        }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  house: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  user: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'space-around',
   
    marginBottom: 10,  // Adjust margin bottom as needed
  },
  link: {
     paddingVertical: 10,
     paddingHorizontal: 20,
     marginBottom: 10,
     backgroundColor: '#f0f0f0',
     borderRadius: 5,
   },
   linkText: {
     fontSize: 15,
     color: '#333',
     textAlign: 'center',
   }
});

export default Home;
