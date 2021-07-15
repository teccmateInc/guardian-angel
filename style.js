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
    width: width - 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
  },
});

export default styles;
