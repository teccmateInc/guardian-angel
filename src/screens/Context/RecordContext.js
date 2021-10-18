import React, {createContext, useState, useContext, useEffect} from 'react';

//Context
import {AuthContext} from './AuthContext';
import {LocationContext} from './LocationContext';

//Firebase Storage
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

// import {EvidenceList} from '../../assets/DemoData';

const RecordContextProvider = props => {
  const [date, setDate] = useState(new Date());
  const [evidenceList, setEvidenceList] = useState([]);
  //Context
  const {user} = useContext(AuthContext);
  const {currentLongitude, currentLatitude} = useContext(LocationContext);

  const handleAudRec = async (dirs, audRecName) => {
    const uploadUri =
      Platform.OS === 'ios' ? audio : `${dirs.CacheDir}/Rec${audRecName}.mp3`;
    const storeRef = storage().ref(`recordings/Rec-AUD-${audRecName}`);
    await storeRef.putFile(uploadUri);
    await storeRef.getDownloadURL().then(url => {
      firestore()
        .collection('Recordings')
        .add({
          recURL: url,
          recName: `Rec-AUD-${audRecName}`,
          duration: user['timePeriod'],
          format: 'Audio',
          createdAt: date,
          longitude: currentLongitude,
          latitude: currentLatitude,
          uid: user['uid'],
        })
        .then(() => {
          alert('Evidence added!');
        });
    });
  };

  const handleVidRec = async uploadUri => {
    const audRecName = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}${user['phoneNumber']}-${new Date().getTime()}-${
      user['DOB']
    }`;
    const storeRef = storage().ref(`recordings/Rec-VID-480-${audRecName}`);
    await storeRef.putFile(uploadUri);
    await storeRef.getDownloadURL().then(url => {
      firestore()
        .collection('Recordings')
        .add({
          recURL: url,
          recName: `Rec-VID-480-${audRecName}`,
          duration: user['timePeriod'],
          format: 'Video',
          createdAt: date,
          longitude: currentLongitude,
          latitude: currentLatitude,
          uid: user['uid'],
        })
        .then(() => {
          alert('Evidence added!');
        });
    });
    // setAngels(angels.filter(data => data.email !== email));
  };

  const userID = user === undefined ? null : user['uid'];

  // console.log('User --> ' + userID);

  useEffect(async () => {
    user === undefined
      ? null
      : await firestore()
          .collection('Recordings')
          .where('uid', '==', userID)
          .onSnapshot(docSnap => {
            !docSnap.empty
              ? setEvidenceList(
                  docSnap.docs.map(evidence => {
                    return {
                      createdAt: evidence.data().createdAt,
                      duration: evidence.data().duration,
                      format: evidence.data().format,
                      lat: evidence.data().latitude,
                      long: evidence.data().longitude,
                      name: evidence.data().recName,
                      url: evidence.data().recURL,
                      uid: evidence.data().uid,
                      id: evidence.id,
                    };
                  }),
                )
              : alert('You have not made any evidence so far!');
          });
  }, [userID]);

  return (
    <RecordContext.Provider value={{evidenceList, handleAudRec, handleVidRec}}>
      {props.children}
    </RecordContext.Provider>
  );
};

// --> Create Context
export const RecordContext = createContext();

export default RecordContextProvider;
