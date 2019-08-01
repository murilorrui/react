import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import './Login.css'

class Login extends Component {
  render() {
    return (
      <div className="login">
        <div>REACT Teste</div>
        <div>Desenvolvido por</div>
        <div>Murilo Henrique Ribeiro Rui</div>
        <Button variant="contained" color="primary">
          Login
        </Button>
      </div>
    )
  }
}
export default Login
