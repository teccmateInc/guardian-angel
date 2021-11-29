import React, {useEffect} from 'react';
import 'react-native-gesture-handler';

import {Theme} from '../../../style';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//Screens
import Home from '../Tab/Home';
import Evidence from '../Tab/Evidence';
import Guardians from '../Tab/Guardians';
import Profile from '../Tab/Profile';

const Tab = createBottomTabNavigator();

export default function BottomTab({navigation}) {
  useEffect(() => {
    userCheck();
  });

  const userCheck = async () => {
    const getUser = await AsyncStorage.getItem('User');
    if (getUser === null || getUser === {}) {
      navigation.replace('Registration');
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          route.name === 'Home'
            ? (iconName = focused ? 'home' : 'home-outline')
            : route.name === 'Evidence'
            ? (iconName = focused
                ? 'shield-checkmark'
                : 'shield-checkmark-outline')
            : route.name === 'Guardians'
            ? (iconName = focused ? 'people' : 'people-outline')
            : route.name === 'Profile'
            ? (iconName = focused ? 'person' : 'person-outline')
            : null;
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Theme.colors.primary,
        inactiveTintColor: Theme.colors.accent,
        style: {elevation: 0},
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Evidence" component={Evidence} />
      <Tab.Screen name="Guardians" component={Guardians} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
