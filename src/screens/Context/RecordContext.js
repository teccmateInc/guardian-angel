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
  const [groupEvidence, setGroupEvidence] = useState([]);

  //Context
  const {user} = useContext(AuthContext);
  const {currentLongitude, currentLatitude} = useContext(LocationContext);

  const [evidenceGroup, setEvidenceGroup] = useState([]);

  const handleAudRec = async (dirs, audRecName, loader) => {
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
          Loader(loader);
        });
    });
  };

  const handleVidRec = async (uploadUri, loader) => {
    const audRecName = `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}${user['phoneNumber']}-${new Date().getTime()}-${
      user['DOB']
    }`;
    const storeRef = storage().ref(`recordings/Rec-VID-${audRecName}`);
    await storeRef.putFile(uploadUri);
    await storeRef.getDownloadURL().then(url => {
      firestore()
        .collection('Recordings')
        .add({
          recURL: url,
          recName: `Rec-VID-${audRecName}`,
          duration: user['timePeriod'],
          format: 'Video',
          createdAt: date,
          longitude: currentLongitude,
          latitude: currentLatitude,
          uid: user['uid'],
        })
        .then(() => {
          Loader(loader);
        });
    });
    // setAngels(angels.filter(data => data.email !== email));
  };

  const Loader = loader => {
    loader(true);
    setTimeout(() => {
      loader(false);
    }, 3000);
  };

  const userID = user === undefined ? null : user['uid'];

  // console.log('User --> ' + userID);

  useEffect(() => {
    if (user !== undefined) {
      firestore()
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
    }
  }, [userID, removeRecord]);

  useEffect(() => {
    if (user !== undefined) {
      firestore()
        .collection('Guardians')
        .doc(userID)
        .collection('evidanceGroup')
        .onSnapshot(snap => {
          setEvidenceGroup(snap.docs.map(doc => doc.data().id));
        });
    }
  }, [userID]);

  useEffect(() => {
    console.log('Group Vid --> ', groupEvidence);
    if (user !== undefined) {
      // evidenceGroup.map(data =>
      if (evidenceGroup.length !== 0) {
        firestore()
          .collection('Recordings')
          .where('uid', 'in', evidenceGroup)
          // .orderBy('createdAt', 'desc')
          .onSnapshot(
            snap => {
              // console.log('Snap --> ', !snap.empty);
              if (!snap.empty) {
                setGroupEvidence(
                  snap.docs.map(doc => {
                    return {
                      createdAt: doc.data().createdAt,
                      duration: doc.data().duration,
                      format: doc.data().format,
                      lat: doc.data().latitude,
                      long: doc.data().longitude,
                      name: doc.data().recName,
                      url: doc.data().recURL,
                      uid: doc.data().uid,
                      id: doc.id,
                    };
                  }),
                );
              }
            },
            error => {
              console.log('Snap Err -> ', error);
            },
            // ),
          );
      }
    }
  }, [evidenceGroup]);

  const removeRecord = (id, name, loader) => {
    const recRef = storage().ref().child(`recordings/${name}`);
    recRef
      .delete()
      .then(() => {
        firestore()
          .collection('Recordings')
          .doc(id)
          .delete()
          .then(() => {
            loader(false);
            alert('Recording Deleted Successfully!');
          })
          .catch(error => {
            alert('Err! ' + error);
          });
      })
      .catch(error => {
        alert('Err! ' + error);
      });
  };

  return (
    <RecordContext.Provider
      value={{
        evidenceList,
        groupEvidence,
        handleAudRec,
        handleVidRec,
        removeRecord,
      }}>
      {props.children}
    </RecordContext.Provider>
  );
};

export default RecordContextProvider;
// --> Create Context
export const RecordContext = createContext();
