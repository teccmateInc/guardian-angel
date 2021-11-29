import React from 'react';
import {View, Text} from 'react-native';

//Style
import {Theme} from '../../../style';
import * as Animatable from 'react-native-animatable';
import {IconButton} from 'react-native-paper';

export default function List(props) {
  const {Type, Data, index, handleSubmit, handleRemove, loader} = props;

  const handleSubmitBtn = () => {
    if (Type === 'angel') {
      handleSubmit(Data.name, Data.email, Data.relation, Data.id);
    } else if (Type === 'evidence') {
      handleSubmit(Data.url, Data.lat, Data.long);
    } else {
      handleSubmit();
    }
  };

  const handleDeleteBtn = () => {
    if (Type === 'angel') {
      loader(true);
      handleRemove(Data.id, loader);
    } else if (Type === 'evidence') {
      loader(true);
      handleRemove(Data.id, Data.name, loader);
    } else {
      handleRemove();
    }
  };

  const btnIcon =
    Type === 'angel'
      ? 'account-edit'
      : Type === 'evidence'
      ? 'play-circle'
      : Type === 'req'
      ? 'plus'
      : 'replay';

  return (
    <Animatable.View
      animation={'fadeInRight'}
      duration={800}
      delay={1000 + index * 100}
      key={index}>
      <View
        style={{
          backgroundColor: Theme.colors.accent + '80',
          borderBottomColor: Theme.colors.placeholder,
          borderBottomWidth: 2,
          padding: 10,
          marginLeft: 20,
          marginBottom: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{flex: 1, marginHorizontal: 10}}>
            {Data.name ? <TitleHandler data={Data.name} /> : null}
            {Data.email ? <TextHandler data={Data.email} /> : null}
            {Data.relation ? (
              <TextHandler data={Data.relation} label="Relationship: " />
            ) : null}
            {Data.duration ? (
              <TextHandler data={Data.duration} label="Duration in min: " />
            ) : null}
            {Data.format ? (
              <TextHandler data={Data.format} label="Format: " />
            ) : null}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginHorizontal: 5,
            }}>
            <IconHandler icon={btnIcon} handlePress={handleSubmitBtn} />
            {handleRemove ? (
              <IconHandler
                icon="delete-outline"
                handlePress={handleDeleteBtn}
              />
            ) : null}
          </View>
        </View>
      </View>
    </Animatable.View>
  );
}

const TitleHandler = props => {
  const {label, data} = props;
  return (
    <Text
      numberOfLines={1}
      style={{
        fontFamily: 'Montserrat-Bold',
        fontSize: 16,
        color: Theme.colors.placeholder,
      }}>
      {label ? label : null}
      {data}
    </Text>
  );
};

const TextHandler = props => {
  const {label, data} = props;
  return (
    <Text
      numberOfLines={1}
      style={{
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: Theme.colors.shadow,
      }}>
      {label ? label : null}
      {data}
    </Text>
  );
};

const IconHandler = props => {
  const {handlePress, icon} = props;
  return (
    <IconButton
      icon={icon}
      onPress={() => handlePress()}
      color="#fff"
      size={30}
      style={{
        backgroundColor: Theme.colors.placeholder,
        borderRadius: 0,
      }}
    />
  );
};
