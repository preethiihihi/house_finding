import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';


const Chats = ({ navigation, route }) => {
  const { userId } = route.params; // Assuming you're using useParams for routing params
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`http://192.168.43.40:1290/chats/with/${userId}`)
      .then((resp) => {
        setData(resp.data.chats);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]); // Ensure useEffect dependency is set correctly

  const handleChatPress = (user2) => {
    navigation.navigate('PersonalChat', { userId:userId, userId2:user2, add:0 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{userId}</Text>
      {data.length === 0 ? (
        <Text>No results</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chatItem}
              onPress={() => handleChatPress(item)}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      )}
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
  chatItem: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
});

export default Chats;
