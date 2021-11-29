import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';

//Style
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

//Context
import {AuthContext} from '../Context/AuthContext';

export default function SocialLogin(props) {
  const {navigation} = props;
  const {handleFacebook, handleGoogle} = useContext(AuthContext);

  const Social = [
    {
      icon: 'logo-google',
      title: 'Google',
      color: '#BF211E',
      path: () => handleGoogle(navigation),
    },
    {
      icon: 'logo-facebook',
      title: 'Facebook',
      color: '#4689EC',
      path: () => handleFacebook(navigation),
    },
    // {
    //   icon: 'logo-apple',
    //   title: 'Apple',
    //   color: '#000000',
    //   path: () => alert('Login with Apple'),
    // },
  ];
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
