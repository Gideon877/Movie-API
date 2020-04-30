import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Navigation from './layout/Navigation';
import { Container, Divider, Segment } from 'semantic-ui-react';
import Footer from './layout/Footer';
import { gql } from 'apollo-boost';
import { AuthContext } from 'context/auth-context';
import { useQuery } from 'react-apollo';

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

    const { loading, data, error, refetch } = useQuery(GET_USER, {
        variables: { userId: auth.userId }
    });

    if (loading) return 'Loading ...';

    const currentUser = data.getUser;

    return <Route {...rest}
        render={props =>
            <Container>
                <Navigation currentUser={currentUser} {...props} />
                <Segment raised color='red' >
                    <Component updateUser={refetch} currentUser={currentUser} {...props} />
                    <Divider section clearing />
                    <Footer />
                </Segment>
            </Container>
        }
    />
}


ProtectedRoute.propTypes = {
    Component: PropTypes.any
}

export default ProtectedRoute;