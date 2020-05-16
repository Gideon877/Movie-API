import React, { useContext, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Divider, Icon, Rating, Reveal } from 'semantic-ui-react';

import AddMovieIcon from './AddMovieIcon';
import { AuthContext } from '../../context/auth-context'
import ViewMovieIcon from './ViewMovieIcon';
import RemoveMovieIcon from './RemoveMovieIcon';

const style = {
    subHead: { "fontFamily": ['Bebas Neue', 'cursive'] },
    header: { "fontFamily": ['Comic Neue', 'cursive'] },
    overview: {
        "fontSize": 'x-small',
        "fontFamily": ['Quattrocento', 'serif'],

    }
}


const MAX_TEXT = 150;
const description = (overview) => `${overview.slice(0, MAX_TEXT)}${(overview.length) > MAX_TEXT ? '...' : ''}`

const MediaCard = ({ movies, updateUser, cardType }) => {
    const auth = useContext(AuthContext);
    return <Card.Group centered>
        {
            movies.map(movie =>
                (movie.poster_path && movie.backdrop_path) ?
                    <Card
                        key={movie.title}
                        image={'https://image.tmdb.org/t/p/w500' + movie.poster_path} size='small'
                        // header={movie.title}
                        // meta={movie.release_date}
                        // description={description(movie.overview)}
                        extra={(
                            <Fragment>
                                {
                                    (
                                        <Fragment>
                                            {(() => {
                                                switch (cardType) {
                                                    case 'HOME_PAGE':
                                                        return <AddMovieIcon updateUser={updateUser} movie={movie} />
                                                        break;
                                                    case 'MEDIA_PAGE':
                                                        return <Fragment>
                                                            <RemoveMovieIcon onSubmit={updateUser} movieId={movie._id} />
                                                        </Fragment>
                                                    default:
                                                        break;
                                                }
                                            }
                                            )()}
                                        </Fragment>
                                    )
                                }
                                <ViewMovieIcon movie={movie} />
                            </Fragment>
                        )}
                    />
                    : ''
            )
        }

    </Card.Group>
}

MediaCard.propTypes = {
    // image: PropTypes.string.isRequired,
    // header: PropTypes.string.isRequired,
    // meta: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
}

export default MediaCard;

// <div className="ui olive card mb-3" color='olive' key={movie.title} > 
//     <div className="row no-gutters">
//         <div className="col-md-4">
//             <Reveal animated='move right'>
//                 <Reveal.Content visible>
//                     <Image src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} size='small' />
//                 </Reveal.Content>
//                 <Reveal.Content hidden>
//                     <Image src={'https://image.tmdb.org/t/p/w500' + movie.backdrop_path} size='large' />
//                 </Reveal.Content>
//             </Reveal>
//         </div>
//         <div className="col-md-8">
//             <div className="card-body">
//                 <h5 className="card-title" style={style.header}>{movie.title}</h5>
//                 <p className="card-text" style={style.overview}>{movie.overview.slice(0, 300)}{(movie.overview.length) > 300 ? '...' : ''}</p>
//                 <p className="card-text"><small className="text-muted" style={style.subHead}><Icon name='calendar alternate outline' /> {movie.release_date}</small></p>
//                 <Divider />
//                 {auth.userId && <AddMovieIcon updateUser={updateUser} movie={movie} />}
//                 {/**<ViewMovieIcon movie={movie} /> */}
//                 <Rating maxRating={5} defaultRating={Math.round(movie.vote_average / 2)} disabled icon='star' size='mini' />
//             </div>
//         </div>
//     </div>
// </div> 