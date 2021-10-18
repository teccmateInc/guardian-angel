import React from 'react';

//Style
import {Theme} from '../../../style';
import {Button} from 'react-native-paper';

const Btn = props => {
  const {style, icon, mode, disabled, onPress, label} = props;
  return (
    <Button
      style={style ? style : {width: 300, margin: 10, alignSelf: 'center'}}
      color={Theme.colors.primary}
      icon={icon ? icon : null}
      mode={mode ? mode : 'contained'}
      disabled={disabled}
      onPress={onPress}>
      {label}
    </Button>
  );
};

export default Btn;
