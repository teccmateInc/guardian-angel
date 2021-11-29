import React, {createContext, useState, useContext, useEffect} from 'react';

//Context
import {AuthContext} from './AuthContext';

import firestore from '@react-native-firebase/firestore';

import Email from 'react-native-email';

const GuardianContextProvider = props => {
  const [angels, setAngels] = useState([]);
  const [req, setReq] = useState([]);
  const [reqCount, setReqCount] = useState(0);

  //Context
  const {user} = useContext(AuthContext);

  useEffect(() => {
    if (user !== undefined) {
      firestore()
        .collection('Guardians')
        .doc(user.uid)
        .collection('request')
        .onSnapshot(snap => {
          setReq(snap.docs.map(doc => doc.data()));
          setReqCount(0);
          snap.docs.map(() => setReqCount(prev => prev + 1));
        });
    }
  }, [user]);

  useEffect(() => {
    if (user !== undefined) {
      firestore()
        .collection('Guardians')
        .doc(user.uid)
        .collection('myGuardians')
        .onSnapshot(snap => {
          setAngels(snap.docs.map(doc => doc.data()));
        });
    }
  }, [user]);

  const reqAngel = (name, email, relation, navigation, loader) => {
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .onSnapshot(snap => {
        if (!snap.empty) {
          snap.docs.map(doc => {
            const userID = doc.id;
            console.log('Req -> ', userID);
            firestore()
              .collection('Guardians')
              .doc(userID)
              .collection('request')
              .doc(user.uid)
              .set({
                reqID: user.uid,
                userID: userID,
                name: name,
                email: email,
                relation: relation,
              })
              .then(() => {
                loader(false);
                alert(`We have requested ${email} to be your guardian!`);
                navigation.navigate('GuardiansList');
              })
              .catch(error => {
                loader(false);
                alert('Err! ' + error);
                navigation.navigate('GuardiansList');
              });
          });
        } else {
          loader(false);
          sendMail(email, name);
          alert('-> User Dont Exist!');
          // navigation.navigate('GuardiansList');
        }
      });
  };

  const Link =
    'https://play.google.com/store/apps/details?id=com.daniyalmalikc.myguardianangel';

  const sendMail = (email, name) => {
    const to = email;
    Email(to, {
      // Optional additional arguments
      subject: 'My Guardian Angel App Invitation!',
      body: `Hi ${name}!\nPlease install My Guardian Angel App from your App Store.\n\nPlay Store Link: ${Link}`,
    }).catch(err => console.error('Err --> ', err));
  };

  const angelDetail = (id, state) => {
    firestore()
      .collection('Users')
      .doc(id)
      .onSnapshot(doc => {
        const UserData = doc.data();
        state({
          email: UserData.email,
          name: UserData.name,
          uid: UserData.uid,
        });
      });
  };

  const updateAngel = (id, name, email, relation, navigation, loader) => {
    firestore()
      .collection('Guardians')
      .doc(user.uid)
      .collection('myGuardians')
      .doc(id)
      .update({id, name, email, relation})
      .then(() => {
        loader(false);
        alert(`${name} Data Updated!`);
        navigation.navigate('GuardiansList');
      })
      .catch(error => {
        loader(false);
        alert('Err! ' + error);
        navigation.navigate('GuardiansList');
      });
  };

  const acceptReq = (rid, uid) => {
    firestore()
      .collection('Guardians')
      .doc(uid)
      .collection('request')
      .doc(rid)
      .onSnapshot(doc => {
        if (doc.exists) {
          firestore()
            .collection('Guardians')
            .doc(uid)
            .collection('evidanceGroup')
            .doc(rid)
            .set({
              id: doc.data().reqID,
            });
          firestore()
            .collection('Guardians')
            .doc(rid)
            .collection('myGuardians')
            .doc(uid)
            .set({
              name: doc.data().name,
              email: doc.data().email,
              relation: doc.data().relation,
              id: doc.data().userID,
            })
            .then(() => {
              deleteReq(rid, uid);
              alert('Request Accepted!');
            });
        }
      });
  };

  const deleteReq = (rid, uid) => {
    firestore()
      .collection('Guardians')
      .doc(uid)
      .collection('request')
      .doc(rid)
      .delete()
      .then(() => {
        loader(false);
      })
      .catch(error => {
        alert('Err! ' + error);
      });
  };

  const removeAngel = (id, loader) => {
    firestore()
      .collection('Guardians')
      .doc(user.uid)
      .collection('myGuardians')
      .doc(id)
      .delete()
      .then(() => {
        firestore()
          .collection('Guardians')
          .doc(id)
          .collection('evidanceGroup')
          .doc(user.uid)
          .delete()
          .then(() => {
            loader(false);
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
    <GuardianContext.Provider
      value={{
        req,
        angels,
        reqCount,
        reqAngel,
        angelDetail,
        updateAngel,
        acceptReq,
        deleteReq,
        removeAngel,
      }}>
      {props.children}
    </GuardianContext.Provider>
  );
};

export const GuardianContext = createContext();
export default GuardianContextProvider;
