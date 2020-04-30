import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Divider, Icon, Rating, Reveal, Dimmer, Loader } from 'semantic-ui-react';

import AddMovieIcon from './AddMovieIcon';
import { AuthContext } from 'context/auth-context';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import RemoveMovieIcon from './RemoveMovieIcon';

const GET_USER = gql`
    query getUser ($userId: ID!) {
        getUser (userId: $userId) {
            username
            createdMovies {
                _id
                adult
                backdropPath
                originalLanguage
                overview
                popularity
                posterPath
                releaseDate
                title
                voteAverage
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

const UserMediaCard = ({ updateUser }) => {
    const auth = useContext(AuthContext);

    const { loading, data, refetch } = useQuery(GET_USER, {
        variables: {
            userId: auth.userId
        }
    });

    if (loading) return <Dimmer active inverted>
        <Loader size='mini'>Loading</Loader>
    </Dimmer>

    const movies = data.getUser.createdMovies || [];

    return <Card.Group divided verticalAlign='middle' size='huge' itemsPerRow='2'>
        {
            movies.map(movie => (
                (movie.posterPath && movie.backdropPath) ?
                    <div class="ui olive card mb-3" color='olive' >
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <Reveal animated='move right'>
                                    <Reveal.Content visible>
                                        <Image src={'https://image.tmdb.org/t/p/w500' + movie.posterPath} size='small' />
                                    </Reveal.Content>
                                    <Reveal.Content hidden>
                                        <Image src={'https://image.tmdb.org/t/p/w500' + movie.backdropPath} size='large' />
                                    </Reveal.Content>
                                </Reveal>
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title" style={style.header}>{movie.title}</h5>
                                    <p class="card-text" style={style.overview}>{movie.overview.slice(0, 300)}{(movie.overview.length) > 300 ? '...' : ''}</p>
                                    <p class="card-text"><small class="text-muted" style={style.subHead}><Icon name='calendar alternate outline' /> {movie.releaseDate}</small></p>
                                    <Divider />
                                    <RemoveMovieIcon onSubmit={() => {
                                        updateUser();
                                        refetch();
                                    }} movieId={movie._id} />
                                    {/**<ViewMovieIcon movie={movie} /> */}
                                    <Rating maxRating={5} defaultRating={Math.round(movie.voteAverage / 2)} disabled icon='star' size='mini' />
                                </div>
                            </div>
                        </div>
                    </div> : ''
            ))
        }

    </Card.Group>
}

UserMediaCard.propTypes = {

}

export default UserMediaCard;

