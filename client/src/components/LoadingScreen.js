import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Container, Divider, Segment, Icon, Header } from 'semantic-ui-react';
import Footer from './layout/Footer';
import NavigationOnLoad from './layout/UnAuthorizedNavigation';

const LoadingScreen = () => {
    return <Route render={() =>
        <Container>
            <NavigationOnLoad />
            <Segment raised color='red' >
                <Header as='h2' icon textAlign='center'>
                    <Icon name='search ' circular />
            Search and Like
            <Header.Subheader>
                        Guest
                    </Header.Subheader>
                </Header>
                <Divider horizontal>
                    <Header as='h4'>
                        <Icon color='red' name='user secret' />
                    </Header>
                </Divider>
                <br />
                <Divider section clearing />
                <Footer />
            </Segment>
        </Container>
    } />
}


LoadingScreen.propTypes = {
    Component: PropTypes.any
}

export default LoadingScreen;