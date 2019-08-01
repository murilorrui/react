import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './header.css';

class AppHeader extends Component {
  getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    if(!hashParams.access_token) {
      return (<Button href="/login" color="inherit">Login</Button>)
    }
    return;
  }

  render() {
    return (
      <div>
        <AppBar position="static">
         <Toolbar className="header">
           <Typography variant="h6">
             REACT TESTE
           </Typography>
           {
             this.getHashParams()
           }
         </Toolbar>
       </AppBar>
      </div>
    );
  }
}

export default AppHeader;
