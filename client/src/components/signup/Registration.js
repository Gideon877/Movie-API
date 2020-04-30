import React, { useContext } from 'react';
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Icon, Message } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from 'react-apollo';
import { useToasts } from 'react-toast-notifications'
import { AuthContext } from 'context/auth-context';

const _ = require('lodash');

const CREATE_USER = gql`
    mutation createUser($user: UserInput) {
        createUser(user: $user) 
    }
`

const Registration = (props) => {
    const [addUser] = useMutation(CREATE_USER);
    const auth = useContext(AuthContext);
    const { addToast } = useToasts()

    return (
        <Formik
            initialValues={{
                firstName: 'vusi', lastName: 'baloi', username: 'vtrev', email: 'trev@gmail.com', password: 'password', confirmPassword: 'passwor'
            }}

            validationSchema={Yup.object().shape({
                firstName: Yup.string().required('First Name is required'),
                lastName: Yup.string().required('Last Name is required'),
                username: Yup.string().required('Username is required'),
                email: Yup.string().email('Email is invalid').required('Email is required'),
                password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
                confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
            })}

            onSubmit={(fields, { setErrors }) => {
                delete fields.confirmPassword;

                addUser({ variables: { user: { ...fields } } })
                    .then(res => {
                        if (res.data.createUser) {
                            addToast('Registration successfull', {
                                appearance: 'success', autoDismiss: true
                            })
                            auth.signedUp();
                            return;
                        }
                        setErrors({ api: 'User already exists.' })
                        addToast('Registration fail.', { appearance: 'error', autoDismiss: true })
                    })
                    .catch(err => addToast(_.get(err, ["message"]), { appearance: 'error', autoDismiss: true }))
                    // todo: add proper error handling

            }}
        >
            {({ errors, status, touched }) => (
                <><br className="my-4" />
                    <div className='jumbotron'>
                        <h5 className="display-5" align='center'>Movie App</h5>
                        <hr className="my-4" />
                        <p className="lead" align='center'>Create new account</p>
                    </div>
                    <div className='row'>
                        <div className='col-sm-3'></div>
                        <div className='col-sm-6'><Form>
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />
                                <ErrorMessage name="firstName" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />
                                <ErrorMessage name="lastName" component="div" className="invalid-feedback" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='username'>Username</label>
                                <Field name='username' type='text' className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                <ErrorMessage name='username' component='div' className='invalid-feedback' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor='password'>Password</label>
                                <Field name='password' type='password' className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                <ErrorMessage name='password' component='div' className='invalid-feedback' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                                <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                            </div>
                            <div className='form-group'>
                                <button type='submit' className='btn btn-primary mr-2'>Register</button>
                                <button type='reset' className='btn btn-secondary mr-2'>Reset</button>
                            </div>
                            <br />
                            <a href="/auth/google" class="button">
                                <div>
                                    <span class="svgIcon t-popup-svg">
                                        <svg
                                            class="svgIcon-use"
                                            width="25"
                                            height="37"
                                            viewBox="0 0 25 25"
                                        >
                                            <g fill="none" fill-rule="evenodd">
                                                <path
                                                    d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                                                    fill="#4285F4"
                                                />
                                                <path
                                                    d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                                                    fill="#34A853"
                                                />
                                                <path
                                                    d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                                                    fill="#FBBC05"
                                                />
                                                <path
                                                    d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                                                    fill="#EA4335"
                                                />
                                            </g>
                                        </svg>
                                    </span>
                                    <span class="button-label">Sign in with Google</span>
                                </div>
                            </a>
                            <br />
                            {errors.api ?
                                <Message attached='bottom' warning>
                                    <Icon name='warning circle' />
                                    {errors.api}
                                </Message> :
                                <Message attached='bottom' warning>
                                    <Icon name='help' />
                                    Already signed up?&nbsp;<NavLink to='/login'>Login here</NavLink>&nbsp;instead.
                            </Message>}
                        </Form></div>
                    </div></>
            )}
        </Formik>
    )
}

Registration.propTypes = {
    user: PropTypes.object
}

export default Registration;