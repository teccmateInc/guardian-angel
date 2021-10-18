import React from 'react';

//Style
import {Theme} from '../../../style';
import {List} from 'react-native-paper';

const ListAccordion = props => {
  const {title, leftIcon, expanded, handlePress, ListItem} = props;

  return (
    <List.Accordion
      theme={Theme}
      style={{backgroundColor: '#fff'}}
      title={title}
      left={leftIcon ? props => <List.Icon {...props} icon={leftIcon} /> : null}
      expanded={expanded}
      onPress={handlePress}>
      {ListItem.map(item => {
        return (
          <List.Item
            key={item.title}
            title={item.title}
            onPress={item.handle}
          />
        );
      })}
    </List.Accordion>
  );
};

export default ListAccordion;
