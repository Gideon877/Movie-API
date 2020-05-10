import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react';

const SearchInput = ({ onType, loading }) => {
    return <Input iconPosition='right'
        loading={loading}
        fluid size='large'
        icon='search'
        placeholder='Search...'
        onChange={onType}
    />
}

SearchInput.propTypes = {
    onType: PropTypes.func.isRequired,
    loading: PropTypes.bool
}

export default SearchInput;