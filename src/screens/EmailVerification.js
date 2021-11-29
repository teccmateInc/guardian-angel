import React, {useState, useContext, useEffect} from 'react';
import {View, Text, Image} from 'react-native';

//Style
import {Theme} from '../../style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Asset
import logo from '../assets/logo.png';

//Component
import Btn from '../components/Button/Btn';

//Context
import {AuthContext} from './Context/AuthContext';

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EmailVerification({navigation}) {
  const [status, setStatus] = useState(false);
  const [count, setCount] = useState(60);

  useEffect(() => {
    checkVerification();
  });

  const checkVerification = async () => {
    const getUser = await AsyncStorage.getItem('User');
    const verification = await AsyncStorage.getItem('EmailVerified');
    const emailCheck = JSON.parse(verification);
    if (getUser !== null && getUser !== {} && emailCheck) {
      navigation.replace('Tab');
    }
  };

  //Context
  const {resendVerification, handleSignOut} = useContext(AuthContext);

  const handleResend = () => {
    resendVerification();
    setStatus(true);
    setInterval(() => {
      setCount(prev => prev - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval();
      setStatus(false);
      setCount(60);
    }, 60000);
  };

  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.accent,
      }}>
      <View
        style={{
          width: 300,
          height: 300,
          backgroundColor: Theme.colors.shadow,
          elevation: 50,
          shadowColor: Theme.colors.primary,
          shadowOffset: {width: 2, height: 2},
          shadowOpacity: 1,
          shadowRadius: 5,
          borderRadius: 10,
          borderWidth: 5,
          borderColor: '#fff',
          padding: 20,
          marginBottom: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={logo}
          style={{
            width: 500,
            height: 500,
            resizeMode: 'contain',
            opacity: 0.4,
            position: 'absolute',
            // top: 0,
          }}
        />
        <Icon
          name="alert-decagram"
          size={100}
          color="#fff"
          style={{
            textShadowColor: '#000',
            textShadowRadius: 20,
          }}
        />
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'Poppins-Bold',
            textAlign: 'center',
            color: '#fff',
            textShadowColor: '#000',
            textShadowRadius: 20,
          }}>
          Please Verify your email address!
        </Text>
      </View>
      <Btn
        label="Login Back After Verification!"
        color={Theme.colors.placeholder}
        onPress={() => handleSignOut(navigation)}
      />
      <Btn
        label="Resend Verification Email!"
        color={Theme.colors.placeholder}
        disabled={status}
        onPress={() => handleResend()}
      />
      {status ? (
        <Text>You are able to resend Email after {count} sec</Text>
      ) : null}
    </View>
  );
}
