import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';

class Login extends Component {
  spotifyApi = new SpotifyWebApi();

  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      this.spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' }
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888'> Login to Spotify </a>
      </div>
    );
  }
}
export default Login;
