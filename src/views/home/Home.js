import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import SpotifyWebApi from 'spotify-web-api-js';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Login from '../../components/login/Login';
import './Home.css';

import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';

class Home extends Component {
  spotifyApi = new SpotifyWebApi();
  me = 'teste';

  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      this.spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '' },
      me: '',
      playlists: [],
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

  getMe(){
    this.spotifyApi.getMe()
      .then((response) => {
        this.setState({
          me: {
            display_name: response.display_name,
            email: response.email,
            image: response.images[0].url,
            country: response.country,
            followers: response.followers.total,
            id: response.id,
          }
        });
      })
  }

  getMyPlaylists() {
    this.spotifyApi.getUserPlaylists(this.state.me.id)
      .then((response) => {
        this.setState({
          playlists: response.items,
        })
      });
  }

  componentDidMount() {
    this.getMe();
  }

  render() {
    return (
      <div className="App">
        { !this.state.loggedIn &&
            <Login/>
        }
        { this.state.loggedIn &&
          <Grid container alignItems="center">
            <Grid className="home__img-container" item xs={4}>
              <img className="home__img" src={this.state.me.image}></img>
            </Grid>
            <Grid item xs={8} className="home__infos">
              <p>
                Usuário: { this.state.me.display_name }
              </p>
              <p>
                País: { this.state.me.country }
              </p>
              <p>
                Seguidores: { this.state.me.followers }
              </p>
              <p>
                E-mail: { this.state.me.email }
              </p>
            </Grid>
            <Grid item xs={12}>
              <ButtonGroup className="home__button-group" fullWidth aria-label="full width outlined button group">
                <Button className="home__buttons" onClick={() => this.getMyPlaylists()}>Criar Playlist</Button>
              </ButtonGroup>
              <ButtonGroup className="home__button-group" fullWidth aria-label="full width outlined button group">
                <Button className="home__buttons" onClick={() => this.getMyPlaylists()}>Ver playlists</Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        }
        { this.state.playlists.length > 0 &&
          <Grid item xs={12} className="home__list">
            <Paper className="home__card">
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
                        <IconButton>
                          <Icon className="home__icons">edit_icon</Icon>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </Grid>
        }
      </div>
    );
  }
}
export default Home;
