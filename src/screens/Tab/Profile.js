import React, {useContext} from 'react';
import {View, Text, ScrollView} from 'react-native';

// Style
import Style, {Theme} from '../../../style';

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
import {LanguageContext} from '../Context/LanguageContext';

export default function Profile({navigation}) {
  //Context
  const {user} = useContext(AuthContext);
  const {Lang} = useContext(LanguageContext);
  const {currentLongitude, currentLatitude} = useContext(LocationContext);

  return (
    <View style={{backgroundColor: Theme.colors.accent + 80, flex: 1}}>
      <ProfileHeader
        title={Lang[15]}
        btnLabel={Lang[16]}
        name={user['name']}
        email={user['email']}
        avatar={user['avatar']}
        navigation={navigation}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginVertical: 20}}>
          <Text style={Style.H3}>Now Connected:</Text>
          <ListItem
            title="Hurray! Verified"
            icon="alert"
            data="You are now connected with our My Guardian Angel Application v1.0.16"
          />
        </View>
        <View style={{marginVertical: 20}}>
          <Text style={Style.H3}>{Lang[4]}:</Text>
          <ListItem
            title={Lang[7]}
            icon="clock"
            data={user['timePeriod'] + ' mins'}
          />
        </View>
        <View style={{marginVertical: 20}}>
          <Text style={Style.H3}>{Lang[5]}:</Text>
          <ListItem title={Lang[8]} icon="phone" data={user['phoneNumber']} />
          <ListItem title={Lang[9]} icon="account" data={user['gender']} />
          <ListItem title={Lang[10]} icon="calendar-today" data={user['DOB']} />
        </View>

        <View style={{marginVertical: 20}}>
          <Text style={Style.H3}>{Lang[6]}:</Text>
          <ListItem title={Lang[11]} icon="map-marker" data={user['country']} />
          <ListItem
            title={Lang[12]}
            icon="city-variant-outline"
            data={user['city']}
          />
          <ListItem title={Lang[13]} icon="home" data={user['address']} />
        </View>

        {/* <Maps /> */}
        <View style={{flex: 1}}>
          <Maps
            currentLongitude={currentLongitude}
            currentLatitude={currentLatitude}
          />
        </View>
        {/* <View>
          <Button
            style={{
              width: 300,
              margin: 10,
              alignSelf: 'center',
            }}
            color="#bf211e"
            // icon="microphone"
            mode="contained"
            onPress={() => handleSignOut(navigation)}>
            Sign Out
          </Button>
        </View> */}
      </ScrollView>
    </View>
  );
}
