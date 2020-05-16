import React, {  } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

const ViewMovieIcon = () =>  <Icon basic
        color='orange'
        link size='large'
        name='folder open outline circle'
    />

ViewMovieIcon.propTypes = {
    // image: PropTypes.string.isRequired,
    // header: PropTypes.string.isRequired,
    // meta: PropTypes.string.isRequired,
    // description: PropTypes.string.isRequired,
}

export default ViewMovieIcon;