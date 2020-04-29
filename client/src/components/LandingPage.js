import React from 'react';
import PropTypes from 'prop-types'
import { LoggedUser } from 'context/auth-context';

const _ = require('lodash');

const LandingPage = (props) => {
    return <div>
        <h3>Landing Page</h3>
        <button className='btn btn-primary' onClick={() => props.history.push('/login')} >Login</button>
        <p>{'Logged in : ' + _.isString(LoggedUser.token)}</p>
    </div>
}

LandingPage.propTypes = {
    user: PropTypes.object
}

export default LandingPage;