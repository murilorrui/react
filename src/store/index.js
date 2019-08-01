import { createStore } from 'redux';
import { Reducers } from './reducers';
import { SET_ME } from './actionTypes';

export const setMe = value => ({
  type: SET_ME,
  me: value
});

export const Store = createStore(Reducers);
