import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';

//Style
import {Theme, width, height} from '../../../style';
import {Modal, Portal, Provider} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Video from 'react-native-video';
import Maps from '../../components/Maps/Maps';

export default function ModalPlayer(props) {
  const {link, lat, long, visible, hideModal} = props;

  const [pause, setPause] = useState(false);
  const [mute, setMute] = useState(false);

  const btnAction = x => {
    x === 'pause' ? setPause(!pause) : x === 'mute' ? setMute(!mute) : null;
  };

  return (
    <Provider>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <View
            style={{
              alignSelf: 'center',
              height: width - 50,
              width: width - 100,
              borderWidth: 5,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              borderBottomWidth: 0,
              borderColor: Theme.colors.shadow,
              backgroundColor: Theme.colors.placeholder,
            }}>
            <Video
              source={{uri: link}}
              repeat={false}
              resizeMode="contain"
              // resizeMode="cover"
              poster="https://firebasestorage.googleapis.com/v0/b/my-guardian-angels.appspot.com/o/Background%2FPlay.png?alt=media&token=6d9d417c-dc0e-4a3e-9d2e-b6d781b05564"
              style={{width: width - 100, height: width - 50}}
              paused={pause}
              muted={mute}
            />
            <TouchableOpacity
              style={{
                top: 0,
                right: 0,
                margin: 10,
                position: 'absolute',
                padding: 8,
                flex: 1,
                elevation: 5,
                borderRadius: 50,
                backgroundColor: Theme.colors.shadow,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={hideModal}>
              <Ionicons name="close" size={18} color={'#ffffff'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                bottom: 0,
                margin: 10,
                position: 'absolute',
                padding: 8,
                flex: 1,
                elevation: 5,
                borderRadius: 50,
                backgroundColor: Theme.colors.shadow + 85,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => btnAction('pause')}>
              <Ionicons
                name={pause ? 'play' : 'pause'}
                size={18}
                color={'#ffffff'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                bottom: 0,
                right: 0,
                margin: 10,
                position: 'absolute',
                padding: 8,
                flex: 1,
                elevation: 5,
                borderRadius: 50,
                backgroundColor: Theme.colors.shadow + 85,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => btnAction('mute')}>
              <Ionicons
                name={mute ? 'volume-mute' : 'volume-high'}
                size={18}
                color={'#ffffff'}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignSelf: 'center',
              width: width - 100,
              borderWidth: 5,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              borderColor: Theme.colors.shadow,
            }}>
            <Maps
              currentLongitude={long}
              currentLatitude={lat}
              styleWidth={width - 110}
              styleHeight={width - 200}
            />
          </View>
        </Modal>
      </Portal>
    </Provider>
  );
}
