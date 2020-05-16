import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { LoggedUser } from 'context/auth-context';
import { Responsive, Header, Icon, Divider, GridColumn, Grid } from 'semantic-ui-react';
import Axios from 'axios';
const _ = require('lodash');

import SearchInput from './media/SearchInput';
import MediaCard from './media/MediaCard';
import UnAuthorizedNavigation from './layout/UnAuthorizedNavigation';
import { MediaCardPageType } from '../helpers/constants'

const LandingPage = (props) => {
    /* Todo: add guest ux 
    * add trending movie and display slide
    * current users count
    * example of adding movies
    * */
    const [searched, setResult] = useState([]);
    const [isLoading, setLoading] = useState(false)

    return <Grid>
        <GridColumn with={16}>
            <UnAuthorizedNavigation />
            <Divider hidden style={{
                height: '6px'
            }} />
            <Header as='h2' icon textAlign='center'>
                <Icon name='search' circular /> Search latest movies
            <Header.Subheader>
                    Guest
            </Header.Subheader>
            </Header>
            <Divider horizontal>
                <Header as='h4'>
                    <Icon name='user secret' />
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

            <MediaCard {...props} movies={searched} cardType={MediaCardPageType.LandingPage} />
        </GridColumn>
    </Grid>
}

LandingPage.propTypes = {
    user: PropTypes.object
}

export default LandingPage;