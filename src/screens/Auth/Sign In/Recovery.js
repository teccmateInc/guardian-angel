import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

//Style
import {Theme} from '../../../../style';

import {Button, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

//Context
import {AuthContext} from '../../Context/AuthContext';

export default function Recovery(props) {
  const {navigation, setActive} = props;

  //Context
  const {recoverPass} = useContext(AuthContext);

  //States
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(false);
  const [status, setStatus] = useState(true);

  const validateEmail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    reg.test(text) === false
      ? (setEmail(text), setValid(false))
      : (setEmail(text), setValid(true));
  };

  const handleRecoverPass = () => {
    valid ? recoverPass(email) : alert('Invalid Email or Email Dont Exist!');
  };

  const switchBTWScreen = () => {
    // alert(status);
    setStatus(!status);
    setTimeout(() => {
      setActive('signin');
    }, 1500);
  };

  return (
    <View>
      <Animatable.View
        animation={
          status === true
            ? 'fadeInRight'
            : status === false
            ? 'fadeOutRight'
            : null
        }
        duration={800}
        delay={1000}
        style={{marginHorizontal: 20, marginBottom: 10}}>
        <Text
          style={{
            fontSize: 50,
            // fontWeight: 'bold',
            color: Theme.colors.placeholder,
            letterSpacing: 2,
            fontFamily: 'Montserrat-Bold',
          }}>
          Recover
        </Text>
        <Animatable.View
          animation={
            status === true
              ? 'fadeInUp'
              : status === false
              ? 'fadeOutDown'
              : null
          }
          duration={800}
          delay={1400}>
          <Text
            style={{
              fontSize: 32,
              color: Theme.colors.primary,
              lineHeight: 40,
              fontFamily: 'Montserrat-Light',
            }}>
            Your Password!
          </Text>
        </Animatable.View>
      </Animatable.View>
      <Animatable.View
        animation={
          status === true ? 'fadeInUp' : status === false ? 'fadeOutDown' : null
        }
        duration={800}
        delay={1000}>
        <TextInput
          left={
            <TextInput.Icon
              name={() => (
                <Icon name="mail" size={20} color={Theme.colors.primary} />
              )}
            />
          }
          style={{marginHorizontal: 25, marginVertical: 5}}
          mode="outlined"
          theme={Theme}
          label="Registered Email"
          placeholder="Enter your Registered Email!"
          value={email}
          onChangeText={text => validateEmail(text)}
        />
      </Animatable.View>

      <Animatable.View
        animation={
          status === true ? 'fadeIn' : status === false ? 'fadeOut' : null
        }
        duration={800}
        delay={800}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            margin: 20,
            textAlign: 'center',
            color: '#aaa',
          }}>
          After pressing the button Please{' '}
          <Text style={{color: Theme.colors.primary}}>check your Email!</Text>{' '}
          If you can't find our email then check your{' '}
          <Text style={{color: Theme.colors.primary}}>SPAM mailBox!</Text>
        </Text>
        <Button
          style={{width: 300, margin: 5}}
          color={Theme.colors.primary}
          icon="link"
          mode="contained"
          onPress={() => handleRecoverPass()}>
          Send Me Recovery Link!
        </Button>
      </Animatable.View>

      <Animatable.View
        animation={
          status === true ? 'fadeIn' : status === false ? 'fadeOut' : null
        }
        duration={800}
        delay={800}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            margin: 20,
            textAlign: 'center',
            color: '#aaa',
          }}>
          If you just got it. Then{' '}
          <TouchableOpacity onPress={() => switchBTWScreen()}>
            <Text
              style={{
                color: Theme.colors.primary,
                top: 3,
              }}>
              Sign In!
            </Text>
          </TouchableOpacity>
        </Text>
      </Animatable.View>
    </View>
  );
}
