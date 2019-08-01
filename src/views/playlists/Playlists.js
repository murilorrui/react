import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { SpotifyService } from '../../services/spotify.service';

class Playlists extends Component {
  spotifyService = new SpotifyService();

  render() {
    return (
      <div>
        <h2>Playlists</h2>
        <Button variant="contained" onClick={() => this.spotifyService.searchAlbums('astro')}>
          Default
        </Button>
      </div>
    );
  }
}

export default Playlists;
