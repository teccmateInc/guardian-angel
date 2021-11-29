import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  Text,
  ScrollView,
  PermissionsAndroid,
  StatusBar,
  BackHandler,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

//Import Recorder
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import VideoRecorder from 'react-native-beautiful-video-recorder';

//Style
import Style, {width, height} from '../../../style';
import {Modal, Portal, Provider} from 'react-native-paper';

//Components
//--> Header
import Header from '../../components/Header/Header';
//--> Button
import Btn from '../../components/Button/Btn';
//--> Language
import Language from '../../components/Language/Language';
//--> Loader
import Loader from '../../components/Loader/Loader';

//Context
import {AuthContext} from '../Context/AuthContext';
import {LocationContext} from '../Context/LocationContext';
import {RecordContext} from '../Context/RecordContext';
import {LanguageContext} from '../Context/LanguageContext';

//Audio Func
const audioRecorderPlayer = new AudioRecorderPlayer();

//File Path Read and Write
const RNFetchBlob = require('rn-fetch-blob').default;
const dirs = RNFetchBlob.fs.dirs;

export default function Home({navigation}) {
  const [date, setDate] = useState(new Date());
  const [audRecName, setAudRecName] = useState(
    `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}-${new Date().getTime()}`,
  );
  const [visible, setVisible] = useState(false);
  const [visibleTab, setVisibleTab] = useState(true);
  const [visibleStatus, setVisibleStatus] = useState(false);
  const [loader, setLoader] = useState(false);

  navigation.setOptions({
    tabBarVisible: visibleTab,
  });

  //Ref
  const videoRecorder = useRef();

  //Context
  const {user} = useContext(AuthContext);
  const {Lang} = useContext(LanguageContext);

  const TimePeriod = user ? user['timePeriod'] * 60 : null;

  const {getOneTimeLocation, subscribeLocationLocation} =
    useContext(LocationContext);
  const {handleAudRec, handleVidRec} = useContext(RecordContext);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setVisible(true);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [visible]),
  );

  useEffect(() => {
    permissions();
  }, []);

  const permissions = async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    granted
      ? console.log('You can access LOCATION')
      : console.log('ACCESS LOCATION permission denied');
  };

  const StartStopVidRec = async () => {
    // videoRecorder.current.recordOptions({quality});
    setVisibleStatus(true);
    videoRecorder.current.open({maxLength: TimePeriod}, data => {
      handleVidRec(data.uri, setLoader);
    });
    setTimeout(() => {
      setVisibleStatus(false);
    }, TimePeriod * 1000);
  };

  const StartStopAudioRec = async () => {
    getOneTimeLocation();
    subscribeLocationLocation();
    showModal();

    setVisibleTab(false);
    setVisibleStatus(true);
    audioRecorderPlayer.startRecorder(Path());
    audioRecorderPlayer.addRecordBackListener();

    setTimeout(async () => {
      await StopRec();
    }, TimePeriod * 1000);
  };

  const Path = () => {
    setAudRecName(
      `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}${
        user['phoneNumber']
      }-${new Date().getTime()}-${user['DOB']}`,
    );
    console.log(audRecName);
    const path = Platform.select({
      ios: `Rec${audRecName}.m4a`,
      android: `${dirs.CacheDir}/Rec${audRecName}.mp3`,
    });

    return path;
  };

  const StopRec = async () => {
    const audio = await audioRecorderPlayer.stopRecorder(Path);
    audioRecorderPlayer.removeRecordBackListener();
    handleAudRec(dirs, audRecName, setLoader);
    hideModal();
    setVisibleTab(true);
    setVisibleStatus(false);
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor="#000"
        barStyle={visibleStatus ? 'dark-content' : 'default'}
      />
      <Header title={Lang[22]} subtitle={Lang[29]} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Btn
            icon="video"
            onPress={() => StartStopVidRec()}
            label={Lang[27]}
          />
          <Btn
            icon="microphone"
            onPress={() => StartStopAudioRec()}
            label={Lang[28]}
          />
        </View>
        <View>
          <Text style={Style.para}>
            Your {Lang[7]} is {TimePeriod} seconds. {Lang[30]}
          </Text>
        </View>
        <View
          style={{marginVertical: 20, padding: 10, backgroundColor: '#fff'}}>
          <Text style={Style.H4}>{Lang[31]}</Text>
          <Text style={Style.para}>{Lang[32]}</Text>
          <Text style={Style.para}>
            If the user's device is locked during the VIDEO recording process
            the evidence will be lost. But If the user's device is locked during
            the AUDIO recording process the evidence will not be affected.
          </Text>
          <Text style={Style.para}>
            Before Making Evidence make sure your device Location and GPS is on.
          </Text>
        </View>
      </ScrollView>

      <VideoRecorder
        ref={ref => {
          videoRecorder.current = ref;
        }}
      />
      <ModelProvider
        visible={visible}
        hideModal={hideModal}
        TimePeriod={TimePeriod}
      />

      <Language />

      {loader ? <Loader /> : null}
    </View>
  );
}

const ModelProvider = props => {
  const {visible, hideModal, TimePeriod} = props;
  const [count, setCount] = useState(TimePeriod);

  useEffect(() => {
    setInterval(() => {
      setCount(prev => prev - 1);
    }, 1000);
  }, []);

  setTimeout(() => {
    clearInterval();
    setCount(TimePeriod);
  }, TimePeriod * 1000);

  return (
    <Provider>
      <Portal>
        <Modal
          dismissable={false}
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: '#000',
            width: width,
            height: height,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}>
          <Text style={{color: '#111'}}>Please Wait! {count} sec left.</Text>
        </Modal>
      </Portal>
    </Provider>
  );
};
