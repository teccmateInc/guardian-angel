import React, {useContext} from 'react';
import {View, Text} from 'react-native';

//Style
import {Theme} from '../../../style';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import {Avatar, IconButton} from 'react-native-paper';

//Image
import Profile from '../../assets/Profile.png';

export default function Header(props) {
  const {title, subtitle} = props;
  return (
    <Animatable.View animation={'fadeInDown'} duration={800} delay={1000}>
      <LinearGradient
        colors={[
          Theme.colors.placeholder,
          Theme.colors.primary,
          Theme.colors.accent,
        ]}
        start={{x: 0, y: 0.5}}
        end={{x: 0.9, y: -0.5}}
        style={{
          height: 120,
          borderBottomLeftRadius: 30,
          backgroundColor: Theme.colors.primary,
          justifyContent: 'center',
        }}>
        <Animatable.View animation={'fadeInDown'} duration={800} delay={1000}>
          {title ? (
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 42,
                color: '#fff',
                textAlign: 'center',
                textShadowColor: Theme.colors.shadow,
                textShadowOffset: {width: 4, height: 4},
                textShadowRadius: 8,
              }}>
              {title}
            </Text>
          ) : null}
        </Animatable.View>
        <Animatable.View animation={'fadeInDown'} duration={800} delay={1400}>
          {subtitle ? (
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: 16,
                color: Theme.colors.shadow,
                textAlign: 'center',
                marginBottom: 15,
              }}>
              {subtitle}
            </Text>
          ) : null}
        </Animatable.View>
      </LinearGradient>
    </Animatable.View>
  );
}

export function ProfileHeader(props) {
  const {title, name, email, avatar, navigation} = props;

  return (
    <Animatable.View animation={'fadeInDown'} duration={800} delay={1000}>
      <LinearGradient
        colors={[
          Theme.colors.placeholder,
          Theme.colors.primary,
          Theme.colors.accent,
        ]}
        start={{x: 0, y: 0.5}}
        end={{x: 0.9, y: -0.5}}
        style={{
          height: 200,
          backgroundColor: Theme.colors.primary,
          // justifyContent: 'center',
          elevation: 10,
        }}>
        <Animatable.View animation={'fadeInDown'} duration={800} delay={1000}>
          {title ? (
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 28,
                color: '#fff',
                marginVertical: 10,
                marginHorizontal: 20,
                textShadowColor: Theme.colors.shadow,
                textShadowOffset: {width: 4, height: 4},
                textShadowRadius: 8,
              }}>
              {title}
            </Text>
          ) : null}
        </Animatable.View>
        <Animatable.View
          animation={'fadeInDown'}
          duration={800}
          delay={1000}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Avatar.Image
            theme={Theme}
            size={100}
            source={avatar !== '' ? {uri: avatar} : Profile}
            style={{marginHorizontal: 20, marginVertical: 5, elevation: 10}}
          />
          <View style={{flex: 1}}>
            {name ? (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: 'Montserrat-Bold',
                    flex: 1,
                    color: '#fff',
                  }}>
                  {name}
                </Text>
                <IconButton
                  icon="pencil"
                  color="#280056"
                  size={20}
                  style={{
                    marginVertical: 0,
                    marginHorizontal: 20,
                    borderWidth: 2,
                    borderColor: '#280056',
                  }}
                  onPress={() => navigation.navigate('EditProfile')}
                />
              </View>
            ) : null}
            {email ? (
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  color: '#fff',
                }}>
                {email}
              </Text>
            ) : null}
          </View>
        </Animatable.View>
      </LinearGradient>
    </Animatable.View>
  );
}
