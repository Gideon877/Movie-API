import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Divider, Icon, Rating, Reveal } from 'semantic-ui-react';

import AddMovieIcon from './AddMovieIcon';

const style = {
    subHead: { "font-family": ['Bebas Neue', 'cursive'] },
    header: { "font-family": ['Comic Neue', 'cursive'] },
    overview: {
        "font-size": 'x-small',
        "font-family": ['Quattrocento', 'serif'],

    }
}

const MediaCard = ({ movies }) =>
    <Card.Group divided verticalAlign='middle' size='huge' itemsPerRow='2'>
        {
            movies.map(movie => (
                (movie.poster_path && movie.backdrop_path) ?
                    <div class="ui olive card mb-3" color='olive' >
                        <div class="row no-gutters">
                            <div class="col-md-4">
                                <Reveal animated='move right'>
                                    <Reveal.Content visible>
                                        <Image src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} size='small' />
                                    </Reveal.Content>
                                    <Reveal.Content hidden>
                                        <Image src={'https://image.tmdb.org/t/p/w500' + movie.backdrop_path} size='large' />
                                    </Reveal.Content>
                                </Reveal>
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title" style={style.header}>{movie.title}</h5>
                                    <p class="card-text" style={style.overview}>{movie.overview.slice(0, 300)}{(movie.overview.length) > 300 ? '...' : ''}</p>
                                    <p class="card-text"><small class="text-muted" style={style.subHead}><Icon name='calendar alternate outline' /> {movie.release_date}</small></p>
                                    <Divider />
                                    <AddMovieIcon movie={movie} />
                                    {/**<ViewMovieIcon movie={movie} /> */}
                                    <Rating maxRating={5} defaultRating={Math.round(movie.vote_average / 2)} disabled icon='star' size='mini' />
                                </div>
                            </div>
                        </div>
                    </div> : ''
            ))
        }

    </Card.Group>

MediaCard.propTypes = {
    image: PropTypes.string.isRequired,
    header: PropTypes.string.isRequired,
    meta: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
}

export default MediaCard;

