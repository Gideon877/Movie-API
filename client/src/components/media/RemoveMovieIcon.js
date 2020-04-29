import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { Icon } from 'semantic-ui-react';
import { useMutation } from 'react-apollo';
import { useToasts } from 'react-toast-notifications';

import { AuthContext } from 'context/auth-context';

const REMOVE_MOVIE = gql`
    mutation removeMovie($movieId: ID!, $userId: ID!) {
        removeMovie(movieId: $movieId, userId: $userId)
    }
`

const RemoveMovieIcon = ({ movieId, onSubmit }) => {
    const auth = useContext(AuthContext);
    const [removeMovie] = useMutation(REMOVE_MOVIE);
    const { addToast } = useToasts();
    const [isLoading, setLoading] = useState(false)

    const handleLike = () => {
        onSubmit();
        addToast('Removed', { appearance: 'success', autoDismiss: true });
        setLoading(false)
        // updateData(movies.filter(item => item.title !== movies.title))
    }

    return <Icon basic
        color='orange'
        disabled={isLoading}
        link size='large'
        name='remove circle'
        onClick={() => {
            setLoading(true);
            removeMovie({
                variables: {
                    userId: auth.userId,
                    movieId
                }
            }).then(added =>
                (added.data.removeMovie) ?
                    handleLike() :
                    addToast('Failed to remove', { appearance: 'error', autoDismiss: true }))
                .catch(() => addToast('Failed to remove', { appearance: 'error', autoDismiss: true }))
        }}
    />
}

RemoveMovieIcon.propTypes = {
    movieId: PropTypes.string.isRequired,
    onSubmit: PropTypes.func
}

export default RemoveMovieIcon;

