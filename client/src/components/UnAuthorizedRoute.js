import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Navigation from './layout/Navigation';
import { Container, Divider, Segment } from 'semantic-ui-react';
import Footer from './layout/Footer';
import { gql } from 'apollo-boost';
import { AuthContext } from 'context/auth-context';
import { useQuery } from 'react-apollo';
import LoadingScreen from './LoadingScreen';
import UnAuthorizedNavigation from './layout/UnAuthorizedNavigation';


const UnAuthorizedRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest}
        render={props =>
            <Container>
                <UnAuthorizedNavigation currentPath={rest.location.pathname} />
                <Segment raised color='red' >
                    <Component {...props} />
                    <Divider section clearing />
                    <Footer />
                </Segment>
            </Container>
        }
    />
}

UnAuthorizedRoute.propTypes = {
    Component: PropTypes.any
}

export default UnAuthorizedRoute;