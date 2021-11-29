import {StyleSheet, Dimensions} from 'react-native';

export const {width, height} = Dimensions.get('window');

const pri = '#bb7fff';
const sec = '#cab8de';
const place = '#552e82';
const shadow = '#280056';

export const Theme = {
  colors: {
    primary: pri,
    accent: sec,
    placeholder: place,
    shadow,
  },
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexEndContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  H1: {
    fontSize: 36,
    color: Theme.colors.placeholder,
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  H2: {
    fontSize: 28,
    color: Theme.colors.primary,
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  H3: {
    fontSize: 22,
    color: Theme.colors.shadow,
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 20,
    marginVertical: 5,
    borderLeftWidth: 8,
    borderColor: Theme.colors.shadow,
    paddingLeft: 15,
  },
  H4: {
    fontSize: 16,
    color: Theme.colors.primary,
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 20,
    marginVertical: 5,
    borderLeftWidth: 8,
    borderColor: Theme.colors.shadow,
    paddingLeft: 15,
  },
  H5: {
    color: Theme.colors.shadow,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  TextShadow: {
    textShadowOffset: {width: 2.5, height: 2.5},
    textShadowColor: '#ddd',
    textShadowRadius: 5,
  },
  para: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginHorizontal: 20,
    marginVertical: 5,
  },
  PhoneInput: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    width: width - 80,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
  paper: {
    marginVertical: 10,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: Theme.colors.shadow,
    borderRadius: 5,
  },
  AuthView: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  AuthHeading: {
    fontSize: 50,
    color: Theme.colors.placeholder,
    letterSpacing: 2,
    fontFamily: 'Montserrat-Bold',
  },
  AuthSubHeading: {
    fontSize: 32,
    color: Theme.colors.primary,
    lineHeight: 40,
    fontFamily: 'Montserrat-Light',
  },
  AuthPassword: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 25,
    flex: 1,
  },
  AuthPara: {
    margin: 20,
    textAlign: 'center',
    color: '#aaa',
  },
  AuthParaHighlight: {
    color: Theme.colors.primary,
    top: 3,
  },
  LoaderContainer: {
    position: 'absolute',
    width,
    height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000090',
    elevation: 5,
  },
  LoaderText: {
    fontSize: 24,
    fontFamily: 'Poppins-Bold',
    color: '#fff',
    textAlign: 'center',
    margin: 5,
    textShadowColor: Theme.colors.placeholder,
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 20,
  },
});

export default styles;
