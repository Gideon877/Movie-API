import React from 'react';
import { List, Button, Image } from 'semantic-ui-react';
import { useMutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { useToasts } from 'react-toast-notifications';

const ADD_MOVIE = gql`
    mutation createMovie($movie: MovieInput) {
        createMovie(movie: $movie)
    }
`

const ListItem = ({ movies, userId, userMovies }) => {
    const [addMovie] = useMutation(ADD_MOVIE);
    const { addToast } = useToasts();

    const handleLike = () => {
        addToast('Liked', { appearance: 'success', autoDismiss: true });
    }

    const titles = userMovies.map(element => element.title);
    const listItems = movies.map(movie => (
        (movie.poster_path) ? <List.Item>
            <List.Content floated='right'>
                <Button.Group>
                    <Button color='teal' disabled loading>More</Button>
                    <Button.Or icon='setting' />
                    <Button color='yellow'
                        disabled={titles.includes(movie.title)}
                        onClick={() => {
                            addMovie({
                                variables: {
                                    movie: {
                                        userId,
                                        posterPath: movie.poster_path,
                                        backdropPath: movie.backdrop_path,
                                        originalLanguage: movie.original_language,
                                        releaseDate: movie.release_date,
                                        voteAverage: movie.vote_average,
                                        adult: movie.adult,
                                        overview: movie.overview,
                                        popularity: movie.popularity,
                                        title: movie.title
                                    }
                                }
                            }).then(added =>
                                (added.data.createMovie) ?
                                    handleLike() :
                                    addToast('Failed to like', { appearance: 'error', autoDismiss: true }))
                                .catch(() => addToast('Failed to like', { appearance: 'error', autoDismiss: true }))
                        }}>Like</Button>
                </Button.Group>
            </List.Content>
            <Image avatar src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} />
            <List.Content>{movie.title}</List.Content>
        </List.Item> : ''
    ))


    return <List divided verticalAlign='middle' size='huge' >
        {listItems}
    </List>


}


ListItem.propTypes = {
    movie: PropTypes.object.isRequired,
    userId: PropTypes.string.isRequired
}

export default ListItem;