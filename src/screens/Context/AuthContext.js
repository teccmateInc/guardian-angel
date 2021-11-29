import React, {createContext, useEffect, useState} from 'react';

//Firebase Auth
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {LoginManager, AccessToken} from 'react-native-fbsdk-next';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';

//Notification
import PushNotification from 'react-native-push-notification';

GoogleSignin.configure({
  webClientId:
    '279405197006-0jf94nna1b5lqab37il6inckp5tqt9ku.apps.googleusercontent.com',
});

const AuthContextProvider = props => {
  const [user, setUser] = useState();
  const date = new Date();

  useEffect(() => {
    userRegistry();
  }, [user]);

  const userRegistry = async () => {
    const getUser = await AsyncStorage.getItem('User');
    if (getUser !== null) {
      const verification = auth().currentUser.emailVerified;
      // console.log('Ver--> ', verification);

      return () => {
        setUser(JSON.parse(getUser));
        AsyncStorage.setItem('EmailVerified', JSON.stringify(verification));
      };
    }
  };

  async function handleGoogle() {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        const user = auth().currentUser;

        firestore()
          .collection('Users')
          .doc(user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              const UserData = doc.data();
              setProfile(UserData, navigation);
            } else {
              firestore().collection('Users').doc(user.uid).set({
                email: user.email,
                name: user.displayName,
                uid: user.uid,
                avatar: user.photoURL,
                timePeriod: '',
                phoneNumber: '',
                DOB: '',
                gender: '',
                country: '',
                city: '',
                address: '',
              });

              navigation.navigate('SignUpDetails', {
                email: user.email,
                username: user.displayName,
                uid: user.uid,
              });
            }
          });
      });
  }

  const handleFacebook = async navigation => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      return auth()
        .signInWithCredential(facebookCredential)
        .then(() => {
          const user = auth().currentUser;

          firestore()
            .collection('Users')
            .doc(user.uid)
            .get()
            .then(doc => {
              if (doc.exists) {
                const UserData = doc.data();
                setProfile(UserData, navigation);
              } else {
                firestore().collection('Users').doc(user.uid).set({
                  email: user.email,
                  name: user.displayName,
                  uid: user.uid,
                  avatar: user.photoURL,
                  timePeriod: '',
                  phoneNumber: '',
                  DOB: '',
                  gender: '',
                  country: '',
                  city: '',
                  address: '',
                });

                navigation.navigate('SignUpDetails', {
                  email: user.email,
                  username: user.displayName,
                  uid: user.uid,
                });
              }
            });
        });
    } catch (error) {
      alert(error);
    }
  };

  const signIn = async (email, pass, navigation) => {
    await auth()
      .signInWithEmailAndPassword(email, pass)
      .then(Token => {
        const User = Token.user;

        const verification = User.emailVerified;
        AsyncStorage.setItem('EmailVerified', JSON.stringify(verification));

        firestore()
          .collection('Users')
          .doc(User.uid)
          .get()
          .then(doc => {
            const UserData = doc.data();
            setProfile(UserData, navigation);
          });
      })
      .catch(error => {
        error.code === 'auth/invalid-email'
          ? alert('This email address is invalid or does not exist!')
          : error.code === 'auth/wrong-password'
          ? alert('Your credentials are invalid!')
          : console.error(error);
      });
  };

  const setProfile = (UserData, navigation) => {
    if (UserData.phoneNumber === '' || UserData.timePeriod === '') {
      navigation.navigate('SignUpDetails', {
        email: UserData.email,
        username: UserData.name,
        uid: UserData.uid,
      });
    } else {
      const data = {
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
      };
      AsyncStorage.setItem('User', JSON.stringify(data));
      setUser(data);
      navigation.navigate('Splash');
    }
  };

  const Expiry = `${
    7 + date.getDate()
  }-${date.getMonth()}-${date.getFullYear()}`;

  const signUp = async (email, pass, username, navigation) => {
    await auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(Token => {
        const User = Token.user;

        const verification = User.emailVerified;
        AsyncStorage.setItem('EmailVerified', JSON.stringify(verification));

        User.updateProfile({
          displayName: username,
        });
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
          type: 'trial',
          expiry: Expiry,
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
        const data = {
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
        };
        AsyncStorage.setItem('User', JSON.stringify(data));
        setUser(data);
        navigation.navigate('Splash');
      });
  };

  const recoverPass = email => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Password Link send to your Email!');
      });
  };

  const updateUserAvatar = async (
    avatar,
    name,
    country,
    city,
    address,
    timePeriod,
    activity,
    navigation,
  ) => {
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
          country: country,
          city: city,
          address: address,
          timePeriod: timePeriod,
        })
        .then(() => {
          const data = {
            avatar: url,
            name: name,
            country: country,
            city: city,
            address: address,
            timePeriod: timePeriod,
            email: user['email'],
            phoneNumber: user['phoneNumber'],
            DOB: user['DOB'],
            gender: user['gender'],
            uid: user['uid'],
          };
          AsyncStorage.setItem('User', JSON.stringify(data));
          setUser(data);
          activity(false);
          navigation.navigate('Profile');
          setTimeout(() => {
            alert('Your Information is up-to Date!');
          }, 3000);
        });
    });
  };

  // Updata data to Firebase and locally
  const UpdateUser = async (
    avatar,
    name,
    country,
    city,
    address,
    timePeriod,
    activity,
    Bool,
    navigation,
  ) => {
    // Update firebase document
    Bool
      ? await updateUserAvatar(
          avatar,
          name,
          country,
          city,
          address,
          timePeriod,
          activity,
          navigation,
        )
      : firestore()
          .collection('Users')
          .doc(user['uid'])
          .update({
            name: name,
            country: country,
            city: city,
            address: address,
            timePeriod: timePeriod,
          })
          .then(() => {
            const data = {
              name: name,
              country: country,
              city: city,
              address: address,
              timePeriod: timePeriod,
              avatar: user['avatar'],
              email: user['email'],
              phoneNumber: user['phoneNumber'],
              DOB: user['DOB'],
              gender: user['gender'],
              uid: user['uid'],
            };
            AsyncStorage.setItem('User', JSON.stringify(data));
            setUser(data);
            activity(false);
            navigation.navigate('Profile');
            setTimeout(() => {
              alert('Your Information is up-to Date!');
            }, 3000);
          });
  };
  const handleSignOut = async navigation => {
    await AsyncStorage.removeItem('User');
    await AsyncStorage.clear();
    await auth()
      .signOut()
      .then(async () => {
        navigation.replace('Registration');
      });
  };

  // handleSignOut();

  const resendVerification = () => {
    auth().currentUser.sendEmailVerification();
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
        resendVerification,
        handleFacebook,
        handleGoogle,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

//Auth Context
export const AuthContext = createContext();
