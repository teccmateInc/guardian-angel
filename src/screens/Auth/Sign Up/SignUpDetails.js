import React, {useState, useRef, useContext} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

//Style
import Style, {Theme} from '../../../../style';
import {Button, TextInput, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import PhoneInput from 'react-native-phone-number-input';
import DatePicker from 'react-native-date-picker';

// Context
import {AuthContext} from '../../Context/AuthContext';

export default function SignUpDetails({route, navigation}) {
  const {email, username, uid} = route.params;
  // console.log(email + ' - ' + username);

  //Context
  const {signUpInfo} = useContext(AuthContext);

  //State
  const [timePeriod, setTimePeriod] = useState('2');
  const [phoneNo, setPhoneNo] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [expandedTime, setExpandedTime] = useState(false);
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState('Male');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  //Ref
  const phoneInput = useRef(null);

  const handlePress = () => setExpanded(!expanded);

  const handlePressTime = () => setExpandedTime(!expandedTime);

  const handleGender = x => {
    setGender(x);
    setExpanded(!expanded);
  };

  const handleTimePeriod = x => {
    setTimePeriod(x);
    setExpandedTime(!expandedTime);
  };

  const DOB = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

  const handleProceed = () => {
    signUpInfo(
      uid,
      timePeriod,
      username,
      email,
      formattedValue,
      DOB,
      gender,
      country,
      city,
      address,
      navigation,
    );
  };

  // console.log('Date --> ' + DOB);

  return (
    <View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: Theme.colors.accent,
            elevation: 5,
            paddingVertical: 10,
          }}>
          <Text style={Style.H1}>Welcome to My Guardian Angel!</Text>
          <Text style={Style.H4}>
            You are only two step away from your profile
          </Text>
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            paddingVertical: 15,
          }}>
          <Text style={Style.H3}>Evidence Time Period:</Text>
          <Animatable.View animation="fadeInUp" duration={800} delay={800}>
            <Text style={Style.H5}>
              How Much Long you want to Record Evidence:
            </Text>
            <List.Accordion
              theme={Theme}
              style={{backgroundColor: '#fff'}}
              title={timePeriod + ' mins'}
              left={props => <List.Icon {...props} icon="clock-outline" />}
              expanded={expandedTime}
              onPress={handlePressTime}>
              <List.Item title="2 mins" onPress={() => handleTimePeriod('2')} />
              <List.Item title="4 mins" onPress={() => handleTimePeriod('4')} />
              <List.Item title="6 mins" onPress={() => handleTimePeriod('6')} />
              <List.Item title="8 mins" onPress={() => handleTimePeriod('8')} />
            </List.Accordion>
          </Animatable.View>
          <Text style={Style.H3}>Personal Information:</Text>
          <Animatable.View animation="fadeInUp" duration={800} delay={1000}>
            <Text style={Style.H5}>Phone Number:</Text>
            <PhoneInput
              ref={phoneInput}
              defaultValue={phoneNo}
              defaultCode="PK"
              layout="first"
              onChangeText={text => {
                setPhoneNo(text);
              }}
              onChangeFormattedText={text => {
                setFormattedValue(text);
              }}
              containerStyle={Style.PhoneInput}
            />
          </Animatable.View>
          <Animatable.View animation="fadeInUp" duration={800} delay={1200}>
            <View style={{marginVertical: 5}}>
              <Text style={Style.H5}>Date of Birth:</Text>
              <DatePicker
                style={{justifyContent: 'center', alignSelf: 'center'}}
                mode="date"
                date={date}
                onDateChange={data => setDate(data)}
              />
            </View>
          </Animatable.View>
          <Animatable.View animation="fadeInUp" duration={800} delay={1400}>
            <Text style={Style.H5}>Gender:</Text>
            <List.Accordion
              theme={Theme}
              style={{backgroundColor: '#fff'}}
              title={gender}
              left={props => <List.Icon {...props} icon="account" />}
              expanded={expanded}
              onPress={handlePress}>
              <List.Item title="Male" onPress={() => handleGender('Male')} />
              <List.Item
                title="Female"
                onPress={() => handleGender('Female')}
              />
              <List.Item title="Other" onPress={() => handleGender('Other')} />
            </List.Accordion>
          </Animatable.View>
          <Text style={Style.H3}>Address:</Text>
          <Animatable.View animation="fadeInUp" duration={800} delay={1600}>
            <Text style={Style.H5}>Country:</Text>
            <TextInput
              left={
                <TextInput.Icon
                  name={() => (
                    <Icon
                      name="map-marker"
                      size={20}
                      color={Theme.colors.primary}
                    />
                  )}
                />
              }
              style={{
                marginHorizontal: 25,
                marginVertical: 5,
              }}
              mode="outlined"
              theme={Theme}
              label="Country"
              value={country}
              onChangeText={text => setCountry(text)}
            />
          </Animatable.View>
          <Animatable.View animation="fadeInUp" duration={800} delay={1800}>
            <Text style={Style.H5}>City:</Text>
            <TextInput
              left={
                <TextInput.Icon
                  name={() => (
                    <Icon
                      name="city-variant-outline"
                      size={20}
                      color={Theme.colors.primary}
                    />
                  )}
                />
              }
              style={{
                marginHorizontal: 25,
                marginVertical: 5,
              }}
              mode="outlined"
              theme={Theme}
              label="City"
              value={city}
              onChangeText={text => setCity(text)}
            />
          </Animatable.View>
          <Animatable.View animation="fadeInUp" duration={800} delay={2000}>
            <Text style={Style.H5}>Complete Street Address:</Text>
            <TextInput
              left={
                <TextInput.Icon
                  name={() => (
                    <Icon name="home" size={20} color={Theme.colors.primary} />
                  )}
                />
              }
              style={{
                marginHorizontal: 25,
                marginVertical: 5,
              }}
              mode="outlined"
              theme={Theme}
              label="Address"
              value={address}
              onChangeText={text => setAddress(text)}
            />
          </Animatable.View>

          <Button
            style={{width: 300, margin: 10, alignSelf: 'center'}}
            color={Theme.colors.primary}
            icon="login"
            mode="contained"
            disabled={
              address !== '' &&
              city !== '' &&
              country !== '' &&
              formattedValue !== '' &&
              date !== '' &&
              gender !== '' &&
              timePeriod !== ''
                ? false
                : true
            }
            onPress={() => handleProceed('Sign Up')}>
            Proceed
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
