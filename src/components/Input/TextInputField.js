import React from 'react';

//Style
import {Theme} from '../../../style';
import {TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TextInputField = props => {
  const {
    style,
    mode,
    secureTextEntry,
    leftIcon,
    leftIconPress,
    rightIcon,
    rightIconPress,
    placeholder,
    label,
    value,
    onChangeText,
  } = props;

  return (
    <TextInput
      theme={Theme}
      style={
        style
          ? style
          : {
              marginHorizontal: 25,
              marginVertical: 5,
            }
      }
      mode={mode ? mode : 'outlined'}
      secureTextEntry={secureTextEntry ? secureTextEntry : false}
      left={
        leftIcon ? (
          <TextInput.Icon
            name={() => (
              <Icon
                name={leftIcon}
                size={20}
                color={Theme.colors.primary}
                onPress={leftIconPress ? leftIconPress : null}
              />
            )}
          />
        ) : null
      }
      right={
        rightIcon ? (
          <TextInput.Icon
            name={() => (
              <Icon
                name={rightIcon}
                size={20}
                color={Theme.colors.primary}
                onPress={rightIconPress ? rightIconPress : null}
              />
            )}
          />
        ) : null
      }
      placeholder={placeholder}
      label={label}
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default TextInputField;
