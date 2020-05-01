import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Navigation from './layout/Navigation';
import { Container, Divider, Segment } from 'semantic-ui-react';
import Footer from './layout/Footer';
import { gql } from 'apollo-boost';
import { AuthContext } from 'context/auth-context';
import { useQuery } from 'react-apollo';
import LoadingScreen from './LoadingScreen';
const _ = require('lodash');

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

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const auth = useContext(AuthContext);

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
            <Container>
                <Navigation currentUser={currentUser} {...props} />
                <Component updateUser={refetch} currentUser={currentUser} {...props} />
                <Divider section clearing />
                <Footer />
               
            </Container>
        }
    />
}

ProtectedRoute.propTypes = {
    Component: PropTypes.any
}

export default ProtectedRoute;