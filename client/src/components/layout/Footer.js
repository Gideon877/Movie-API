import React from 'react';
import { List, Segment } from 'semantic-ui-react';
const styles = {
    footer: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        height: '100px',
        width: '100%',
        backgroundColor: '#f5f5f5',
    }
}
const Footer = () =>
    <Segment color='olive' style={styles.footer} >
        <List floated='right' horizontal>
            <List.Item href='https://github.com/Gideon877' target='_blank' >
                © GitHub, Inc.
        </List.Item>
            <List.Item disabled href='#'>Terms</List.Item>
            <List.Item disabled href='#'>Privacy</List.Item>
            <List.Item disabled href='#'>Contact</List.Item>
        </List>

        <List horizontal>
            <List.Item disabled href='#'>About Us</List.Item>
            <List.Item disabled href='#'>Portfolio</List.Item>
        </List>
    </Segment>

export default Footer;