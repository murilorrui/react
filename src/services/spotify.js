import queryString from 'query-string'

import http from 'services/http'

import store from 'store'
import { setAccessToken } from 'store/actionCreators/me'

const client = {
  id: 'bdb6fabc1b6344b9852137803f7182ea',
  secret: '8a5d9f1ee210417f935ddd0ed3dfdeba'
}

const redirectUri = 'http://localhost:3000/callback/'

export const generateRandomString = length => {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export const getAndStoreToken = async code => {
  const authorizationTokenUrl = '/token'

  const basic = btoa(`${client.id}:${client.secret}`)
  const headers = {
    Authorization: `Basic ${basic}`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  const options = { headers }

  const body = {
    grant_type: 'authorization_code',
    redirect_uri: redirectUri,
    code
  }

  const { ok, data } = await http.post(authorizationTokenUrl, queryString.stringify(body), options)

  if (ok) store.dispatch(setAccessToken(data.access_token))
}

export const authorizeUser = () => {
  const scope = 'user-read-private user-read-email'
  const state = generateRandomString(16)
  const uri = 'https://accounts.spotify.com/authorize?'
  const queryParams = {
    response_type: 'code',
    client_id: client.id,
    scope: scope,
    redirect_uri: redirectUri,
    state: state
  }

  window.location.href = uri + queryString.stringify(queryParams)
}

export default class SpotifyService {
  searchAlbums(title) {
    const options = this.getOptions()
    return this.http.get(`/search?q=${title}&type=album`, options).then(() => {
      console.log('asd')
    })
  }

  loadAlbum(id) {
    const options = this.getOptions()
    return this.http.get(`/albums/${id}`, options)
  }

  getOptions() {
    console.log(this.accessToken)
    console.log(this.tokenType)

    // const headers = new HttpHeaders({
    //   Authorization: `${this.tokenType} ${this.accessToken}`
    // });
    // const options = { headers }

    // return options;
  }
}
