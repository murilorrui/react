import { SET_ME } from './actionTypes';

const initialState = {
  me: ''
};
export const setMe = (state = initialState, action) => {
  switch (action.type) {
    case SET_ME:
      return {
        ...state,
        me: action.me
      };
    default:
      return state;
  }
};
