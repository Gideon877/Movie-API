import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon, Header, Divider, Breadcrumb } from 'semantic-ui-react'

const About = () => {
    return (
        <Fragment>
            <Header as='h2' icon textAlign='center'>
                <Icon name='user ' circular />
                Movie Title
                <Header.Subheader>
                    Manage your About settings and set e-mail preferences.
                </Header.Subheader>
            </Header>
            <Divider />

            <Breadcrumb>
                <Breadcrumb.Section link>Home</Breadcrumb.Section>
                <Breadcrumb.Divider icon='right chevron' />
                <Breadcrumb.Section active>About Title</Breadcrumb.Section>
            </Breadcrumb>
           
        </Fragment>
    )
}

About.propTypes = {
    user: PropTypes.object
}

export default About;