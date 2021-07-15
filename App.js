import React from 'react';

//Config
// import config from './src/config/config';

import ContextProvider from './src/screens/Context/ContextProvider';

//Navigations
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//Screens
import Splash from './src/screens/Splash';
import Registration from './src/screens/Auth/Registration';
import SignUpDetails from './src/screens/Auth/Sign Up/SignUpDetails';
//Tab
import Tab from './src/screens/Navigation/Tab';

//Declear Navigation
const Stack = createStackNavigator();

export default function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Registration"
            component={Registration}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUpDetails"
            component={SignUpDetails}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Tab"
            component={Tab}
            // options={{headerShown: true}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}
