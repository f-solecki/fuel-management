import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Image, View } from 'react-native'

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
          headerRight: () => (<View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => alert('This is a trash!')}
            >
              <Image
                source={require('./src/img/trash.png')}
                style={{ height: 30, width: 30, marginRight: 20 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert('This is an edit!')}
            >
              <Image
                source={require('./src/img/edit.png')}
                style={{ height: 30, width: 30, marginRight: 20 }}
              />

            </TouchableOpacity>
          </View>
          ),
          headerStyle: { backgroundColor: 'papayawhip' }
        }} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}


export default App;