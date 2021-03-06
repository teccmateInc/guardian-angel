import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';

//Styles
import {Theme} from '../../style';

//Animation
import * as Animatable from 'react-native-animatable';

//Asset
// import logo from '../../assets/logo.png';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Registration');
    }, 2200);
  });
  return (
    <View
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
      }}>
      <Animatable.View
        animation="zoomOut"
        duration={400}
        delay={0}
        style={{
          backgroundColor: Theme.colors.accent,
          width: '150%',
          height: '150%',
          position: 'absolute',
        }}></Animatable.View>
      <Animatable.View
        animation="zoomOut"
        duration={600}
        delay={400}
        style={{
          backgroundColor: Theme.colors.accent + '75',
          width: '150%',
          height: '150%',
          position: 'absolute',
        }}></Animatable.View>
      <Animatable.View
        animation="zoomOut"
        duration={800}
        delay={600}
        style={{
          backgroundColor: Theme.colors.accent + '50',
          width: '150%',
          height: '150%',
          position: 'absolute',
        }}></Animatable.View>
      <Animatable.View animation="zoomIn" duration={800} delay={1000}>
        {/* <Image
          source={logo}
          style={{width: 250, height: 250, resizeMode: 'contain'}}
        /> */}
        <Text
          style={{
            fontFamily: 'Poppins-Bold',
            fontSize: 24,
            color: Theme.colors.placeholder,
          }}>
          My Guardian Angels
        </Text>
      </Animatable.View>
    </View>
  );
}
