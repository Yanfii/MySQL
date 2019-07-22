import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import Event from './Event';
import { BrowserRouter, Route } from 'react-router-dom';


const routes = (
	<BrowserRouter>
		<div>
				<Route exact path="/" component = {Main}/>
				<Route path="/events" component = {Event}/>
		</div>
	</BrowserRouter>
)

ReactDOM.render(
	routes,
	document.getElementById('root'));

