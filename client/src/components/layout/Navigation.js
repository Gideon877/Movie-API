import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from 'context/auth-context';
import { NavLink } from 'react-router-dom';
import { Icon, Menu, Label } from 'semantic-ui-react'


const Navigation = () => {
    const [activeItem, setActiveItem]  = useState('home')
    const handleItemClick = (e, { name }) => setActiveItem(name);
     
    return <AuthContext.Consumer>
        {(context) => (
            <Menu vertical pointing fixed='left' color='red' icon='labeled' >
                <NavLink style={{ color: 'black'}} to='/home'>
                    <Menu.Item
                        name='home'
                        active={activeItem === 'home'}
                        onClick={handleItemClick}
                        ><Icon name='home' /> Home
                    </Menu.Item>
                </NavLink>
                <NavLink style={{ color: 'black'}} to='/media'>
                    <Menu.Item
                        name='film'
                        active={activeItem === 'film'}
                        onClick={handleItemClick}
                    ><Icon name='film' /> Media
                    <Label color='teal' size='small' floating>3</Label>
                    {/**<Label color='teal' size='mini' corner='right' floating>3</Label> */}
                    </Menu.Item>
                </NavLink>
        
                <Menu.Menu position='right'>
                <NavLink style={{ color: 'black'}} to='/account'>
                    <Menu.Item
                        name='user'
                        active={activeItem === 'user'}
                        onClick={handleItemClick}
                    ><Icon name='user' /> Account Settings
                    </Menu.Item>
                </NavLink>
                    <Menu.Item
                        name='sign-out'
                        onClick={context.logout}
                    ><Icon name='sign-out'/> Logout
                    </Menu.Item>
                </Menu.Menu>
            </Menu>

        )}
    </AuthContext.Consumer>
}
Navigation.propTypes = {
    title: PropTypes.string
}

export default Navigation;