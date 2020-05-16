import React, { useContext, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import Navigation from './layout/Navigation';
import { Container, Divider, Segment, Grid, GridColumn } from 'semantic-ui-react';
import Footer from './layout/Footer';
import { gql } from 'apollo-boost';
import { AuthContext } from 'context/auth-context';
import { useQuery } from 'react-apollo';
import LoadingScreen from './LoadingScreen';
import UnAuthorizedNavigation from './layout/UnAuthorizedNavigation';


const UnAuthorizedRoute = ({ component: Component, ...rest }) => {
    return <Route {...rest}
        render={props =>
            <Grid>
                <GridColumn width={16}>
                    <UnAuthorizedNavigation currentPath={rest.location.pathname} />
                    <Divider hidden />
                    <Component {...props} />
                    <Divider section clearing hidden style={{
                        height: '100px'
                    }} />
                    <Footer />
                </GridColumn>
            </Grid>
        }
    />
}

UnAuthorizedRoute.propTypes = {
    Component: PropTypes.any
}

export default UnAuthorizedRoute;