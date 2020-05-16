import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Container, Divider, Sidebar, Menu, Grid, GridColumn } from 'semantic-ui-react';
import { gql } from 'apollo-boost';
import { AuthContext } from 'context/auth-context';
import { useQuery } from 'react-apollo';
const _ = require('lodash');

import Footer from '../layout/Footer';
import Navigation from '../layout/Navigation';
import LoadingScreen from '../LoadingScreen';

const GET_USER = gql`
    query getUser ($userId: ID!) {
        getUser (userId: $userId) {
            firstName
            lastName
            username
            email
            createdMovies {
                _id
                adult
                backdropPath
                originalLanguage
                overview
                popularity
                posterPath
                releaseDate
                title
                voteAverage
            }
    
        }
    }
`

const MainLayout = ({ component: Component, ...rest }) => {
    const auth = useContext(AuthContext);
    const [visible, setVisible] = useState(true)
    const { loading, data, refetch } = useQuery(GET_USER, {
        variables: { userId: auth.userId }
    });

    if (loading) return <LoadingScreen />
    // alert(JSON.stringify(data))
    if (_.isEmpty(data) ||
        _.isEmpty(data.getUser)) {
        auth.logout();
        return '';
    }

    const currentUser = data.getUser;

    return <Route {...rest}
        render={props =>
            <Grid columns={2}>
                <GridColumn width={16}>
                    <Navigation currentUser={currentUser} {...props} />
                    <Divider hidden style={{
                        height: '40px'
                    }}/>
                    <Component updateUser={refetch} currentUser={currentUser} {...props} visible={visible} setVisible={setVisible} />
                    <Divider section clearing hidden style={{
                        height: '100px'
                    }}/>
                    <Footer />
                </GridColumn>
            </Grid>
        }
    />
}

MainLayout.propTypes = {
    Component: PropTypes.any
}

export default MainLayout;