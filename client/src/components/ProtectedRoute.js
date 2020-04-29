import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Navigation from './layout/Navigation';
import { Container, Divider, Segment } from 'semantic-ui-react';
import Footer from './layout/Footer';

const ProtectedRoute = ({ component: Component, ...rest }) =>
    <Route {...rest}
        render={props =>
            <Container>
                <Navigation />
                <Segment raised color ='red' >
                    <Component {...props} />
                    <Divider section clearing/>
                    <Footer />
                </Segment>
            </Container>
        }
    />


ProtectedRoute.propTypes = {
    Component: PropTypes.any
}

export default ProtectedRoute;