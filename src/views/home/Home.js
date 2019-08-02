import React, { Component } from 'react'
import SpotifyWebApi from 'spotify-web-api-js'
import { connect } from 'react-redux'

import './Home.css'

import Login from 'components/login/Login'

import { setMe } from 'store/actionCreators/me'

class Home extends Component {
  spotifyApi = new SpotifyWebApi()

  constructor() {
    super()
  }

  render() {
    return (
      <div className="App">
        <Login />
      </div>
    )
  }
}

export default Home
