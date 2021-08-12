import React, {useState, useRef, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

//Style
import {Theme, width} from '../../../../style';

import {Button, TextInput, HelperText} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
// import PhoneInput from 'react-native-phone-number-input';

//Context
import {AuthContext} from '../../Context/AuthContext';

export default function SignUp(props) {
  const {setActive, navigation} = props;

  //Context
  const {signUp} = useContext(AuthContext);

  //State
  const [status, setStatus] = useState(true);
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(false);
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const validateEmail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    reg.test(text) === false
      ? (setEmail(text), setValid(false))
      : (setEmail(text), setValid(true));
  };

  const navigateSignIn = () => {
    setStatus(!status);
    // alert(status);
    setTimeout(() => {
      setActive('signin');
    }, 1500);
  };

  const handelSignUp = async () => {
    await signUp(email, pass, username, navigation);
  };

  const emailErrors = () => {
    return !email.includes('@') && email !== '';
  };

  const passErrors = () => {
    return (
      (pass !== confirmPass && pass !== '' && confirmPass !== '') ||
      pass.length <= 8
    );
  };

  // console.log(
  //   valid !== false &&
  //     email !== '' &&
  //     pass !== '' &&
  //     confirmPass !== '' &&
  //     username !== '' &&
  //     confirmPass === pass &&
  //     pass.length >= 8
  //     ? 'False'
  //     : 'True',
  // );

  return (
    <View>
      <View style={{display: 'flex', justifyContent: 'center'}}>
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
            Create
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
              Your own Account!
            </Text>
          </Animatable.View>
        </Animatable.View>
        <Animatable.View
          animation={
            status === true
              ? 'fadeInUp'
              : status === false
              ? 'fadeOutDown'
              : null
          }
          duration={800}
          delay={1200}>
          <TextInput
            left={
              <TextInput.Icon
                name={() => (
                  <Icon name="user" size={20} color={Theme.colors.primary} />
                )}
              />
            }
            style={{
              marginHorizontal: 25,
              marginVertical: 5,
            }}
            mode="outlined"
            theme={Theme}
            label="Full Name"
            value={username}
            onChangeText={text => setName(text)}
          />
        </Animatable.View>
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
          <HelperText
            type="error"
            visible={emailErrors()}
            style={{marginHorizontal: 20}}>
            * Email address is invalid!
          </HelperText>
        </Animatable.View>
        <Animatable.View
          animation={
            status === true
              ? 'fadeInUp'
              : status === false
              ? 'fadeOutDown'
              : null
          }
          duration={800}
          delay={1600}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 5,
            marginHorizontal: 25,
            flex: 1,
          }}>
          <TextInput
            left={
              <TextInput.Icon
                name={() => (
                  <Icon name="lock" size={20} color={Theme.colors.primary} />
                )}
              />
            }
            secureTextEntry={true}
            style={{flex: 1, marginRight: 5}}
            mode="outlined"
            theme={Theme}
            label="Password"
            value={pass}
            onChangeText={text => setPass(text)}
          />
          <TextInput
            left={
              <TextInput.Icon
                name={() => (
                  <Icon name="lock" size={20} color={Theme.colors.primary} />
                )}
              />
            }
            secureTextEntry={true}
            style={{flex: 1, marginLeft: 5}}
            mode="outlined"
            theme={Theme}
            label="Confirm"
            value={confirmPass}
            onChangeText={text => setConfirmPass(text)}
          />
        </Animatable.View>
        <HelperText
          type="error"
          visible={passErrors()}
          style={{marginHorizontal: 20}}>
          {pass.length <= 8
            ? '* your password should be at least enter 8 character long!'
            : '* Those passwords didn’t match. Try again!'}
        </HelperText>

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
            By Signing Up you agree to all{' '}
            <Text style={{color: Theme.colors.primary}}>
              Terms and Condition
            </Text>{' '}
            of Guardian Angel
          </Text>
          <Button
            style={{width: 300, margin: 5}}
            color={Theme.colors.primary}
            icon="login"
            mode="contained"
            disabled={
              valid !== false &&
              email !== '' &&
              pass !== '' &&
              confirmPass !== '' &&
              username !== '' &&
              confirmPass === pass &&
              pass.length >= 8
                ? false
                : true
            }
            onPress={() => handelSignUp('Sign Up')}>
            Sign Up
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
            Already have an account.{' '}
            <TouchableOpacity onPress={() => navigateSignIn()}>
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
    </View>
  );
}
