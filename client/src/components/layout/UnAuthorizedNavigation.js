import React, { useState, Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Icon, Menu, Label } from 'semantic-ui-react'

const styles = {
    link: {
        color: 'white'
    }
}

const MenuLinkCheck = ({ currentPath }) => {
    return <Fragment>
        {
            currentPath !== '/login' ?
                <NavLink style={styles.link} to='/login'>
                    <Menu.Item>
                        <Icon name='sign-in' /> Signin
                    </Menu.Item>
                </NavLink> :
                <Menu.Item>
                    <Icon disabled name='sign-in' /> Signin
                </Menu.Item>
        }

        {
            currentPath !== '/register' ?
                <NavLink style={styles.link} to='/register'>
                    <Menu.Item>
                        <Icon name='add user' /> Signup
                    </Menu.Item>
                </NavLink> :
                <Menu.Item>
                    <Icon disabled name='add user' /> Signup
                </Menu.Item>
        }

    </Fragment>

}


const UnAuthorizedNavigation = (props) => {
    return <Menu secondary inverted pointing fixed='top' color='orange' size='mini' icon='labeled'>
        <NavLink style={styles.link} to='/'>
            <Menu.Item disabled><Icon name='home' /> Home
        </Menu.Item>
        </NavLink>
        <Menu.Menu position='right'>
            <Menu.Item
                disabled><Icon name='user secret' /> Guest
                </Menu.Item>

            <MenuLinkCheck currentPath={props.currentPath} />
        </Menu.Menu>
    </Menu >

}

UnAuthorizedNavigation.propTypes = {
    title: PropTypes.string
}

export default UnAuthorizedNavigation;