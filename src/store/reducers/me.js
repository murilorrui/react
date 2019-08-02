import { SET_ME, SET_ACCESS_TOKEN } from 'store/actionTypes/me'

const initialState = {
  id: '',
  accessToken: ''
}

export default (prevState, action) => {
  if (typeof prevState === 'undefined') return initialState

  const mergeState = right => ({
    ...prevState,
    ...right
  })

  switch (action.type) {
    case SET_ME:
      return mergeState({ me: action.me })
    case SET_ACCESS_TOKEN:
      return mergeState({ accessToken: action.accessToken })
    default:
      return prevState
  }
}
