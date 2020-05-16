import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { Container, Divider, Segment, Icon, Header, Grid, GridColumn, Input } from 'semantic-ui-react';
import Footer from './layout/Footer';
import NavigationOnLoad from './layout/UnAuthorizedNavigation';
import UnAuthorizedNavigation from './layout/UnAuthorizedNavigation';

const LoadingScreen = () => {
    return <Route render={() =>
        <Grid>
            <GridColumn width={16}>
                <UnAuthorizedNavigation />
                <Divider hidden style={{
                    height: '40px'
                }} />

                <Header as='h2' icon textAlign='center'>
                    <Icon name='search' circular />
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

                <Input
                    loading
                    fluid size='large'
                    icon='search'
                    disabled
                    placeholder='We are currently waiting for network to finish loading'
                />

                <Divider section clearing hidden style={{
                    height: '100px'
                }} />
                <Footer />
            </GridColumn>
        </Grid>
    } />
}


LoadingScreen.propTypes = {
    Component: PropTypes.any
}

export default LoadingScreen;