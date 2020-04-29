import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon, Header, Divider } from 'semantic-ui-react'

import AccountLoadingPage from './account/Loading';
import UpdateAccount from './account/UpdateAccount';

const Account = () => {

    const [state] = useState({
        isLoading: false,
        user: {},
        createdMovies: [],
        data: []
    })

    if (state.isLoading) return <AccountLoadingPage />

    return (
        <Fragment>
            <Header as='h2' icon textAlign='center'>
                <Icon name='user ' circular />
                Account Settings
                <Header.Subheader>
                            Manage your account settings and set e-mail preferences.
                </Header.Subheader>
            </Header>
            <Divider />
            <UpdateAccount/>
        </Fragment>
    )
}

Account.propTypes = {
    user: PropTypes.object
}

export default Account;