import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen/HomeScreen';
import ContactScreen from '../Screens/ContactScreen/ContactScreen';
import { Colors } from '../Contants/Colors/Colors';

const Stack = createStackNavigator();
export default function RootNAvigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerStyle:{backgroundColor:Colors.blue},headerTintColor:'#fff'}}>
        <Stack.Screen name="Messages" component={HomeScreen} />
        <Stack.Screen options={{headerShown:false}} name="ContactScreen" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
