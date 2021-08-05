import {
  SIGN_IN_SUCCESSFUL,
  SIGN_IN_FAILED,
  SIGN_UP_SUCCESSFUL,
  SIGN_UP_FAILED,
} from '../index';
import {signIn, signUp} from '../../../api/authentication';

const signInAction = credentials => {
  return dispatch => {
    signIn(credentials)
      .then(data => {
        dispatch({
          type: SIGN_IN_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(err => {
        dispatch({
          type: SIGN_IN_FAILED,
          payload: err,
        });
      });
  };
};

const signUpAction = validatedData => {
  return dispatch => {
    signUp(validatedData)
      .then(data => {
        dispatch({
          type: SIGN_UP_SUCCESSFUL,
          payload: data,
        });
      })
      .catch(err => {
        dispatch({
          type: SIGN_UP_FAILED,
          payload: err,
        });
      });
  };
};

export {signInAction, signUpAction};
