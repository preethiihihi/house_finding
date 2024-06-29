import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import ViewHome from './pages/viewHome';
import AddHome from './pages/addHome';
import Chats from './pages/chats';
import Personalchat from './pages/personalChats';


export default function App() {
    const Stack = createStackNavigator();
    return (
      <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ViewHome" component={ViewHome} />
          <Stack.Screen name="AddHome" component={AddHome} />
          <Stack.Screen name ="Chats" component={Chats}/>
          <Stack.Screen name="PersonalChat" component={Personalchat}/>
        </Stack.Navigator>
      </NavigationContainer>
      </>
    );
}

/*
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */
