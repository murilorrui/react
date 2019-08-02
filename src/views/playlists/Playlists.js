import React, { Component } from 'react'
import { connect } from 'react-redux'
import SpotifyWebApi from 'spotify-web-api-js'

import { authorizeUser } from 'services/spotify'

import { setMe } from 'store/actionCreators/me'
import './Playlists.css'

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

class Playlists extends Component {
  spotifyApi = new SpotifyWebApi()
  me = 'teste'

  constructor() {
    super()
    this.state = {
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      me: '',
      playlists: []
    }
  }

  getMe() {
    this.spotifyApi.getMe().then(response => {
      this.setState({
        me: {
          display_name: response.display_name,
          email: response.email,
          image: response.images[0].url,
          country: response.country,
          followers: response.followers.total,
          id: response.id
        }
      })
    })
  }

  getMyPlaylists() {
    this.spotifyApi.getUserPlaylists(this.state.me.id).then(response => {
      this.setState({
        playlists: response.items
      })
    })
  }

  goToPlaylist(id) {
    this.props.history.push('/playlist/' + id);
  }

  componentDidMount() {
   this.spotifyApi.setAccessToken(this.props.me.accessToken);
   this.getMe();
  }

  render() {
    return (
      <div>
        <Grid container alignItems="center">
          <Grid className="playlists__img-container" item xs={4}>
            <img alt="" className="playlists__img" src={this.state.me.image}></img>
          </Grid>
          <Grid item xs={8} className="playlists__infos">
            <p>Usuário: {this.state.me.display_name}</p>
            <p>País: {this.state.me.country}</p>
            <p>Seguidores: {this.state.me.followers}</p>
            <p>E-mail: {this.state.me.email}</p>
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup className="playlists__button-group" fullWidth aria-label="full width button group">
              <Button variant="contained" className="playlists__buttons" onClick={() => this.getMyPlaylists()}>
                Ver playlists
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        {this.state.playlists.length > 0 && (
          <Grid item xs={12} className="playlists__list">
            <Paper className="playlists__card">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Musicas</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.playlists.map(row => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.tracks.total}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <IconButton onClick={() => this.goToPlaylist(row.id)}>
                          <Icon className="playlists__icons">visibility</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ me }) => ({ me })

const enhance = connect(mapStateToProps)

export default enhance(Playlists)
