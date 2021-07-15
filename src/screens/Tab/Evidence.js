import React, {useState, useContext, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';

//Style
import styles, {Theme} from '../../../style';
import {Searchbar, Button, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Components
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import ModalPlayer from '../../components/Modal/ModalPlayer';

//Assets
import {EvidenceList, FilterBtnEvi} from '../../assets/DemoData';

import {RecordContext} from '../Context/RecordContext';

import firestore from '@react-native-firebase/firestore';

export default function Evidence() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [viewMore, setViewMore] = useState(6);
  const [visible, setVisible] = useState(false);
  const [link, setLink] = useState();
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [elevation, setElevation] = useState(5);

  const showModal = (x, y, z) => {
    setLink(x), setLat(y), setLong(z), setVisible(true), setElevation(0);
  };
  const hideModal = () => setVisible(false);

  //Context
  const {evidenceList} = useContext(RecordContext);

  let filterEvidence = evidenceList.filter(item => {
    return (
      (item.name.toLowerCase().includes(search.toLowerCase()) !== false &&
        item.format.toLowerCase().includes(filter.toLowerCase()) !== false) ||
      item.duration.toLowerCase().includes(filter.toLowerCase()) !== false
    );
  });

  return (
    <View style={{flex: 1}}>
      <Header title="Evidence" subtitle="Your Recorded evidence & proof." />

      <Searchbar
        style={{marginHorizontal: 20, marginVertical: 10, elevation: elevation}}
        selectionColor="#A14142"
        placeholder="Search"
        value={search}
        onChangeText={no => setSearch(no)}
      />

      <View style={{marginTop: 10, marginBottom: 5, padding: 5}}>
        {FilterBtnEvi !== null ? (
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {FilterBtnEvi.map(btn => {
              return btn.title === 'Clear' ? (
                <Chip
                  key={btn.title}
                  icon="close-circle"
                  onPress={() => setFilter(btn.search)}
                  mode={btn.search === filter ? 'flat' : 'outlined'}
                  theme={Theme}
                  style={{
                    // paddingHorizontal: 10,
                    marginHorizontal: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                  }}>
                  Clear
                </Chip>
              ) : (
                <Chip
                  key={btn.title}
                  onPress={() => setFilter(btn.search)}
                  mode={btn.search === filter ? 'flat' : 'outlined'}
                  theme={Theme}
                  style={{
                    paddingHorizontal: 10,
                    marginHorizontal: 5,
                    justifyContent: 'center',
                    borderWidth: 2,
                  }}>
                  {btn.title}
                </Chip>
              );
            })}
          </ScrollView>
        ) : null}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, marginVertical: 10}}>
          {filterEvidence.slice(0, viewMore).map((data, index) => {
            return (
              <List
                Type="evidence"
                Data={data}
                key={index}
                index={index}
                showModal={showModal}
              />
            );
          })}
        </View>
        <View style={styles.container}>
          {filterEvidence.length > viewMore ? (
            <Button
              mode="text"
              icon="view-grid-plus-outline"
              color={Theme.colors.primary}
              style={{width: 150, marginVertical: 10}}
              onPress={() => setViewMore(viewMore + 4)}>
              View More
            </Button>
          ) : filterEvidence.length <= viewMore ? (
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                color: Theme.colors.primary,
                marginVertical: 10,
              }}>
              No more Evidence to Show!{' '}
              <Icon
                name="comment-check-outline"
                size={26}
                color={Theme.colors.primary}
              />
            </Text>
          ) : null}
        </View>
      </ScrollView>
      <ModalPlayer
        link={link}
        long={long}
        lat={lat}
        visible={visible}
        hideModal={hideModal}
      />
    </View>
  );
}
