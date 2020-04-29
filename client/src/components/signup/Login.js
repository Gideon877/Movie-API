import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../../context/auth-context';
import { NavLink } from 'react-router-dom';
import { Icon, Message } from 'semantic-ui-react'
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

    return <Formik
        initialValues={{
            username: 'vtrev', password: 'password'
        }}

        validationSchema={Yup.object().shape({
            username: Yup.string().required('Username is required.'),
            password: Yup.string().required('Password is required.')
        })}

        onSubmit={(fields, { setErrors }) => {
            const variables = {
                ...fields
            }

            signIn({ variables })
                .then((res) => {
                    const { token, userId, tokenExpiration } = res.data.signIn;
                    addToast('Signed in.', { appearance: 'success', autoDismiss: true})
                    auth.login(userId, token, tokenExpiration);
                })
                .catch(err => {
                    addToast(_.get(err, ["message"]), { appearance: 'error', autoDismiss: true})
                    setErrors({ api: _.get(err, ["message"]) });
                })

        }}
    >
        {({ errors, status, touched }) => (
            <><br className="my-4" />
                <div className='jumbotron'>
                    <h5 className="display-5" align='center'>Movie App</h5>
                    <hr className="my-4" />
                    <p className="lead" align='center'>Login</p>
                </div>
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
                                <button type='submit' className='btn btn-primary mr-2'>Login</button>
                                <button type='reset' className='btn btn-secondary'>Reset</button>
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