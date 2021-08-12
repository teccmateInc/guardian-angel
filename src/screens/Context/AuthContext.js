import React, {createContext, useState} from 'react';

//Firebase Auth
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

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
            UserData.phoneNumber === '' || UserData.timePeriod === ''
              ? navigation.navigate('SignUpDetails', {
                  email: UserData.email,
                  username: UserData.name,
                  uid: UserData.uid,
                })
              : (setUser({
                  avatar: UserData.avatar,
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
                }),
                navigation.navigate('Tab', {
                  phoneNumber: UserData.phoneNumber,
                  DOB: UserData.DOB,
                }));
          });
      })
      .catch(error => {
        error.code === 'auth/invalid-email'
          ? alert('That email address is invalid or doesnot exist!')
          : error.code === 'auth/wrong-password'
          ? alert('Your credentials is invalid!')
          : console.error(error);
      });
  };

  const signUp = async (email, pass, username, navigation) => {
    await auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(Token => {
        const User = Token.user;
        // console.log('User account created & signed in! --> ' + User);
        firestore().collection('Users').doc(User.uid).set({
          email: User.email,
          name: username,
          uid: User.uid,
          avatar: '',
          timePeriod: '',
          phoneNumber: '',
          DOB: '',
          gender: '',
          country: '',
          city: '',
          address: '',
        });
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
    navigation,
  ) => {
    firestore()
      .collection('Users')
      .doc(uid)
      .update({
        avatar: '',
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
          avatar: '',
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
        navigation.navigate('Tab');
      });
  };

  const recoverPass = email => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Password Link send to your Email!');
      });
  };

  const updateUserAvatar = async (avatar, name, country, city, address) => {
    const imageName = `profile${user['uid']}`;
    const uploadUri =
      Platform.OS === 'ios' ? avatar.replace('file://', '') : avatar;
    console.log('==> ' + uploadUri);
    await storage().ref(`userAvatars/${imageName}`).putFile(uploadUri);

    let imageRef = storage().ref(`userAvatars/${imageName}`);
    await imageRef.getDownloadURL().then(url => {
      firestore()
        .collection('Users')
        .doc(user['uid'])
        .update({
          avatar: url,
          name: name,
          city: city,
          address: address,
        })
        .then(() => {
          setUser({
            avatar: url,
            name: name,
            country: country,
            city: city,
            address: address,
            email: user['email'],
            phoneNumber: user['phoneNumber'],
            timePeriod: user['timePeriod'],
            DOB: user['DOB'],
            gender: user['gender'],
            uid: user['uid'],
          });
        });
    });
    setTimeout(() => {
      alert('Your Information is up-to Date!');
    }, 3000);
  };

  // Updata data to Firebase and locally
  const UpdateUser = async (avatar, name, country, city, address, Bool) => {
    // Update firebase document
    Bool
      ? await updateUserAvatar(avatar, name, country, city, address)
      : firestore()
          .collection('Users')
          .doc(user['uid'])
          .update({
            name: name,
            country: country,
            city: city,
            address: address,
          })
          .then(() => {
            setUser({
              name: name,
              country: country,
              city: city,
              address: address,
              avatar: user['avatar'],
              email: user['email'],
              phoneNumber: user['phoneNumber'],
              timePeriod: user['timePeriod'],
              DOB: user['DOB'],
              gender: user['gender'],
              uid: user['uid'],
            });
            setTimeout(() => {
              alert('Your Information is up-to Date!');
            }, 3000);
          });
  };

  const handleSignOut = navigation => {
    auth()
      .signOut()
      .then(() => alert('Successfully signed out!'));
    navigation.navigate('Registration');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        signUpInfo,
        handleSignOut,
        recoverPass,
        UpdateUser,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
