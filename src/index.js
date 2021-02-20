import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/Login';
import Homepage from './components/Homepage';

import * as serviceWorker from './serviceWorker';

const routing = (
	<Router>
		<div>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/homepage" component={Homepage} />
			</Switch>
		</div>
	</Router>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
