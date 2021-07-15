import React from 'react';

import {Theme} from '../../../style';
import {List} from 'react-native-paper';

export default function ListItem(props) {
  const {title, icon, data} = props;
  return (
    <List.Item
      style={{
        backgroundColor: '#fff',
        borderBottomWidth: 0.5,
        borderBottomColor: '#000',
      }}
      titleStyle={{
        color: Theme.colors.shadow,
        fontFamily: 'Montserrat-Bold',
      }}
      descriptionStyle={{
        color: Theme.colors.shadow,
        fontFamily: 'Montserrat-Regular',
      }}
      title={title}
      description={data}
      left={props => (
        <List.Icon {...props} icon={icon} color={Theme.colors.shadow} />
      )}
    />
  );
}
