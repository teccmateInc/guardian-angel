import React, {useContext} from 'react';
import {View, Text, ScrollView} from 'react-native';

// Style
import Style, {Theme} from '../../../style';
import {Button} from 'react-native-paper';

// Components
// --> Header
import {ProfileHeader} from '../../components/Header/Header';
// --> List
import ListItem from '../../components/List/ListItem';
// --> Map
import Maps from '../../components/Maps/Maps';

//Context
import {AuthContext} from '../Context/AuthContext';
import {LocationContext} from '../Context/LocationContext';

export default function Profile({navigation}) {
  //Context
  const {user, handleSignOut} = useContext(AuthContext);
  const {currentLongitude, currentLatitude} = useContext(LocationContext);

  console.log('User Id --> ' + user['uid']);

  return (
    <View style={{backgroundColor: Theme.colors.accent + 80, flex: 1}}>
      <ProfileHeader title="My Profile" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginVertical: 20}}>
          <Text style={Style.H3}>Evidence Time Period:</Text>
          <ListItem
            title="Default Recording Time:"
            icon="clock"
            data={user['timePeriod'] + ' mins'}
          />
        </View>
        <View style={{marginVertical: 20}}>
          <Text style={Style.H3}>Personal Information:</Text>
          <ListItem
            title="Phone Number:"
            icon="phone"
            data={user['phoneNumber']}
          />
          <ListItem title="Gender:" icon="account" data={user['gender']} />
          <ListItem
            title="Date of Birth:"
            icon="calendar-today"
            data={user['DOB']}
          />
        </View>

        <View style={{marginVertical: 20}}>
          <Text style={Style.H3}>Address:</Text>
          <ListItem title="Country:" icon="map-marker" data={user['country']} />
          <ListItem
            title="City:"
            icon="city-variant-outline"
            data={user['city']}
          />
          <ListItem
            title="Complete Street Address:"
            icon="home"
            data={user['address']}
          />
        </View>

        {/* <Maps /> */}
        <View style={{flex: 1}}>
          <Maps
            currentLongitude={currentLongitude}
            currentLatitude={currentLatitude}
          />
        </View>
        <View>
          <Button
            style={{width: 300, margin: 10, alignSelf: 'center'}}
            color="#bf211e"
            // icon="microphone"
            mode="contained"
            onPress={() => handleSignOut(navigation)}>
            Sign Out
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
