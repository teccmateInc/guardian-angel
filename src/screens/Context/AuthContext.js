import React, {createContext, useState} from 'react';

//Firebase Auth
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

//Auth Context
export const AuthContext = createContext();

const AuthContextProvider = props => {
  const [user, setUser] = useState();

  const signIn = async (email, pass, navigation) => {
    await auth()
      .signInWithEmailAndPassword(email, pass)
      .then(Token => {
        const User = Token.user;
        // console.log('User account created & signed in! --> ' + User.uid);
        firestore()
          .collection('Users')
          // .where('email', '==', User.email)
          .doc(User.uid)
          .get()
          .then(doc => {
            const UserData = doc.data();
            // console.log('Data --> ' + doc.id);
            setUser({
              uid: UserData.uid,
              name: UserData.name,
              email: UserData.email,
              phoneNumber: UserData.phoneNumber,
              DOB: UserData.DOB,
              gender: UserData.gender,
              country: UserData.country,
              city: UserData.city,
              address: UserData.address,
              timePeriod: UserData.timePeriod,
            });
            navigation.navigate('Tab', {
              phoneNumber: UserData.phoneNumber,
              DOB: UserData.DOB,
            });
          });
      })
      .catch(error => {
        error.code === 'auth/invalid-email'
          ? alert('That email address is invalid!')
          : console.error(error);
        console.error(error);
      });
  };

  const signUp = async (email, pass, username, navigation) => {
    await auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(Token => {
        const User = Token.user;
        console.log('User account created & signed in! --> ' + User);
        navigation.navigate('SignUpDetails', {
          email: User.email,
          username: username,
          uid: User.uid,
        });
      })
      .catch(error => {
        error.code === 'auth/email-already-in-use'
          ? alert('That email address is already in use!')
          : error.code === 'auth/invalid-email'
          ? alert('That email address is invalid!')
          : console.error(error);
      });
  };

  const signUpInfo = async (
    uid,
    timePeriod,
    name,
    email,
    phoneNumber,
    DOB,
    gender,
    country,
    city,
    address,
  ) => {
    firestore()
      .collection('Users')
      .doc(uid)
      .set({
        uid,
        timePeriod,
        name,
        email,
        phoneNumber,
        DOB,
        gender,
        country,
        city,
        address,
      })
      .then(() => {
        alert('Successfully Logged In!');
        setUser({
          uid: uid,
          timePeriod: timePeriod,
          name: name,
          email: email,
          phoneNumber: phoneNumber,
          DOB: DOB,
          gender: gender,
          country: country,
          city: city,
          address: address,
        });
      });
  };

  const recoverPass = email => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Password Link send to your Email!');
      });
  };

  const handleSignOut = navigation => {
    auth()
      .signOut()
      .then(() => Alert('Successfully signed out!'));
    navigation.navigate('Registration');
  };

  return (
    <AuthContext.Provider
      value={{user, signIn, signUp, signUpInfo, handleSignOut, recoverPass}}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
