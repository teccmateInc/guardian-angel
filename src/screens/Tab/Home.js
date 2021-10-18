import React, {useState, useContext, useEffect, useRef, createRef} from 'react';
import {
  View,
  Text,
  ScrollView,
  PermissionsAndroid,
  StatusBar,
} from 'react-native';

//Import Recorder
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import VideoRecorder from 'react-native-beautiful-video-recorder';

//Style
import Style, {Theme, width, height} from '../../../style';
import {Button, Modal, Portal, Provider} from 'react-native-paper';

//Components
//--> Header
import Header from '../../components/Header/Header';
//--> Button
import Btn from '../../components/Button/Btn';

//Context
import {AuthContext} from '../Context/AuthContext';
import {LocationContext} from '../Context/LocationContext';
import {RecordContext} from '../Context/RecordContext';

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

  navigation.setOptions({
    tabBarVisible: visibleTab,
  });

  //Ref
  const videoRecorder = useRef();

  //Context
  const {user} = useContext(AuthContext);

  const TimePeriod = user['timePeriod'] * 60;

  const {getOneTimeLocation, subscribeLocationLocation} =
    useContext(LocationContext);
  const {handleAudRec, handleVidRec} = useContext(RecordContext);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  useEffect(async () => {
    const granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    granted
      ? console.log('You can access LOCATION')
      : console.log('ACCESS LOCATION permission denied');
  }, []);

  const StartStopVidRec = async () => {
    videoRecorder.current.recordOptions({quality});
    setVisibleStatus(true);
    videoRecorder.current.open({maxLength: 60}, data => {
      handleVidRec(data.uri);
    });
    setTimeout(() => {
      setVisibleStatus(false);
    }, 60 * 1000);
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
    }, 60 * 1000);
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
    handleAudRec(dirs, audRecName);
    alert('Success!');
    hideModal();
    setVisibleTab(true);
    setVisibleStatus(false);
  };

  // const Timer = () => {

  //   return moment().startOf('day').seconds(time).format('mm:ss');
  // };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        backgroundColor="#000"
        barStyle="dark-content"
        // hidden={visibleStatus}
      />
      <Header
        title="Record"
        subtitle="Record your evidence securely & privately."
      />
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
            label="Video Record Evidence"
          />
          <Btn
            icon="microphone"
            onPress={() => StartStopAudioRec()}
            label="Audio Record Evidence"
          />
        </View>
        <View>
          <Text style={Style.para}>
            Your Default Recording timing is {TimePeriod} seconds. You can
            increase or decrease this Time period from Profile Settings.
          </Text>
        </View>
        <View
          style={{marginVertical: 20, padding: 10, backgroundColor: '#fff'}}>
          <Text style={Style.H4}>Tips</Text>
          <Text style={Style.para}>
            Please use above option when you are in trouble to record evidence.
            To record Video evidence press Video Recording it will record both
            video as well as audio but if you want to record Audio evidence only
            then press on Audio Recording.
          </Text>
        </View>
      </ScrollView>
      <VideoRecorder
        ref={ref => {
          videoRecorder.current = ref;
        }}
      />
      <Provider>
        <Portal>
          <Modal
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
            <Text style={{color: '#111'}}>Please Wait!</Text>
          </Modal>
        </Portal>
      </Provider>
    </View>
  );
}
