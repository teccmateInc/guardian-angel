import React, {useContext, useState} from 'react';
import {ScrollView, View, Text} from 'react-native';

//Style
import styles, {Theme, width, height} from '../../../../style';
import {Searchbar, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Components
import Header from '../../../components/Header/Header';
import List from '../../../components/List/List';

//Context Data
import {GuardianContext} from '../../Context/GuardianContext';

export default function GuardiansList({navigation}) {
  const [search, setSearch] = useState('');
  const [viewMore, setViewMore] = useState(6);

  //Context Calling
  const {angels, removeAngel} = useContext(GuardianContext);

  let filterAngels = angels.filter(item => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) !== false ||
      item.email.toLowerCase().includes(search.toLowerCase()) !== false
    );
  });

  return (
    <View style={{flex: 1}}>
      <Header
        title="Angels"
        subtitle="Make your Guardian Angels List easily."
      />

      <Searchbar
        style={{marginHorizontal: 20, marginVertical: 10}}
        selectionColor="#A14142"
        placeholder="Search"
        value={search}
        onChangeText={no => setSearch(no)}
      />

      <Button
        style={{marginHorizontal: 20, marginVertical: 10}}
        color={Theme.colors.primary}
        icon="plus"
        mode="contained"
        onPress={() =>
          navigation.navigate('GuardiansEdit', {
            type: 'add',
            angel_n: '',
            angel_e: '',
            angel_r: '',
          })
        }>
        Add More Guardian Angels
      </Button>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, marginTop: 10}}>
          {filterAngels.slice(0, viewMore).map((data, index) => {
            return (
              <List
                Type="angel"
                Data={data}
                key={index}
                index={index}
                remove={e => removeAngel(e)}
                navigation={navigation}
              />
            );
          })}
        </View>
        <View style={styles.container}>
          {filterAngels.length > viewMore ? (
            <Button
              mode="text"
              icon="view-grid-plus-outline"
              color={Theme.colors.primary}
              style={{width: 150, marginVertical: 10}}
              onPress={() => setViewMore(viewMore + 4)}>
              View More
            </Button>
          ) : filterAngels.length <= viewMore ? (
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                color: Theme.colors.primary,
                marginVertical: 10,
              }}>
              No more Angels to Show!{' '}
              <Icon
                name="comment-check-outline"
                size={26}
                color={Theme.colors.primary}
              />
            </Text>
          ) : null}
        </View>
      </ScrollView>
      {/* <View
        style={{
          position: 'absolute',
          width,
          height,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00000090',
          elevation: 5,
        }}>
        <Text
          style={{
            fontSize: 24,
            fontFamily: 'Poppins-Bold',
            color: '#fff',
            textAlign: 'center',
            margin: 10,
            padding: 10,
            // borderColor: Theme.colors.primary,
            // borderWidth: 2,
            textShadowColor: Theme.colors.placeholder,
            textShadowOffset: {width: 0, height: 0},
            textShadowRadius: 20,
          }}>
          This Screen is under Development. It will be available soon!!
        </Text>
      </View> */}
    </View>
  );
}
