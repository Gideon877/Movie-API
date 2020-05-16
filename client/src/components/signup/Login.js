import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/auth-context';
import { NavLink } from 'react-router-dom';
import { Icon, Message, Header, Divider, Button } from 'semantic-ui-react'
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo';
import { useToasts } from 'react-toast-notifications';

const _ = require('lodash');

const SIGN_IN = gql`
    mutation signIn($username: String!, $password: String!) {
        signIn(username: $username, password: $password) {
            userId
            token
            tokenExpiration
        }
    }
`

const Login = () => {
    const auth = useContext(AuthContext);
    const [signIn] = useMutation(SIGN_IN);
    const { addToast } = useToasts();
    const [isLoading, setLoading] = useState(false);
    return <Formik
        initialValues={{
            username: 'vtrev', password: 'password'
        }}

        validationSchema={Yup.object().shape({
            username: Yup.string().required('Username is required.'),
            password: Yup.string().required('Password is required.')
        })}

        onSubmit={(fields, { setErrors }) => {
            setLoading(true);
            const variables = {
                ...fields
            }

            signIn({ variables })
                .then((res) => {
                    const { token, userId, tokenExpiration } = res.data.signIn;
                    auth.login(userId, token, tokenExpiration);
                    addToast('Signed in.', {
                        appearance: 'success',
                        autoDismissTimeout: 2000,
                        autoDismiss: true,
                        placement: 'bottom-center',
                    })
                    setInterval(() => setLoading(false), 2000)
                })
                .catch(err => {
                    addToast(_.get(err, ["message"]), {
                        appearance: 'error',
                        autoDismissTimeout: 2000,
                        autoDismiss: true,
                        placement: 'top-center',
                    })
                    setErrors({ api: _.get(err, ["message"]) });
                    setInterval(() => setLoading(false), 2000)
                })

        }}
    >
        {({ errors, status, touched }) => (
            <><br className="my-4" />
                <Header as='h2' icon textAlign='center'>
                    <Icon name='user secret' circular /> Login
                        <Header.Subheader> Enter your username and password to login.</Header.Subheader>
                </Header>
                <Divider />
                <div className='row'>
                    <div className='col-sm-3'></div>
                    <div className='col-sm-6'>
                        <Form>
                            <div className='form-group'>
                                <label htmlFor='username'>Username</label>
                                <Field name='username' type='text' className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                <ErrorMessage name='username' component='div' className='invalid-feedback' />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>Password</label>
                                <Field name='password' type='password' className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name='password' component='div' className='invalid-feedback' />
                            </div>
                            <div className='form-group'>
                                <Button type='submit' disabled={isLoading} loading={isLoading} basic color='black'>Login</Button>
                                <Button type='reset' disabled={isLoading} basic color='red' >Reset</Button>
                            </div>
                            {errors.api ?
                                <Message attached='bottom' warning>
                                    <Icon name='warning circle' />
                                    {errors.api}
                                </Message> :
                                <Message attached='bottom' warning>
                                    <Icon name='help' />
                                    Don't have an account?&nbsp;<NavLink to='/register'>Register here</NavLink>&nbsp;instead.
                                </Message>
                            }
                        </Form>
                    </div>
                </div>
            </>
        )}

    </Formik >
}


Login.propTypes = {
    user: PropTypes.object
}

export default Login;