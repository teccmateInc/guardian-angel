import React, {useState, useRef, useContext} from 'react';
import {View, Text, ScrollView} from 'react-native';

//Style
import Style, {Theme} from '../../../../style';
import * as Animatable from 'react-native-animatable';

//Component
//--> Button
import Btn from '../../../components/Button/Btn';
//--> Date Picker
import DatePickerInput from '../../../components/DatePicker/DatePickerInput';
//--> List
import ListAccordion from '../../../components/List/ListAccordion';
//--> TextInput
import TextInput from '../../../components/Input/TextInputField';
//--> Phone Input
import PhoneNo from '../../../components/Input/PhoneNo';

// Context
import {AuthContext} from '../../Context/AuthContext';

export default function SignUpDetails({route, navigation}) {
  const {email, username, uid} = route.params;

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

  const btnActivity =
    address !== '' &&
    city !== '' &&
    country !== '' &&
    formattedValue !== '' &&
    date !== '' &&
    gender !== '' &&
    timePeriod !== ''
      ? false
      : true;

  // console.log('Date --> ' + DOB);

  const timeList = [
    {
      title: '2 mins',
      handle: () => handleTimePeriod('2'),
    },
    {
      title: '4 mins',
      handle: () => handleTimePeriod('4'),
    },
    {
      title: '6 mins',
      handle: () => handleTimePeriod('6'),
    },
    {
      title: '8 mins',
      handle: () => handleTimePeriod('8'),
    },
    {
      title: '10 mins',
      handle: () => handleTimePeriod('10'),
    },
  ];

  const genderList = [
    {
      title: 'Male',
      handle: () => handleGender('Male'),
    },
    {
      title: 'Female',
      handle: () => handleGender('Female'),
    },
    {
      title: 'Other',
      handle: () => handleGender('Other'),
    },
  ];

  return (
    <View
      style={{
        backgroundColor: '#fff',
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            backgroundColor: Theme.colors.accent,
            elevation: 4,
            paddingVertical: 10,
            borderBottomEndRadius: 50,
          }}>
          <Text style={[Style.H1, Style.TextShadow]}>
            Welcome to My Guardian Angel!
          </Text>
          <Text style={[Style.H4, Style.TextShadow]}>
            You are only two step away from your profile
          </Text>
        </View>

        <View style={Style.paper}>
          <Text style={Style.H3}>Evidence Time Period:</Text>
          <Animatable.View animation="fadeInUp" duration={800} delay={800}>
            <Text style={Style.H5}>
              Please select your lenght of time for Evidence gathering:
            </Text>
            <ListAccordion
              title={timePeriod + ' mins'}
              leftIcon="clock-outline"
              expanded={expandedTime}
              handlePress={handlePressTime}
              ListItem={timeList}
            />
          </Animatable.View>
        </View>

        <View style={Style.paper}>
          <Text style={Style.H3}>Personal Information:</Text>
          <Animatable.View animation="fadeInUp" duration={800} delay={1000}>
            <Text style={Style.H5}>Phone Number:</Text>
            <PhoneNo
              value={phoneNo}
              onTextChange={text => setPhoneNo(text)}
              onFormatChange={text => setFormattedValue(text)}
            />
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={800} delay={1200}>
            <View style={{marginVertical: 5}}>
              <Text style={Style.H5}>Date of Birth:</Text>
              <DatePickerInput value={date} onChange={data => setDate(data)} />
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={800} delay={1400}>
            <Text style={Style.H5}>Gender:</Text>
            <ListAccordion
              title={gender}
              leftIcon="account"
              expanded={expanded}
              handlePress={handlePress}
              ListItem={genderList}
            />
          </Animatable.View>
        </View>

        <View style={Style.paper}>
          <Text style={Style.H3}>Address:</Text>
          <Animatable.View animation="fadeInUp" duration={800} delay={1600}>
            <Text style={Style.H5}>Country:</Text>
            <TextInput
              leftIcon="map-marker"
              label="Country"
              value={country}
              onChangeText={text => setCountry(text)}
            />
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={800} delay={1800}>
            <Text style={Style.H5}>City:</Text>
            <TextInput
              leftIcon="city-variant-outline"
              label="City"
              value={city}
              onChangeText={text => setCity(text)}
            />
          </Animatable.View>

          <Animatable.View animation="fadeInUp" duration={800} delay={2000}>
            <Text style={Style.H5}>Complete Street Address:</Text>
            <TextInput
              leftIcon="home"
              label="Address"
              value={address}
              onChangeText={text => setAddress(text)}
            />
          </Animatable.View>
        </View>

        <Btn
          icon="login"
          disabled={btnActivity}
          onPress={() => handleProceed()}
          label="Proceed"
        />
      </ScrollView>
    </View>
  );
}
