import React, { useContext } from 'react';
import PropTypes from 'prop-types'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Icon, Message } from 'semantic-ui-react'
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';
import { AuthContext } from 'context/auth-context';
import { useToasts } from 'react-toast-notifications';

const GET_USER = gql`
    query getUser ($userId: ID!) {
        getUser (userId: $userId) {
            firstName
            lastName
            username
            email
        }
    }
`

const UPDATE_USER = gql`
    mutation updateUser($user: UserInput) {
        updateUser(user: $user)
    }
`

const UpdateAccount = ({ userId }) => {
    const { addToast } = useToasts();

    const auth = useContext(AuthContext);
    const [updateUser] = useMutation(UPDATE_USER);
    const { loading, data, error, refetch } = useQuery(GET_USER, {
        variables: { userId: auth.userId }
    });

    if (loading) return 'Loading ...';
    if (error) return 'Failed to fetch details';

    const { firstName, lastName, username, email } = data.getUser;
    const handleUpdate = () => {
        addToast('Updated.', { appearance: 'success', autoDismiss: true });
        refetch();
    }

    return (
        <Formik
            initialValues={{
                firstName, lastName, username, email
            }}

            validationSchema={Yup.object().shape({
                firstName: Yup.string().required('First Name is required'),
                lastName: Yup.string().required('Last Name is required'),
                username: Yup.string().required('Username is required'),
                email: Yup.string().email('Email is invalid').required('Email is required'),
                // password: Yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
                // confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required')
            })}

            onSubmit={fields => {
                //todo: add onSubmit loading
                updateUser({ variables: { user: { ...fields } } })
                    .then((result) => {
                        const isUpdated = result.data.updateUser;
                        (isUpdated) ? handleUpdate() : addToast('Failed to update.', { appearance: 'error', autoDismiss: true })
                    })
            }}
        >
            {({ errors, status, touched }) => (
                <><br className="my-4" />
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
                                <Field name='username' disabled type='text' className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                                <ErrorMessage name='username' component='div' className='invalid-feedback' />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            {/** 
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
                            */}
                            <div className='form-group'>
                                <button type='submit' className='btn btn-primary mr-2'>Update</button>
                                <button type='reset' className='btn btn-secondary mr-2'>Reset</button>
                            </div>

                            {errors.api &&
                                <Message attached='bottom' warning>
                                    <Icon name='help' />
                                    Failed to update account details?&nbsp;
                                </Message>
                            }
                        </Form></div>
                    </div></>
            )}
        </Formik>
    )
}

UpdateAccount.propTypes = {
    user: PropTypes.object
}

export default UpdateAccount;