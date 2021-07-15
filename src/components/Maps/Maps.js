import React, {useContext} from 'react';
import {View, Text} from 'react-native';

//Style
import {Theme, width} from '../../../style';
import {Avatar} from 'react-native-paper';

//Assets
import Profile from '../../assets/Profile.png';

//Maps
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export default function Maps(props) {
  const {currentLatitude, currentLongitude} = props;

  const lat = Number(currentLatitude);
  const long = Number(currentLongitude);

  return (
    <MapView
      style={{width: width, height: 250}}
      provider={PROVIDER_GOOGLE}
      // showsUserLocation
      initialRegion={{
        latitude: lat,
        longitude: long,
        latitudeDelta: 0.0005,
        longitudeDelta: 0.0005,
      }}>
      <Marker
        coordinate={{latitude: lat, longitude: long}}
        style={{width: 50, height: 50}}>
        <Avatar.Image theme={Theme} size={35} source={Profile} />
      </Marker>
    </MapView>
  );
}
