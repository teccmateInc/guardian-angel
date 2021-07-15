import React from 'react';
import {View, Text} from 'react-native';

//Navigations
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import GuardiansEdit from './Guardians/GuardiansEdit';
import GuardiansList from './Guardians/GuardiansList';

//Context
import GuardianContextProvider from '../Context/GuardianContext';

//Declear Navigation
const Stack = createStackNavigator();

export default function Guardians() {
  return (
    <GuardianContextProvider>
      <Stack.Navigator
        initialRouteName="GuardiansList"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="GuardiansList"
          component={GuardiansList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="GuardiansEdit"
          component={GuardiansEdit}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </GuardianContextProvider>
  );
}
