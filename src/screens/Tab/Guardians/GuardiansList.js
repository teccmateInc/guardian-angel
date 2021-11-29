import React, {useContext, useState} from 'react';
import {ScrollView, View, Text} from 'react-native';

//Style
import styles, {Theme, width, height} from '../../../../style';
import {Searchbar, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Components
import Header from '../../../components/Header/Header';
import Btn from '../../../components/Button/Btn';
import List from '../../../components/List/List';
import Loader from '../../../components/Loader/Loader';

//Context Data
import {GuardianContext} from '../../Context/GuardianContext';
import {LanguageContext} from '../../Context/LanguageContext';

export default function GuardiansList({navigation}) {
  const [search, setSearch] = useState('');
  const [viewMore, setViewMore] = useState(6);
  const [loader, setLoader] = useState(false);

  //Context Calling
  const {reqCount, angels, removeAngel} = useContext(GuardianContext);
  const {Lang} = useContext(LanguageContext);

  let filterAngels = angels.filter(item => {
    return (
      item.name.toLowerCase().includes(search.toLowerCase()) !== false ||
      item.email.toLowerCase().includes(search.toLowerCase()) !== false
    );
  });

  const handleNavParams = (x, y, z, id) => {
    navigation.navigate('GuardiansEdit', {
      type: 'edit',
      angel_n: x,
      angel_e: y,
      angel_r: z,
      id,
    });
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={Lang[24]}
        subtitle="Make your Guardian Angels List easily."
      />

      <Btn
        style={{marginHorizontal: 20, marginVertical: 10}}
        label="Add More Guardian Angels"
        icon="plus"
        onPress={() =>
          navigation.navigate('GuardiansEdit', {
            type: 'add',
            angel_n: '',
            angel_e: '',
            angel_r: '',
          })
        }
      />
      <View style={{marginHorizontal: 20, marginVertical: 10}}>
        <Btn
          style={{margin: 0}}
          label={'Check Request ' + reqCount}
          icon="plus"
          onPress={() => navigation.navigate('GuardiansReq')}
        />

        <Text
          style={{
            fontFamily: 'Montserrat',
            color: Theme.colors.primary,
          }}>
          You currently have {reqCount} Request
        </Text>
      </View>

      <Searchbar
        style={{marginHorizontal: 20, marginVertical: 10}}
        selectionColor="#A14142"
        placeholder="Search"
        value={search}
        onChangeText={no => setSearch(no)}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, marginTop: 10}}>
          {filterAngels.slice(0, viewMore).map((data, index) => {
            return (
              <List
                Type="angel"
                Data={data}
                key={index}
                index={index}
                loader={setLoader}
                handleSubmit={handleNavParams}
                handleRemove={removeAngel}
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
      {loader ? <Loader /> : null}
    </View>
  );
}
