import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './views/home/Home'
import Login from './views/login/Login'
import Playlists from './views/playlists/Playlists'
import AppHeader from './components/layout/Header'
import Grid from '@material-ui/core/Grid'

const App = () => (
  <Router>
    <div>
      <AppHeader />
      <Grid container className="container" justify="center" alignItems="center">
        <Route exact path="/" component={Home} />
        <Route exact path="/playlists" component={Playlists} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/callback" component={Login} />
      </Grid>
    </div>
  </Router>
)

export default App
