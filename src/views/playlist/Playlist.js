import React, { Component } from 'react'
import { connect } from 'react-redux'
import SpotifyWebApi from 'spotify-web-api-js'

import { authorizeUser } from 'services/spotify'

import { setMe } from 'store/actionCreators/me'
// import './Playlist.css'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Grid from '@material-ui/core/Grid'
import Icon from '@material-ui/core/Icon'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'

class Playlist extends Component {
  spotifyApi = new SpotifyWebApi()

  constructor() {
    super()
    this.state = {
      me: '',
      playlist: '',
      owner: '',
      tracks: []
    }
  }

  getPlaylist() {
    console.log(this.props.match.params.id);
    this.spotifyApi.getPlaylist(this.props.match.params.id).then(response => {
      console.log(response);
      this.setState({
        playlist: response.name,
        owner: response.owner.display_name,
        tracks: response.tracks.items
      })
    })
  }

  componentDidMount() {
   this.spotifyApi.setAccessToken(this.props.me.accessToken);
   this.getPlaylist();
  }

  deleteMusic(track) {
    this.spotifyApi.removeTracksFromPlaylistInPositions(this.props.match.params.id, track.track_number, track.id).then(() => {
      console.log('alo');
    });
  }

  render() {
    return (
      <div>
        <Grid item xs={12} className="playlists__list">
          <Paper className="playlists__card">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.tracks.map(row => (
                  <TableRow key={row.track.name}>
                    <TableCell component="th" scope="row">
                      {row.track.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <IconButton>
                        <Icon className="playlists__icons">edit_icon</Icon>
                      </IconButton>
                      <IconButton onClick={() => this.deleteMusic(row.track)}>
                        <Icon className="playlists__icons">delete_icon</Icon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = ({ me }) => ({ me })

const enhance = connect(mapStateToProps)

export default enhance(Playlist)
