import { SET_ME, SET_ACCESS_TOKEN } from 'store/actionTypes/me'

export const setMe = me => ({ type: SET_ME, me })
export const setAccessToken = accessToken => ({ type: SET_ACCESS_TOKEN, accessToken })
