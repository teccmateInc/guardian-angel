import React, {createContext, useState, useContext, useEffect} from 'react';

//Context
import {AuthContext} from './AuthContext';

import firestore from '@react-native-firebase/firestore';

const GuardianContextProvider = props => {
  const [angels, setAngels] = useState([]);

  //Context
  const {user} = useContext(AuthContext);

  const reqAngel = (name, email, relation) => {
    // setAngels([...angels, {name, email, relation}]);
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then(doc => {
        !doc.empty ? alert('User Exist!') : alert('Where User Dont Exist!');
      })
      .catch(error => {
        alert('User Dont Exist!');
        console.log('Error getting documents: ', error);
      });

    // .then(doc
    //   if (doc.exists) {
    //   } else {
    //     alert('User Dont Exist!');
    //   }
    // });
    // firestore()
    //   .collection('Guardians')
    //   .doc(user['uid'])
    //   .collection('Request')
    //   .add({name: name, email: email, relation: relation, reqUID: user['uid']})
    //   .then(() => {
    //     alert('Evidence added!');
    //   });
  };

  const acceptAngel = (name, email, relation, myRelation) => {};
  const removeAngel = email => {
    setAngels(angels.filter(data => data.email !== email));
  };

  return (
    <GuardianContext.Provider value={{angels, reqAngel, removeAngel}}>
      {props.children}
    </GuardianContext.Provider>
  );
};

export const GuardianContext = createContext();
export default GuardianContextProvider;
