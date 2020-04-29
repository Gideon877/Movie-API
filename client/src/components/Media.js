import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types'
import { Header, Icon, Divider, Segment, Dimmer, Loader, Image, Button, List } from 'semantic-ui-react';
import { AuthContext } from 'context/auth-context';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import UserMediaCard from './media/UserMediaCard';

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

const Media = () => {
    const auth = useContext(AuthContext);

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
    console.log(movies);


    const movieList = movies.map(movie => (
        (movie.posterPath) ?
            <List.Item>
                <List.Content floated='right'>
                    <Button.Group>
                        <Button color='teal'>More</Button>
                        <Button.Or icon='setting' />
                        <Button color='yellow' >Like</Button>
                    </Button.Group>
                </List.Content>
                <Image avatar src={'https://image.tmdb.org/t/p/w500' + movie.posterPath} />
                <List.Content>{movie.title}</List.Content></List.Item>

            : ''

    ))

    return <Fragment>
        <Header as='h2' icon textAlign='center'>
            <Icon name='film ' circular />
                Media
                <Header.Subheader>
                Manage your playlists (create and update)
                </Header.Subheader>
        </Header>
        <Divider horizontal>
            <Header as='h4'>
                <Icon name='list ul' />
                Playlist
                </Header>
        </Divider>

        {(!movies)
            ?
            <h4>NO movie Fam</h4>

            : <Fragment>
                <Header as='h2' attached='top'>
                    My List
                </Header>
                <Segment attached>
                    <UserMediaCard />
                </Segment>

            </Fragment>

        }
    </Fragment>

}

Media.propTypes = {
    user: PropTypes.object
}

export default Media;