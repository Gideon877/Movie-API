import React, { useContext } from 'react';
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Icon, Message, Divider, Header, Button } from 'semantic-ui-react'
import { NavLink, Link } from 'react-router-dom';
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

const Registration = () => {
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
                // Todo: add proper error handling

            }}
        >
            {({ errors, status, touched }) => (
                <><br className="my-4" />
                    <Header as='h2' icon textAlign='center'>
                        <Icon name='user secret' circular /> New Account
                        <Header.Subheader> Create new account for free.</Header.Subheader>
                    </Header>
                    <Divider />
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
                                <Button type='submit' basic color='blue' >Register</Button>
                                <Button type='reset' basic color='pink' >Reset</Button>
                                <Link to="/auth/google">
                                    <Button color='google plus' loading disabled>
                                        <Icon name='google plus' /> Google Plus
                                    </Button>
                                </Link>
                            </div>
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