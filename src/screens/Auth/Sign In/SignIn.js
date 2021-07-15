import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

//Style
import {Theme} from '../../../../style';
import {Button, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

//Context
import {AuthContext} from '../../Context/AuthContext';

export default function SignIn(props) {
  const {navigation, setActive} = props;

  //Context
  const {signIn} = useContext(AuthContext);

  //State
  const [status, setStatus] = useState(true);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [valid, setValid] = useState(false);

  const validateEmail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    reg.test(text) === false
      ? (setEmail(text), setValid(false))
      : (setEmail(text), setValid(true));
  };

  const login = () => {
    // email === 'admin' && pass === 'admin'
    // ?
    valid
      ? (signIn(email, pass, navigation), setEmail(''), setPass(''))
      : alert('Invalid Credentials!');
  };

  const switchBTWScreen = () => {
    // alert(status);
    setStatus(!status);
    setTimeout(() => {
      setActive('signup');
    }, 1500);
  };

  const forgottenPass = () => {
    // alert(status);
    setStatus(!status);
    setTimeout(() => {
      setActive('recovery');
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
            color: Theme.colors.placeholder,
            letterSpacing: 2,
            fontFamily: 'Montserrat-Bold',
          }}>
          Welcome
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
              letterSpacing: 5,
              fontFamily: 'Montserrat-Light',
            }}>
            Back!
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
          label="Email"
          value={email}
          onChangeText={text => validateEmail(text)}
        />
      </Animatable.View>
      <Animatable.View
        animation={
          status === true ? 'fadeInUp' : status === false ? 'fadeOutDown' : null
        }
        duration={800}
        delay={1200}>
        <TextInput
          left={
            <TextInput.Icon
              name={() => (
                <Icon name="lock" size={20} color={Theme.colors.primary} />
              )}
            />
          }
          secureTextEntry={true}
          style={{marginHorizontal: 25, marginVertical: 5}}
          mode="outlined"
          theme={Theme}
          label="Password"
          value={pass}
          onChangeText={text => setPass(text)}
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
          alignItems: 'flex-end',
        }}>
        <Button
          style={{marginHorizontal: 25, marginBottom: 10}}
          color={Theme.colors.primary}
          // icon="login"
          mode="text"
          onPress={() => forgottenPass()}>
          Forgotten Password?
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
        <Button
          style={{width: 300}}
          color={Theme.colors.primary}
          icon="login"
          mode="contained"
          onPress={() => login()}>
          Sign In
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
          Dont have an account. Create one by{' '}
          <TouchableOpacity onPress={() => switchBTWScreen()}>
            <Text
              style={{
                color: Theme.colors.primary,
                top: 3,
              }}>
              Signing Up!
            </Text>
          </TouchableOpacity>
        </Text>
      </Animatable.View>
    </View>
  );
}
