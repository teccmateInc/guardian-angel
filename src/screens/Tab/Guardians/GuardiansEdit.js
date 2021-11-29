import React, {useContext, useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';

//Style
import {Theme} from '../../../../style';
import {Button, ActivityIndicator} from 'react-native-paper';

//Components
import Header from '../../../components/Header/Header';
import Btn from '../../../components/Button/Btn';
import TextInputField from '../../../components/Input/TextInputField';
import Loader from '../../../components/Loader/Loader';

//Context Data
import {GuardianContext} from '../../Context/GuardianContext';
import {LanguageContext} from '../../Context/LanguageContext';

export default function GuardiansEdit({route, navigation}) {
  const {type, angel_n, angel_e, angel_r, id} = route.params;
  const [name, setName] = useState(angel_n);
  const [email, setEmail] = useState(angel_e);
  const [relation, setRelation] = useState(angel_r);
  const [valid, setValid] = useState(false);
  const [activity, setActivity] = useState(false);
  const [loader, setLoader] = useState(false);

  //Context Calling
  const {reqAngel, updateAngel} = useContext(GuardianContext);
  const {Lang} = useContext(LanguageContext);

  const handleSubmit = () => {
    if (type === 'add') {
      setLoader(true);
      reqAngel(name, email, relation, navigation, setLoader);
    } else if (type === 'edit') {
      setLoader(true);
      updateAngel(id, name, email, relation, navigation, setLoader);
    }

    setActivity(true);
    setTimeout(() => {
      setActivity(false);
    }, 5000);
  };

  useEffect(() => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(angel_e) === false) {
      return setValid(false);
    } else {
      return setValid(true);
    }
  }, [angel_e]);

  const validateEmail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    reg.test(text) === false
      ? (setEmail(text), setValid(false))
      : (setEmail(text), setValid(true));
  };

  const btnIcon =
    type === 'add'
      ? 'account-multiple'
      : type === 'edit'
      ? 'account-edit'
      : null;

  const titleTxt =
    type === 'add' ? Lang[25] : type === 'edit' ? Lang[26] : null;

  return (
    <View style={{flex: 1}}>
      <Header title={titleTxt} subtitle="Who will be your Guardian Angel?" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, marginVertical: 20}}>
          <TextInputField
            leftIcon="account"
            label={Lang[0]}
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInputField
            leftIcon="email"
            label={Lang[1]}
            value={email}
            onChangeText={text => validateEmail(text)}
          />
          <TextInputField
            leftIcon="account-switch"
            label={Lang[14]}
            value={relation}
            onChangeText={text => setRelation(text)}
          />
          {/* <Text
            style={{
              margin: 20,
              textAlign: 'center',
              color: '#aaa',
            }}>
            By adding Angel you agree to our{' '}
            <Text style={{color: Theme.colors.primary}}>
              Terms and Condition
            </Text>
            .
          </Text> */}
          <Btn
            style={{marginHorizontal: 40, marginVertical: 20}}
            label={titleTxt + ' Angel'}
            disabled={valid ? activity : true}
            icon={btnIcon}
            onPress={() => handleSubmit()}
          />
          <ActivityIndicator
            animating={activity}
            color={Theme.colors.primary}
          />
        </View>
      </ScrollView>
      {loader ? <Loader /> : null}
    </View>
  );
}
