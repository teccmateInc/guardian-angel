import React, {useState, useContext} from 'react';
import {View, ScrollView, Text} from 'react-native';

//Style
import {Theme} from '../../../../style';

//--> Input
import {
  Avatar,
  Button,
  TextInput,
  IconButton,
  ActivityIndicator,
} from 'react-native-paper';

//Components
//--> Header
import Header from '../../../components/Header/Header';
//--> Image Picker
import {launchImageLibrary} from 'react-native-image-picker';

//Assets
import image from '../../../assets/Profile.png';

// Context
import {AuthContext} from '../../Context/AuthContext';

export default function EditProfile({navigation}) {
  // Calling context
  const {user, UpdateUser} = useContext(AuthContext);

  // Inputs
  const [name, setName] = useState(user[`name`]);
  const [country, setCountry] = useState(user[`country`]);
  const [city, setCity] = useState(user[`city`]);
  const [address, setAddress] = useState(user[`address`]);
  const [userAvatar, setUserAvatar] = useState(user['avatar']);
  const [updateInfo, setUpdateInfo] = useState(false);
  const [activity, setActivity] = useState(false);

  // Update Prodile Data
  const UpdateProfile = () => {
    setActivity(true);
    UpdateUser(userAvatar, name, country, city, address, updateInfo);
    setTimeout(() => {
      setActivity(false);
      resetInputs();
      navigation.navigate('Profile');
    }, 3000);
  };

  // Image Picker -->
  const handleImagePicker = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        response.assets.map(data => {
          const source = data.uri;
          console.log('Source URI --> ' + source);
          setUpdateInfo(true);
          setUserAvatar(source);
        });
      }
    });
  };

  // Reset Inputs
  const resetInputs = () => {
    setName('');
    setCity('');
    setAddress('');
  };

  return (
    <View style={{flex: 1}}>
      <Header title="Edit Profile" />

      <View style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginHorizontal: 20, marginVertical: 15}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <View style={{width: 110, height: 110}}>
                <Avatar.Image
                  size={100}
                  theme={Theme}
                  source={userAvatar !== '' ? {uri: userAvatar} : image}
                />
                <IconButton
                  style={{
                    position: 'absolute',
                    backgroundColor: '#fff',
                    borderWidth: 1,
                    borderColor: Theme.colors.accent,
                    bottom: 0,
                    right: 0,
                  }}
                  icon="pencil"
                  size={20}
                  color={Theme.colorsaccent}
                  onPress={handleImagePicker}
                />
              </View>
            </View>
            <TextInput
              mode="outlined"
              theme={Theme}
              label="Name"
              style={{marginVertical: 10}}
              onChangeText={text => setName(text)}
              value={name}
            />
            <TextInput
              mode="outlined"
              theme={Theme}
              label="Country"
              style={{marginVertical: 10}}
              onChangeText={text => setCountry(text)}
              value={country}
            />
            <TextInput
              mode="outlined"
              theme={Theme}
              label="City"
              style={{marginVertical: 10}}
              onChangeText={text => setCity(text)}
              value={city}
            />
            <TextInput
              mode="outlined"
              theme={Theme}
              label="Address"
              style={{marginVertical: 10}}
              onChangeText={text => setAddress(text)}
              value={address}
            />
            {/* <TextInput
        mode="outlined"
        theme={Theme}
        label="Contact no"
        style={{marginVertical: 10}}
        disabled={true}
        value={user[`phoneNo`]}
      /> */}
            {activity ? (
              <ActivityIndicator animating={activity} theme={Theme} />
            ) : null}
            <View style={{marginVertical: 20}}>
              <Text
                style={{
                  fontSize: 14,
                  color: Theme.colorsaccent + 85,
                  textAlign: 'center',
                }}>
                Before submitting the form make sure that you have filled the
                form with appropriate Informations!
              </Text>
              <Button
                mode="contained"
                color={Theme.colors.primary}
                onPress={UpdateProfile}>
                Update Information
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
