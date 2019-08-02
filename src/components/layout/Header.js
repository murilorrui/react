import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './header.css';

class AppHeader extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
         <Toolbar className="header">
           <Typography variant="h6">
             REACT TESTE
           </Typography>
         </Toolbar>
       </AppBar>
      </div>
    );
  }
}

export default AppHeader;
