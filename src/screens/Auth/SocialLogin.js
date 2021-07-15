import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import auth from '@react-native-firebase/auth';

const Social = [
  {
    icon: 'logo-google',
    title: 'Google',
    color: '#BF211E',
    path: () => alert('Login with Google'),
  },
  {
    icon: 'logo-facebook',
    title: 'Facebook',
    color: '#4689EC',
    path: () => handleFBLogin(),
  },
  {
    icon: 'logo-apple',
    title: 'Apple',
    color: '#000000',
    path: () => alert('Login with Apple'),
  },
];

const handleFBLogin = async () => {
  try {
    // Login the User and get his public profile and email id.
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    // If the user cancels the login process, the result will have a
    // isCancelled boolean set to true. We can use that to break out of this function.
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Get the Access Token
    const data = await AccessToken.getCurrentAccessToken();

    // If we don't get the access token, then something has went wrong.
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Use the Access Token to create a facebook credential.
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Use the facebook credential to sign in to the application.
    return auth().signInWithCredential(facebookCredential);
  } catch (error) {
    alert(error);
  }
};

export default function SocialLogin(props) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      }}>
      {Social.map(data => {
        return (
          <Animatable.View
            key={data.title}
            animation="zoomIn"
            duration={400}
            delay={200}>
            <TouchableOpacity
              onPress={data.path}
              style={{
                width: 90,
                height: 90,
                backgroundColor: '#fff',
                elevation: 8,
                borderColor: data.color,
                borderWidth: 3,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10,
              }}>
              <Ionicons name={data.icon} size={30} color={data.color} />
              <Text
                style={{
                  fontFamily: 'Montserrat-Medium',
                  fontSize: 12,
                  color: data.color,
                  marginTop: 5,
                }}>
                {data.title}
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        );
      })}
    </View>
  );
}
