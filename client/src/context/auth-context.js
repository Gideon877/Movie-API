import React from 'react'

const AuthContext = React.createContext({
	token: null,
	userId: null,
	login: (userId, token, tokenExpiration) => { },
	logout: () => { },
	signedUp: () => { }
});

const LoggedUser = () => React.useContext(AuthContext);

export { AuthContext, LoggedUser };