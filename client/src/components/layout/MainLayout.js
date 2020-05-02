import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Divider, Icon, Responsive, Header } from 'semantic-ui-react';
import Axios from 'axios';
import { gql } from 'apollo-boost';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { useToasts } from 'react-toast-notifications';

import { AuthContext } from 'context/auth-context';
import MediaCard from '../media/MediaCard';

const _ = require('lodash');

const GET_USER = gql`
    query getUser ($userId: ID!) {
        getUser (userId: $userId) {
            firstName
            lastName
        }
    }
`

const ON_LOGIN = gql`
    subscription onLogIn {
        onLogin {
            firstName
            lastName
            _id
            username
        }
    }
`

const MainLayout = (props) => {
    const auth = useContext(AuthContext);
    const [searched, setResult] = useState([])
    const [popular, setPopular] = useState([]);
    const [isLoading, setLoading] = useState(false)
    const { addToast } = useToasts();

    useEffect(() => {
        const getData = async () =>
            process.env.REACT_APP_API_HOME_URL && await Axios.get(`${process.env.REACT_APP_API_HOME_URL}`)
                .then(response =>
                    setPopular(response.data.results ? response.data.results : []))
                .catch((err) => addToast(err, { appearance: 'error', autoDismiss: true }));
        if (_.isEmpty(popular)) {
            getData();
        }
    });

    // const { loading, data } = useQuery(GET_USER, {
    //     variables: {
    //         userId: auth.userId
    //     }
    // })

    const { loading, data } = useSubscription(ON_LOGIN);

console.log(data);

    if (loading) return <h4 align='center'>...Loading</h4>

    return <p>No data</p>
    if (!data || !data.onLogin) {
        auth.logout();
        return;
    }

    const { firstName, lastName } = data.getUser;

    return (
        <Responsive>
            <Header as='h2' icon textAlign='center'>
                <Icon name='search ' circular />
                Search and Like
                <Header.Subheader>
                    {firstName} {lastName}
                </Header.Subheader>
            </Header>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon color='green' name='user' />
                </Header>
            </Divider>
            <br />
            <Input iconPosition='right'
                loading={isLoading}
                fluid size='large'
                icon='search'
                placeholder='Search...'
                onChange={(e) => {
                    e.preventDefault();
                    if (e.target.value.trim().length !== 0) setLoading(true);
                    Axios.get(`${process.env.REACT_APP_API_URL}${e.target.value}`)
                        .then(response => setResult([...response.data.results]))
                        .then(() => setLoading(false))
                        .catch(err => setResult([]))
                }}
            />
            <br />
            {(searched.length > 0) && <MediaCard {...props} movies={searched} />}
            {popular.length > 0 && <MediaCard {...props} movies={popular} />}
        </Responsive>
    )
}

MainLayout.propTypes = {
    /**
     * @param { Object } user
     * @param { String } user.firstName
     * @param { String } user.lastName
     */
    user: PropTypes.object
}

export default MainLayout;