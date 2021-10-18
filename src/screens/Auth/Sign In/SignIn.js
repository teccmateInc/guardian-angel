import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

//Style
import Style, {Theme} from '../../../../style';
import {Button} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

//Component
//--> Button
import Btn from '../../../components/Button/Btn';
//--> TextInput
import TextInput from '../../../components/Input/TextInputField';

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
  const [check, setCheck] = useState(false);

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
      ? (signIn(email, pass, navigation, setCheck), setEmail(''), setPass(''))
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

  //Animation
  const fadeIn =
    status === true ? 'fadeIn' : status === false ? 'fadeOut' : null;
  const fadeRight =
    status === true ? 'fadeInRight' : status === false ? 'fadeOutRight' : null;
  const fadeUp =
    status === true ? 'fadeInUp' : status === false ? 'fadeOutDown' : null;

  return (
    <View>
      <Animatable.View
        animation={fadeRight}
        duration={800}
        delay={1000}
        style={Style.AuthView}>
        <Text style={Style.AuthHeading}>Welcome</Text>

        <Animatable.View animation={fadeUp} duration={800} delay={1400}>
          <Text style={Style.AuthSubHeading}>Back!</Text>
        </Animatable.View>
      </Animatable.View>

      <Animatable.View animation={fadeUp} duration={800} delay={1000}>
        <TextInput
          leftIcon="email"
          label="Email"
          value={email}
          onChangeText={text => validateEmail(text)}
        />
      </Animatable.View>

      <Animatable.View animation={fadeUp} duration={800} delay={1200}>
        <TextInput
          leftIcon="lock"
          secureTextEntry={true}
          label="Password"
          value={pass}
          onChangeText={text => setPass(text)}
        />
      </Animatable.View>

      <Animatable.View
        animation={fadeIn}
        duration={800}
        delay={800}
        style={Style.flexEndContainer}>
        <Btn
          style={{marginHorizontal: 25, marginBottom: 10}}
          mode="text"
          onPress={() => forgottenPass()}
          label="Forgotten Password?"
        />
      </Animatable.View>

      <Animatable.View
        animation={fadeIn}
        duration={800}
        delay={800}
        style={Style.flexContainer}>
        <Btn
          icon="login"
          disabled={check}
          onPress={() => login()}
          label="Sign In"
        />
      </Animatable.View>

      <Animatable.View
        animation={fadeIn}
        duration={800}
        delay={800}
        style={Style.flexContainer}>
        <Text style={Style.AuthPara}>
          Dont have an account. Create one by{' '}
          <TouchableOpacity onPress={() => switchBTWScreen()}>
            <Text style={Style.AuthParaHighlight}>Signing Up!</Text>
          </TouchableOpacity>
        </Text>
      </Animatable.View>
    </View>
  );
}
