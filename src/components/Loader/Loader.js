import React from 'react';
import {View, Text, Image} from 'react-native';

//Style
import Style from '../../../style';

//Animation
import * as Animatable from 'react-native-animatable';

//Assets
import logo from '../../assets/logo.png';

export default function Loader() {
  return (
    <View style={Style.LoaderContainer}>
      <Animatable.View
        animation="fadeIn"
        iterationCount="infinite"
        iterationDelay={1000}
        easing="ease-in-out"
        direction="alternate">
        <Image
          source={logo}
          style={{width: 200, height: 200, resizeMode: 'contain'}}
        />
      </Animatable.View>
      <Text style={Style.LoaderText}>Please Wait for a while!</Text>
    </View>
  );
}
