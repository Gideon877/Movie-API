import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { Icon } from 'semantic-ui-react';
import { useMutation } from 'react-apollo';
import { useToasts } from 'react-toast-notifications';

import { AuthContext } from 'context/auth-context';

const ADD_MOVIE = gql`
    mutation createMovie($movie: MovieInput) {
        createMovie(movie: $movie)
    }
`

const AddMovieIcon = ({ movie }) => {
    const auth = useContext(AuthContext);
    const [addMovie] = useMutation(ADD_MOVIE);
    const { addToast } = useToasts();

    const handleLike = () => {
        addToast('Liked', { appearance: 'success', autoDismiss: true });
        // updateData(movies.filter(item => item.title !== movies.title))
    }

    return <Icon basic
        color='orange'
        link size='large'
        name='add circle'
        onClick={() => {
            addMovie({
                variables: {
                    movie: {
                        userId: auth.userId,
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
        }}
    />
}

AddMovieIcon.propTypes = {
    image: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    meta: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

export default AddMovieIcon;

