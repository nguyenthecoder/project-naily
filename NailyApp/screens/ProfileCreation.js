import React, {useState, useCallback, useEffect} from 'react';

import {
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {COLORS, SIZES, FONTS, NAVIGATOR_NAMES} from '../constants/index';
import {styles} from '../styles/index';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchProfileAction,
  createProfileAction,
} from '../redux/actions/profileActions';
import {
  PROFILE_CREATED_FAILED,
  PROFILE_CREATED_SUCCESSFUL,
  PROFILE_EMPTY,
  PROFILE_FETCHED,
} from '../redux/actions';

const ProfileCreation = ({navigation}) => {
  const [username, setUsername] = useState('username123');
  const [firstname, setFirstName] = useState('Firstname Test');
  const [lastname, setLastName] = useState('Lastname test');
  const [phonenumber, setPhoneNumber] = useState('123131313');
  const [avatarurl, setAvatarUrl] = useState(null);
  const [isProfileCreated, setIsProfileCreated] = useState(true);

  const dispatch = useDispatch();
  const actionType = useSelector(state => state.profileReducer.action.type);
  const errorMessage = useSelector(
    state => state.profileReducer.action.errorMessage,
  );

  const goBack = () => {
    navigation.goBack();
  };

  const goToMainNavigator = () => {
    navigation.replace(NAVIGATOR_NAMES.main);
  };

  const showMessage = (title, message = '', buttonText = 'Okay') => {
    Alert.alert(title, message, [
      {
        text: buttonText,
        style: 'cancel',
      },
    ]);
  };

  useEffect(() => {
    if (actionType == null) {
      dispatch(fetchProfileAction());
    } else {
      switch (actionType) {
        case PROFILE_CREATED_FAILED:
          showMessage('Error', errorMessage);
          break;
        case PROFILE_CREATED_SUCCESSFUL:
          goToMainNavigator();
          break;
        case PROFILE_FETCHED:
          navigation.replace(NAVIGATOR_NAMES.main);
          break;
        case PROFILE_EMPTY:
        default:
          setIsProfileCreated(false);
          break;
      }
    }
  }, [actionType, dispatch, navigation]);

  const submitProfileCreation = useCallback(() => {
    const data = {
      firstname: firstname,
      lastname: lastname,
      phonenumber: phonenumber,
      username: username,
      avatarurl: avatarurl,
    };
    dispatch(createProfileAction(data));
  }, [firstname, lastname, phonenumber, username, avatarurl, dispatch]);

  return (
    <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 0.5, y: 1.0}}
      colors={['#560BAD', '#9B65DA', '#4CC9F0']}>
      <SafeAreaView style={mainStyles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          {isProfileCreated ? (
            <View
              style={{
                ...mainStyles.centeredGroup,
              }}>
              <ActivityIndicator color={COLORS.white} size="large" />
              <Text style={{...FONTS.h2, color: COLORS.white}}>
                Fetching user profile
              </Text>
            </View>
          ) : (
            <View
              style={{
                ...mainStyles.centeredGroup,
              }}>
              <Text style={{...FONTS.h1, color: COLORS.white}}>
                Create Profile
              </Text>
              <View style={mainStyles.inputContainer}>
                <View style={mainStyles.inputGroup}>
                  <Text style={FONTS.h4}>Username</Text>
                  <TextInput
                    style={mainStyles.input}
                    onChangeText={setUsername}
                    value={username}
                  />
                </View>
                <View style={mainStyles.inputGroup}>
                  <Text style={FONTS.h4}>First name</Text>
                  <TextInput
                    style={mainStyles.input}
                    onChangeText={setFirstName}
                    value={firstname}
                  />
                </View>
                <View style={mainStyles.inputGroup}>
                  <Text style={FONTS.h4}>Last name</Text>
                  <TextInput
                    style={mainStyles.input}
                    onChangeText={setLastName}
                    value={lastname}
                  />
                </View>
                <View style={mainStyles.inputGroup}>
                  <Text style={FONTS.h4}>Phone number</Text>
                  <TextInput
                    style={mainStyles.input}
                    onChangeText={setPhoneNumber}
                    value={phonenumber}
                  />
                </View>
                <TouchableOpacity
                  onPress={submitProfileCreation}
                  style={{
                    ...mainStyles.actionButton,
                    backgroundColor: COLORS.orange,
                  }}>
                  <View>
                    <Text style={mainStyles.buttonText}>Create profile</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={goBack}
                  style={{
                    ...mainStyles.actionButton,
                  }}>
                  <View>
                    <Text style={mainStyles.buttonText}>Sign in</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const mainStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  centeredGroup: {
    paddingHorizontal: SIZES.largePadding,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.largePadding,
    borderRadius: SIZES.borderRadius,
    ...styles.shadow,
  },
  inputGroup: {
    justifyContent: 'center',
  },
  input: {
    height: 30,
    marginVertical: SIZES.margin15,
    borderRadius: SIZES.smallBorderRadius,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    paddingHorizontal: SIZES.padding,
  },
  actionButton: {
    alignItems: 'center',
    padding: SIZES.smallPadding,
    borderRadius: SIZES.borderRadius,
    backgroundColor: COLORS.green,
    ...styles.lightShadow,
    marginVertical: SIZES.margin,
  },
  buttonText: {
    ...FONTS.h2,
    color: COLORS.white,
  },
});

export default ProfileCreation;
