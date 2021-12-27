import { StatusBar } from "expo-status-bar";
// import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreens from "./components/Screens/LoginScreens";
import RegisterScreen from "./components/Screens/RegisterScreen";
import HomeScreen from "./components/Screens/HomeScreen";
import AddChat from "./components/Screens/AddChat";
import ChatScreen from "./components/Screens/ChatScreen";
import { LogBox } from 'react-native';
import {UserProvider} from './Contexts/User';
// LogBox.ignoreLogs(['Warning: ...']); 
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator()

export default function App() {

  const globalScreenOptions = {
    headerStyle:{backgroundColor: '#2C6BED'},
    headerTitleStyle: {color: 'white'},
    headerTintColor:'white'
  }

  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreenOptions}>
      <Stack.Screen name="Login" component={LoginScreens} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddChat" component={AddChat} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
