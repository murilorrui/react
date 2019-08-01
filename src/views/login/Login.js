import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'

import { getAndStoreToken } from 'services/spotify'

class Login extends Component {
  spotifyApi = new SpotifyWebApi()

  constructor() {
    super()
    const params = this.getHashParams()
    const token = params.get('access_token')
    if (token) {
      this.spotifyApi.setAccessToken(token)
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }

  handler() {
    const params = this.getHashParams()
    getAndStoreToken(params.get('code'))
  }

  getHashParams() {
    return new URLSearchParams(window.location.search)
  }

  render() {
    return (
      <div className="App">
        <button onClick={this.handler.bind(this)}>Clique aqui</button>
      </div>
    )
  }
}
export default Login
