import React, {useState} from 'react';
import {ScrollView, View, Text, Image} from 'react-native';

//Style
import Style, {Theme} from '../../../style';

//Library
import * as Animatable from 'react-native-animatable';

//Screens
import SignIn from './Sign In/SignIn';
import SignUp from './Sign Up/SignUp';
import Recovery from './Sign In/Recovery';
import SocialLogin from './SocialLogin';

//Assets
import Banner01 from '../../assets/banners/Banner-01.png';

export default function Registration({navigation}) {
  const [active, setActive] = useState('signin');

  // console.log(height / 2.6);
  return (
    <View style={{backgroundColor: Theme.colors.accent, flex: 1}}>
      <View style={Style.flexContainer}>
        <Image source={Banner01} style={{width: 340, height: 250}} />
      </View>

      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        delay={1000}
        style={{
          flex: 1,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          borderColor: Theme.colors.placeholder,
          borderWidth: 5,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {active === 'signin' ? (
            <SignIn navigation={navigation} setActive={setActive} />
          ) : active === 'signup' ? (
            <SignUp setActive={setActive} navigation={navigation} />
          ) : active === 'recovery' ? (
            <Recovery setActive={setActive} />
          ) : null}
          {active === 'recovery' ? null : (
            <View>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    backgroundColor: Theme.colors.placeholder,
                    height: 2,
                    flex: 1,
                    alignSelf: 'center',
                  }}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    paddingHorizontal: 5,
                    fontSize: 24,
                    fontFamily: 'Montserrat-Bold',
                    color: Theme.colors.primary,
                  }}>
                  OR
                </Text>
                <View
                  style={{
                    backgroundColor: Theme.colors.placeholder,
                    height: 2,
                    flex: 1,
                    alignSelf: 'center',
                  }}
                />
              </View>
              <SocialLogin />
            </View>
          )}
        </ScrollView>
      </Animatable.View>
    </View>
  );
}
