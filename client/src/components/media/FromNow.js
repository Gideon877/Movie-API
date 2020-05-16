import React, { Fragment } from 'react';
import moment from 'moment'

const FromNow = ({ date, text }) => (
    <Fragment>
        {text} {moment(new Date(Number(date))).fromNow()}
    </Fragment>
)

export default FromNow;
