import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'semantic-ui-css/semantic.min.css';
import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';

import { ToastProvider } from 'react-toast-notifications';
import Account from './components/Account';
import UnAuthorizedRoute from './components/UnAuthorizedRoute';
import Media from './components/Media';
import Login from './components/signup/Login';
import Registration from './components/signup/Registration';
import LandingPage from './components/LandingPage';
import MainLayout from './components/layout/MainLayout';
import Home from './components/Home'
import About from './components/About';

import { AuthContext } from './context/auth-context';

const _ = require('lodash');

const App = () => {
	const [state, setState] = useState({
		userId: null,
		token: null,
		signedUp: false,
	});

	const login = (userId, token, tokenExpiration) => {
		setState({ token, userId });
		localStorage.clear();
		localStorage.setItem('token', token);
	};

	const logout = () => {
		setState({ token: null, userId: null, currentUser: null });
	};

	return (
		<Router>
			<AuthContext.Provider
				value={{
					token: state.token,
					userId: state.userId,
					signedUp: () =>
						setState({ signedUp: true }),
					login,
					logout,
				}}
			>
				<main className="main-content">
					<ToastProvider>
						<Switch>
							{state.token && (
								<Redirect
									from="/login"
									to="/home"
									exact
								/>
							)}
							{!state.token && (
								<Redirect
									from="/home"
									to="/login"
									exact
								/>
							)}
							{!state.token && (
								<Redirect
									from="/account"
									to="/login"
									exact
								/>
							)}
							{!state.token && (
								<Redirect
									from="/media"
									to="/login"
									exact
								/>
							)}
							{state.signedUp && (
								<Redirect
									from="/register"
									to="/login"
									exact
								/>
							)}
							{/* state.token && <Redirect from='/home' to='/about' exact /> */}

							{!state.token && (
								<UnAuthorizedRoute
									exact
									path="/"
									component={
										LandingPage
									}
								/>
							)}
							{!state.token && (
								<UnAuthorizedRoute
									exact
									path="/login"
									component={
										Login
									}
								/>
							)}
							{!state.token && (
								<UnAuthorizedRoute
									exact
									path="/register"
									component={
										Registration
									}
								/>
							)}

							{state.token && (
								<MainLayout
									exact
									path="/about"
									component={
										About
									}
								/>
							)}
							{state.token && (
								<MainLayout
									exact
									path="/home"
									component={
										Home
									}
								/>
							)}
							{state.token && (
								<MainLayout
									exact
									path="/media"
									component={
										Media
									}
								/>
							)}
							{state.token && (
								<MainLayout
									exact
									path="/account"
									component={
										Account
									}
								/>
							)}
							<Route
								path="*"
								component={() => (
									<h3 align="center">
										404
										NOT
										FOUND
									</h3>
								)}
							/>
							{/**
					<Redirect from='/' to='login' /> */}
						</Switch>
					</ToastProvider>
				</main>
			</AuthContext.Provider>
		</Router>
	);
};

export default App;
