import React from 'react';
import PropTypes from 'prop-types'
import { LoggedUser } from 'context/auth-context';
import UnAuthorizedNavigation from './layout/UnAuthorizedNavigation';

const _ = require('lodash');

const LandingPage = (props) => {
    /* Todo: add guest ux 
    * add trending movie and display slide
    * current users count
    * example of adding movies
    * */
    return <div>
        <UnAuthorizedNavigation />
        <h3>Landing Page</h3>
        <button className='btn btn-primary' onClick={() => props.history.push('/login')} >Login</button>
        <p>{'Logged in : ' + _.isString(LoggedUser.token)}</p>
    </div>
}

LandingPage.propTypes = {
    user: PropTypes.object
}

export default LandingPage;