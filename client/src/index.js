import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import Event from './Event';
import Suppliers from './Suppliers';
import { BrowserRouter, Route } from 'react-router-dom';


const routes = (
	<BrowserRouter>
		<div>
				<Route exact path="/" component = {Main}/>
				<Route path="/events" component = {Event}/>
        <Route path="/suppliers" component = {Suppliers}/>
		</div>
	</BrowserRouter>
)

ReactDOM.render(
	routes,
	document.getElementById('root'));

