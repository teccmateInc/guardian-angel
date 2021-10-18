import React, {useRef} from 'react';

//Style
import Style from '../../../style';

//Component
import PhoneInput from 'react-native-phone-number-input';

const PhoneNo = props => {
  const {value, onTextChange, onFormatChange} = props;
  //Ref
  const phoneInput = useRef(null);

  return (
    <PhoneInput
      ref={phoneInput}
      defaultValue={value}
      defaultCode="PK"
      layout="first"
      onChangeText={onTextChange}
      onChangeFormattedText={onFormatChange}
      containerStyle={Style.PhoneInput}
    />
  );
};

export default PhoneNo;
