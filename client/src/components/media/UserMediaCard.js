import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Divider, Icon, Rating, Reveal, Dimmer, Loader, List, Button } from 'semantic-ui-react';
import { AuthContext } from 'context/auth-context';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import moment from 'moment'

import AddMovieIcon from './AddMovieIcon';
import RemoveMovieIcon from './RemoveMovieIcon';
import { MediaCardPageType } from '../../helpers/constants'
import MediaCard from './MediaCard';
import FromNow from './FromNow';


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
                createdAt
                voteAverage
            }
        }
    }
`

const style = {
    subHead: { "fontFamily": ['Bebas Neue', 'cursive'] },
    header: { "fontFamily": ['Comic Neue', 'cursive'] },
    overview: {
        "fontSize": 'x-small',
        "fontFamily": ['Quattrocento', 'serif'],

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

    const movies = data
        .getUser.createdMovies
        .map((movie) => {
            return {
                ...movie,
                id: movie._id,
                backdrop_path: movie.backdropPath,
                poster_path: movie.posterPath
            }
        }) || [];


    return <List divided verticalAlign='middle' relaxed animated selection size='huge'>
        {
            movies.map(movie => (
                <List.Item>
                    <List.Content floated='right'>
                        <Button onClick={() => { alert('clicked: Remove') }}>Remove</Button>
                        <Button onClick={() => { alert('clicked: More') }}>More</Button>
                    </List.Content>
                    <Image avatar src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} />
                    <List.Content>
                        <List.Header>
                            {movie.title}
                        </List.Header>
                        <List.Description>
                            <FromNow date={movie.createdAt} text='added' />
                            
                        </List.Description>
                    </List.Content>
                </List.Item>
            ))
        }
    </List>

}

UserMediaCard.propTypes = {

}

export default UserMediaCard;


// return <Card.Group divided verticalAlign='middle' size='huge' itemsPerRow='2'>
//     {
//         movies.map(movie => (
//             (movie.posterPath && movie.backdropPath) ?
//                 <div className="ui olive card mb-3" color='olive' >
//                     <div className="row no-gutters">
//                         <div className="col-md-4">
//                             <Reveal animated='move right'>
//                                 <Reveal.Content visible>
//                                     <Image src={'https://image.tmdb.org/t/p/w500' + movie.posterPath} size='small' />
//                                 </Reveal.Content>
//                                 <Reveal.Content hidden>
//                                     <Image src={'https://image.tmdb.org/t/p/w500' + movie.backdropPath} size='large' />
//                                 </Reveal.Content>
//                             </Reveal>
//                         </div>
//                         <div className="col-md-8">
//                             <div className="card-body">
//                                 <h5 className="card-title" style={style.header}>{movie.title}</h5>
//                                 <p className="card-text" style={style.overview}>{movie.overview.slice(0, 300)}{(movie.overview.length) > 300 ? '...' : ''}</p>
//                                 <p className="card-text"><small className="text-muted" style={style.subHead}><Icon name='calendar alternate outline' /> {movie.releaseDate}</small></p>
//                                 <Divider />
//                                 <RemoveMovieIcon onSubmit={() => {
//                                     updateUser();
//                                     refetch();
//                                 }} movieId={movie._id} />
//                                 {/**<ViewMovieIcon movie={movie} /> */}
//                                 <Rating maxRating={5} defaultRating={Math.round(movie.voteAverage / 2)} disabled icon='star' size='mini' />
//                             </div>
//                         </div>
//                     </div>
//                 </div> : ''
//         ))
//     }

// </Card.Group>