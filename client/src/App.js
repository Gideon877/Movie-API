import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css'
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";

import Login from './components/signup/Login';
import Registration from './components/signup/Registration';
import LandingPage from './components/LandingPage';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import About from './components/About'

import { AuthContext } from './context/auth-context';
import Media from 'components/Media';
import Account from 'components/Account';
import { ToastProvider } from 'react-toast-notifications';
const _ = require('lodash');


const App = () => {
	const [state, setState] = useState({
		userId: null,
		token: null,
		movies: [],
		signedUp: false
	});

	const login = (userId, token, tokenExpiration) => {
		setState({ token, userId });

	}

	const logout = () => {
		setState({ token: null, userId: null });
	}

	console.log({ state });

	return (
		<Router>
			<AuthContext.Provider value={{
				token: state.token,
				userId: state.userId,
				signedUp: () => setState({ signedUp: true }),
				login,
				logout
			}} >
				<div className="App">
					<main className='main-content'>
						<ToastProvider>
						<Switch>
							{state.token && <Redirect from='/login' to='/home' exact />}
							{!state.token && <Redirect from='/home' to='/login' exact />}
							{!state.token && <Redirect from='/account' to='/login' exact />}
							{!state.token && <Redirect from='/media' to='/login' exact />}
							{state.signedUp && <Redirect from='/register' to='/login' exact />}
							{state.signedUp && <Redirect from='/home' to='/about' exact />}

							{!state.token && <Route exact path='/' component={LandingPage} />}
							{!state.token && <Route exact path='/login' component={Login} />}
							{!state.token && <Route exact path='/register' component={Registration} />}

							{state.token && <ProtectedRoute exact path='/about' component={About} />}
							{state.token && <ProtectedRoute exact path='/home' component={MainLayout} />}
							{state.token && <ProtectedRoute exact path='/media' component={Media} />}
							{state.token && <ProtectedRoute exact path='/account' component={Account} />}
							<Route path='*' component={() => <h3 align='center'>404 NOT FOUND</h3>} />
							{/**
					<Redirect from='/' to='login' /> */}
						</Switch>
						</ToastProvider>
					</main>
				</div>
			</AuthContext.Provider>
		</Router>
	);
}

export default App;
