import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'

import { getAndStoreToken } from 'services/spotify'

import './Callback.css'
import CircularProgress from '@material-ui/core/CircularProgress';

class Login extends Component {
  spotifyApi = new SpotifyWebApi()

  constructor() {
    super()
    const params = this.getHashParams()
    const token = params.get('access_token')
    if (token) {
      this.spotifyApi.setAccessToken(token)
    }
  }

  handler() {
    const params = this.getHashParams()
    getAndStoreToken(params.get('code')).then(() => {
      this.props.history.push('/playlists')
    })
  }

  getHashParams() {
    return new URLSearchParams(window.location.search)
  }

  componentDidMount() {
    this.handler();
  }

  render() {
    return (
      <CircularProgress className="callback__loader" size="100px"/>
    )
  }
}
export default Login
