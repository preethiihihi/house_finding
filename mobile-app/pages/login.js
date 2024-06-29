import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");

  const handleclick = () => {
    axios.post('http://192.168.43.40:1290/login', { user: user, passw: pass })
      .then((result) => {
        if (result.data.msg === true) {
          navigation.navigate('Home', { user: user });
        } else {
          setMsg(result.data.msg);
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUser}
        value={user}
      />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPass}
        value={pass}
        secureTextEntry
      />
      <Button title="Submit" onPress={handleclick} />
      <Text onPress={() => navigation.navigate('Register')}>Register</Text>
      <Text>{msg}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Login;
