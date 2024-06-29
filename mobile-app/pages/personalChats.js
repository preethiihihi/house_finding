import React, { useState, useEffect,useRef } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';


function Personalchat({ navigation, route }) {
  const { userId, userId2, add } = route.params;
  const [sta, setSta] = useState(add);
  const [msgs, setMsgs] = useState([]);
  const [newmsg, setNewmsg] = useState("");
  const scrollViewRef = useRef();
  let socket;
  useEffect(() => {

    socket = new WebSocket('ws://192.168.43.40:1291');

  
    socket.onopen = () => {
      //console.log('WebSocket connected');
    }; })

  useEffect(() => {
   

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      //setMsgs((prevMsgs) => [...prevMsgs, message]);
      if ((message.user1 === userId && message.user2 === userId2) ||
          (message.user1 === userId2 && message.user2 === userId)) {
        setMsgs((prevMsgs) => [...prevMsgs, message]);
        // Scroll to the bottom of the chat history
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }
    };
    

  
    axios.get(`http://192.168.43.40:1290/with/${userId}/${userId2}`)
      .then((response) => {
        setMsgs(response.data.results);
      })
      .catch((err) => console.log(err));

    return () => {
      socket.close();
    };
  }, [userId, userId2]);

  const handleSubmit = () => {
    if (!newmsg.trim()) return;

    const newChatMessage = { user1: userId, user2: userId2, message: newmsg };

    
      socket.send(JSON.stringify(newChatMessage));
    

    // Update the local state
    //setMsgs((prevMsgs) => [...prevMsgs, newChatMessage]);

    axios.post('http://192.168.43.40:1290/chats/create', {
      user1: userId,
      user2: userId2,
      message: newmsg,
      add: sta
    })
    .then((res) => {
      if (sta === 1) setSta(0);
    })
    .catch((err) => console.log(err));

    setNewmsg("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.userIdText}>{userId2}</Text>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        <View style={styles.chatHistory}>
          {msgs.map((msg, index) => (
            <View key={index} style={styles.messageItem}>
              <Text>{msg.user1}: {msg.message}</Text>
            </View>
          ))}
          {msgs.length === 0 && <Text>No messages</Text>}
        </View>
      </ScrollView>
      <View style={styles.chatInput}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={newmsg}
          onChangeText={(txt) => setNewmsg(txt)}
        />
        <Button title="Send" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  chatContainer: {
    flexGrow: 1,
  },
  chatHistory: {
    justifyContent: 'flex-end',
  },
  messageItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  chatInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginRight: 10,
  },
  userIdText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Personalchat;
