import React, { Fragment, useContext, useState } from 'react';
import PropTypes from 'prop-types'
import { Header, Icon, Divider, Segment, Dimmer, Loader, Image, Button, List, Menu } from 'semantic-ui-react';
import { AuthContext } from 'context/auth-context';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import UserMediaCard from './media/UserMediaCard';
import { generatePath } from 'react-router-dom';

const GET_USER = gql`
    query getUser ($userId: ID!) {
        getUser (userId: $userId) {
            username
            createdMovies {
                _id
                title
                posterPath
                backdropPath
            }
        }
    }
`

const style = {
    subHead: { "font-family": ['Bebas Neue', 'cursive'] },
    header: { "font-family": ['Comic Neue', 'cursive'] },
    overview: {
        "font-size": 'x-small',
        "font-family": ['Quattrocento', 'serif'],

    }
}

const Media = (props) => {
    const auth = useContext(AuthContext);
    const [activeItem, setState] = useState('LIKED')
    const handleItemClick = (e, { name }) => setState(name);

    const { loading, data } = useQuery(GET_USER, {
        variables: {
            userId: auth.userId
        }
    });

    if (loading) {
        return <Segment>
            <Dimmer active inverted>
                <Loader size='mini'>Loading</Loader>
            </Dimmer>

            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
    }
    const movies = data.getUser.createdMovies;

    /** Todo multiline:
     liked
     watched 
     watch later => set reminder
     playlists: by generatePath, year, actor or producer
     */

    return <Fragment>
        <Header as='h2' icon textAlign='center'>
            <Icon name='film ' circular /> Media
            <Header.Subheader>Manage your playlists (create and update)</Header.Subheader>
        </Header>
        <Divider horizontal>
            <Header as='h4'>
                <Icon name='list ul' />Playlist
            </Header>
        </Divider>
        <Menu pointing secondary color='olive' >
            <Menu.Item
                style={style.header}
                name='LIKED'
                active={activeItem === 'LIKED'}
                onClick={handleItemClick}
            />
            <Menu.Item
                style={style.header}
                name='WATCHED'
                active={activeItem === 'WATCHED'}
                onClick={handleItemClick}
            />
            <Menu.Item
                style={style.header}
                name='QUEUE'
                active={activeItem === 'QUEUE'}
                onClick={handleItemClick}
            />
            <Menu.Item
                style={style.header}
                name='PLAYLIST'
                active={activeItem === 'PLAYLIST'}
                onClick={handleItemClick}
            />
        </Menu>

        {(!movies)
            ?
            <h4>NO movie Fam</h4>

            : <Fragment>
                <Header as='h2' attached='top'>
                    My List
        </Header>
                <Segment attached>
                    <UserMediaCard updateUser={props.updateUser} />
                </Segment>

            </Fragment>

        }
    </Fragment>

}

Media.propTypes = {
    user: PropTypes.object
}

export default Media;
    // const movieList = movies.map(movie => (
    //     (movie.posterPath) ?
    //         <List.Item>
    //             <List.Content floated='right'>
    //                 <Button.Group>
    //                     <Button color='teal'>More</Button>
    //                     <Button.Or icon='setting' />
    //                     <Button color='yellow' >Like</Button>
    //                 </Button.Group>
    //             </List.Content>
    //             <Image avatar src={'https://image.tmdb.org/t/p/w500' + movie.posterPath} />
    //             <List.Content>{movie.title}</List.Content></List.Item>

    //         : ''

    // ))