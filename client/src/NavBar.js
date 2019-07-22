import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import App from './App';
import Event from './Event';

class NavBar extends Component {

    render() {
        return(
            <Router>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton edge="start" className='menuButton' color="inherit" aria-label="Menu">
                        <MenuIcon/>
                            <li>
                            <Link to="/">Home</Link>
                            </li>
                            <li>
                            <Link to="/event/">Event</Link>
                            </li>
                    </IconButton>
                    <Typography variant="h6" className='title'>
                        Users
                    </Typography>
                    </Toolbar>
                </AppBar>
                <Route path="/client/" component={App} />
                <Route path="/event/" component={Event} />
            </Router>
        )
    }
}

export default NavBar
