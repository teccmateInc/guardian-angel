import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

//Style
import Style, {Theme} from '../../../../style';
import * as Animatable from 'react-native-animatable';

//Component
//--> Button
import Btn from '../../../components/Button/Btn';
//--> Text Input
import TextInput from '../../../components/Input/TextInputField';

//Context
import {AuthContext} from '../../Context/AuthContext';

export default function Recovery(props) {
  const {setActive} = props;

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
        <Text style={Style.AuthHeading}>Recover</Text>

        <Animatable.View animation={fadeUp} duration={800} delay={1400}>
          <Text style={Style.AuthSubHeading}>Your Password!</Text>
        </Animatable.View>
      </Animatable.View>

      <Animatable.View animation={fadeUp} duration={800} delay={1000}>
        <TextInput
          leftIcon="email"
          label="Registered Email"
          placeholder="Enter your Registered Email!"
          value={email}
          onChangeText={text => validateEmail(text)}
        />
      </Animatable.View>

      <Animatable.View
        animation={fadeIn}
        duration={800}
        delay={800}
        style={Style.flexContainer}>
        <Text style={Style.AuthPara}>
          After pressing the button Please{' '}
          <Text style={{color: Theme.colors.primary}}>check your Email!</Text>{' '}
          If you can't find our email then check your{' '}
          <Text style={{color: Theme.colors.primary}}>SPAM mailBox!</Text>
        </Text>
        <Btn
          icon="link"
          onPress={() => handleRecoverPass()}
          label="Send Me Recovery Link!"
        />
      </Animatable.View>

      <Animatable.View
        animation={fadeIn}
        duration={800}
        delay={800}
        style={Style.flexContainer}>
        <Text style={Style.AuthPara}>
          If you just got it. Then{' '}
          <TouchableOpacity onPress={() => switchBTWScreen()}>
            <Text style={Style.AuthParaHighlight}>Sign In!</Text>
          </TouchableOpacity>
        </Text>
      </Animatable.View>
    </View>
  );
}
