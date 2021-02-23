import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Rides from "./src/screens/Rides"
import AddRide from "./src/screens/AddRide"
import RideDetails from './src/screens/RideDetails';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Rides" component={Rides} options={{
          headerStyle: { backgroundColor: 'papayawhip' },
          title: 'Fuel management'
        }} />

        <Stack.Screen name="AddRide" component={AddRide} options={{
          headerStyle: { backgroundColor: 'papayawhip' }
        }} />
        <Stack.Screen name="RideDetails" component={RideDetails} options={{
          headerStyle: { backgroundColor: 'papayawhip' }
        }} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}


export default App;