import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, Divider, Icon, Responsive, Header } from 'semantic-ui-react';
import Axios from 'axios';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import { useToasts } from 'react-toast-notifications';

import { AuthContext } from 'context/auth-context';
import MediaCard from './media/MediaCard';
import SearchInput from './media/SearchInput';

const _ = require('lodash');

const GET_USER = gql`
    query getUser ($userId: ID!) {
        getUser (userId: $userId) {
            firstName
            lastName
        }
    }
`


const Home = (props) => {
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

    const { loading, data } = useQuery(GET_USER, {
        variables: {
            userId: auth.userId
        }
    })



    if (loading) return <h4 align='center'>...Loading</h4>

    const { firstName, lastName } = data.getUser;

    return (
        <Responsive>
            <Header as='h2' icon textAlign='center'>
                <Icon name='search' circular link onClick={() => props.setVisible(!props.visible)} />
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
            <SearchInput loading={isLoading}
                onType={(e) => {
                    e.preventDefault();
                    if (e.target.value.trim().length !== 0) setLoading(true);
                    Axios.get(`${process.env.REACT_APP_API_URL}${e.target.value}`)
                        .then(response => setResult([...response.data.results]))
                        .then(() => setLoading(false))
                        .catch(() => setResult([]))
                }}
            />
            <br />
            <MediaCard {...props} movies={(searched.length > 0) ? searched : popular} />
        </Responsive>
    )
}

Home.propTypes = {
    /**
     * @param { Object } user
     * @param { String } user.firstName
     * @param { String } user.lastName
     */
    user: PropTypes.object
}

export default Home;