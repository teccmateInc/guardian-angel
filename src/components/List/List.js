import React from 'react';
import {View, Text} from 'react-native';

//Style
import {Theme} from '../../../style';
import * as Animatable from 'react-native-animatable';
import {IconButton} from 'react-native-paper';

export default function List(props) {
  const {navigation, remove, Type, Data, index, showModal} = props;

  const handleBtn = (x, y, z) => {
    Type === 'angel'
      ? navigation.navigate('GuardiansEdit', {
          type: 'edit',
          angel_n: Data.name,
          angel_e: Data.email,
          angel_r: Data.relation,
        })
      : Type === 'evidence'
      ? showModal(x, y, z)
      : null;
  };

  return (
    <Animatable.View
      animation={'fadeInRight'}
      duration={800}
      delay={1000 + index * 100}
      key={index}>
      <View
        style={{
          backgroundColor: Theme.colors.accent + '80',
          borderBottomWidth: 2,
          borderBottomColor: Theme.colors.placeholder,
          height: 80,
          marginLeft: 20,
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
          <View style={{flex: 1}}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: 16,
                marginHorizontal: 10,
                color: Theme.colors.placeholder,
              }}>
              {Data.name}
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: 12,
                marginHorizontal: 10,
                color: Theme.colors.shadow,
              }}>
              {Type === 'angel'
                ? Data.email
                : Type === 'evidence'
                ? 'Duration: ' + Data.duration + ' mins'
                : null}
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-Medium',
                fontSize: 12,
                marginHorizontal: 10,
                color: Theme.colors.shadow,
              }}>
              {Type === 'angel'
                ? 'Relationship: ' + Data.relation
                : Type === 'evidence'
                ? 'Format: ' + Data.format
                : null}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignContent: 'center',
              alignSelf: 'center',
              marginHorizontal: 5,
            }}>
            <IconButton
              icon={
                Type === 'angel'
                  ? 'account-edit'
                  : Type === 'evidence'
                  ? 'play-circle'
                  : 'replay'
              }
              style={{
                backgroundColor: Theme.colors.placeholder,
                borderRadius: 0,
              }}
              color="#fff"
              size={30}
              onPress={() => handleBtn(Data.url, Data.lat, Data.long)}
            />
            <IconButton
              icon="delete-outline"
              style={{
                backgroundColor: Theme.colors.placeholder,
                borderRadius: 0,
              }}
              color="#fff"
              size={30}
              onPress={() => (Type === 'angel' ? remove(Data.email) : null)}
            />
          </View>
        </View>
      </View>
    </Animatable.View>
  );
}
