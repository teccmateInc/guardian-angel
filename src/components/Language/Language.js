import React, {useState, useContext} from 'react';
import {View} from 'react-native';

//Component
import Btn from '../Button/Btn';

//Context
import {LanguageContext} from '../../screens/Context/LanguageContext';

export default function Language() {
  const [ln, setLn] = useState('E');
  const {setIndex} = useContext(LanguageContext);

  const handleSubmit = (x, y) => {
    setIndex(x);
    setLn(y);
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        padding: 5,
      }}>
      <Btn
        label="English"
        mode="text"
        disabled={ln === 'E' ? true : false}
        style={{width: 100, elevation: 0, zIndex: -1}}
        labelStyle={{fontSize: 10}}
        onPress={() => handleSubmit(0, 'E')}
      />
      <Btn
        label="Spanish"
        mode="text"
        disabled={ln === 'S' ? true : false}
        style={{width: 100, elevation: 0, zIndex: -1}}
        labelStyle={{fontSize: 10}}
        onPress={() => handleSubmit(1, 'S')}
      />
      <Btn
        label="Portugese"
        mode="text"
        disabled={ln === 'P' ? true : false}
        style={{width: 100, elevation: 0, zIndex: -1}}
        labelStyle={{fontSize: 10}}
        onPress={() => handleSubmit(2, 'P')}
      />
    </View>
  );
}
