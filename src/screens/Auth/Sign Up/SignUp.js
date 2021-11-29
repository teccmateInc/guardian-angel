import React, {useState, useRef, useContext} from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';

//Style
import Style, {Theme} from '../../../../style';
import {HelperText} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';

//Component
import TextInput from '../../../components/Input/TextInputField';
import Btn from '../../../components/Button/Btn';

//Context
import {AuthContext} from '../../Context/AuthContext';
import {LanguageContext} from '../../Context/LanguageContext';

export default function SignUp(props) {
  const {setActive, navigation} = props;

  //Context
  const {signUp} = useContext(AuthContext);
  const {Lang} = useContext(LanguageContext);

  //State
  const [status, setStatus] = useState(true);
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(false);
  const [pass, setPass] = useState('');
  const [privacy, setPrivacy] = useState(true);
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

  const btnActivity =
    valid !== false &&
    email !== '' &&
    pass !== '' &&
    confirmPass !== '' &&
    username !== '' &&
    confirmPass === pass &&
    pass.length >= 8
      ? false
      : true;

  //Animation
  const fadeIn =
    status === true ? 'fadeIn' : status === false ? 'fadeOut' : null;
  const fadeRight =
    status === true ? 'fadeInRight' : status === false ? 'fadeOutRight' : null;
  const fadeUp =
    status === true ? 'fadeInUp' : status === false ? 'fadeOutDown' : null;

  return (
    <View>
      <View style={{display: 'flex', justifyContent: 'center'}}>
        <Animatable.View
          animation={fadeRight}
          duration={800}
          delay={1000}
          style={Style.AuthView}>
          <Text style={Style.AuthHeading}>Create</Text>

          <Animatable.View animation={fadeUp} duration={800} delay={1400}>
            <Text style={Style.AuthSubHeading}>{Lang[21]}!</Text>
          </Animatable.View>
        </Animatable.View>

        <Animatable.View animation={fadeUp} duration={800} delay={1200}>
          <TextInput
            leftIcon="account"
            label={Lang[0]}
            value={username}
            onChangeText={text => setName(text)}
          />
        </Animatable.View>

        <Animatable.View animation={fadeUp} duration={800} delay={1400}>
          <TextInput
            leftIcon="email"
            label={Lang[1]}
            value={email}
            onChangeText={text => validateEmail(text)}
          />
          <HelperText
            type="error"
            visible={emailErrors()}
            style={{marginHorizontal: 20}}>
            * {Lang[1]} address is invalid!
          </HelperText>
        </Animatable.View>

        <Animatable.View
          animation={fadeUp}
          duration={800}
          delay={1600}
          style={Style.AuthPassword}>
          <TextInput
            style={{flex: 1, marginRight: 5}}
            leftIcon="lock"
            rightIcon={privacy ? 'eye' : 'eye-off'}
            rightIconPress={() => setPrivacy(!privacy)}
            secureTextEntry={privacy}
            label={Lang[2]}
            value={pass}
            onChangeText={text => setPass(text)}
          />
          <TextInput
            style={{flex: 1, marginLeft: 5}}
            leftIcon="lock"
            secureTextEntry={privacy}
            label="Confirm"
            value={confirmPass}
            onChangeText={text => setConfirmPass(text)}
          />
        </Animatable.View>

        <Animatable.View animation={fadeUp} duration={800} delay={1600}>
          <HelperText
            type="error"
            visible={passErrors()}
            style={{marginHorizontal: 20}}>
            {pass.length <= 8
              ? `* your ${Lang[2]} should be at least enter 8 character long!`
              : `* Those ${Lang[2]}s didn’t match. Try again!`}
          </HelperText>
        </Animatable.View>

        <Animatable.View
          animation={fadeIn}
          duration={800}
          delay={800}
          style={Style.flexContainer}>
          <Text style={Style.AuthPara}>
            By Signing Up you agree to all{' '}
            <Text
              style={{color: Theme.colors.primary}}
              onPress={() =>
                Linking.openURL(
                  'https://my-guardian-angels.web.app/terms-and-condition',
                )
              }>
              Terms and Condition
            </Text>{' '}
            of Guardian Angel
          </Text>
          <Btn
            icon="login"
            disabled={btnActivity}
            onPress={() => handelSignUp()}
            label="Sign Up"
          />
        </Animatable.View>
        <Animatable.View
          animation={fadeIn}
          duration={800}
          delay={800}
          style={Style.flexContainer}>
          <Text style={Style.AuthPara}>
            Already have an account.{' '}
            <TouchableOpacity onPress={() => navigateSignIn()}>
              <Text style={Style.AuthParaHighlight}>{Lang[17]}!</Text>
            </TouchableOpacity>
          </Text>
        </Animatable.View>
      </View>
    </View>
  );
}
