import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'

import { SpotifyService } from 'services/spotify'

class Playlists extends Component {
  spotifyService = new SpotifyService()

  render() {
    return (
      <div>
        {this.props.me}
        <h2>Playlists</h2>
        <Button variant="contained" onClick={() => this.spotifyService.searchAlbums('astro')}>
          Default
        </Button>
      </div>
    )
  }
}

const mapStateToProps = ({ me }) => ({ me })

const enhance = connect(mapStateToProps)

export default enhance(Playlists)
