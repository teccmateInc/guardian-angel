import React, {useState, useContext, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';

//Style
import styles, {Theme} from '../../../style';
import {Searchbar, Button, Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Components
import Header from '../../components/Header/Header';
import Btn from '../../components/Button/Btn';
import List from '../../components/List/List';
import ModalPlayer from '../../components/Modal/ModalPlayer';
import Loader from '../../components/Loader/Loader';

//Assets
import {FilterBtnEvi} from '../../assets/DemoData';

//Context
import {RecordContext} from '../Context/RecordContext';
import {LanguageContext} from '../Context/LanguageContext';

export default function Evidence() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [viewMore, setViewMore] = useState(6);
  const [visible, setVisible] = useState(false);
  const [link, setLink] = useState();
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [elevation, setElevation] = useState(5);
  const [loader, setLoader] = useState(false);

  const [status, setStatus] = useState(true);

  const showModal = (x, y, z) => {
    setLink(x), setLat(y), setLong(z), setVisible(true), setElevation(0);
  };
  const hideModal = () => setVisible(false);

  //Context
  const {evidenceList, groupEvidence, removeRecord} = useContext(RecordContext);
  const {Lang} = useContext(LanguageContext);

  const Evidences = status
    ? groupEvidence.sort((x, y) => x.createdAt <= y.createdAt)
    : evidenceList.sort((x, y) => x.createdAt <= y.createdAt);

  let filterEvidence = Evidences.filter(item => {
    return (
      (item.name.toLowerCase().includes(search.toLowerCase()) !== false &&
        item.format.toLowerCase().includes(filter.toLowerCase()) !== false) ||
      item.duration.toLowerCase().includes(filter.toLowerCase()) !== false
    );
  });

  return (
    <View style={{flex: 1}}>
      <Header title={Lang[23]} subtitle="Your Recorded evidence & proof." />

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginVertical: 20,
        }}>
        <Btn
          label="Angels Evidence"
          disabled={status}
          style={{width: 200, margin: 5, elevation: 0}}
          onPress={() => setStatus(true)}
        />
        <Btn
          label="My Evidence"
          disabled={!status}
          style={{width: 150, margin: 5, elevation: 0}}
          onPress={() => setStatus(false)}
        />
      </View>

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
                loader={setLoader}
                handleSubmit={showModal}
                handleRemove={!status ? removeRecord : null}
              />
            );
          })}
        </View>
        <View style={styles.container}>
          {filterEvidence.length > viewMore ? (
            <Btn
              label="View More"
              mode="text"
              icon="view-grid-plus-outline"
              style={{width: 150, marginVertical: 10}}
              onPress={() => setViewMore(viewMore + 4)}
            />
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
      {loader ? <Loader /> : null}
    </View>
  );
}
