import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import './Login.css'

import { authorizeUser } from 'services/spotify'

import Paper from '@material-ui/core/Paper'

class Login extends Component {
  render() {
    return (
      <div className="login">
        <Paper className="login__card">
          <p>REACT Teste</p>
          <p>Desenvolvido por</p>
          <p>Murilo Henrique Ribeiro Rui</p>
          <Button variant="outlined" className="login__button" onClick={authorizeUser}>
            Realize seu login pelo Spotify!
          </Button>
        </Paper>
      </div>
    )
  }
}
export default Login
