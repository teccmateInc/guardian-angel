import React, {useContext, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';

//Style
import styles, {Theme} from '../../../../style';
import {Button, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Components
import Header from '../../../components/Header/Header';

//Context Data
import {GuardianContext} from '../../Context/GuardianContext';

export default function GuardiansEdit({route, navigation}) {
  const {type, angel_n, angel_e, angel_r} = route.params;
  const [name, setName] = useState(angel_n);
  const [email, setEmail] = useState(angel_e);
  const [relation, setRelation] = useState(angel_r);
  const [valid, setValid] = useState(false);

  //Context Calling
  const {addAngel, reqAngel} = useContext(GuardianContext);

  const validateEmail = text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    reg.test(text) === false
      ? (setEmail(text), setValid(false))
      : (setEmail(text), setValid(true));
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={
          type === 'add' ? 'Add Angels' : type === 'edit' ? 'Edit Angels' : null
        }
        subtitle="Who will be your Guardian Angel?"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, marginVertical: 20}}>
          <TextInput
            left={
              <TextInput.Icon
                name={() => (
                  <Icon name="account" size={25} color={Theme.colors.primary} />
                )}
              />
            }
            style={{marginHorizontal: 25, marginVertical: 5}}
            mode="outlined"
            theme={Theme}
            label="Full Name"
            value={name}
            onChangeText={text => setName(text)}
          />
          <TextInput
            left={
              <TextInput.Icon
                name={() => (
                  <Icon name="email" size={25} color={Theme.colors.primary} />
                )}
              />
            }
            style={{marginHorizontal: 25, marginVertical: 5}}
            mode="outlined"
            theme={Theme}
            label="Email"
            value={email}
            onChangeText={text => validateEmail(text)}
          />
          <TextInput
            left={
              <TextInput.Icon
                name={() => (
                  <Icon
                    name="account-switch"
                    size={25}
                    color={Theme.colors.primary}
                  />
                )}
              />
            }
            style={{marginHorizontal: 25, marginVertical: 5}}
            mode="outlined"
            theme={Theme}
            label="Relationship"
            value={relation}
            onChangeText={text => setRelation(text)}
          />
          <Text
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
          </Text>
          <Button
            style={{marginHorizontal: 40, marginVertical: 10}}
            color={Theme.colors.primary}
            disabled={valid ? false : true}
            icon={
              type === 'add'
                ? 'account-multiple'
                : type === 'edit'
                ? 'account-edit'
                : null
            }
            mode="contained"
            onPress={() => reqAngel(name, email, relation)}>
            {type === 'add' ? 'Add ' : type === 'edit' ? 'Edit ' : null}Guardian
            Angel
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
