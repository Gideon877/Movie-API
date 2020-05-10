// import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
// import { Responsive } from 'semantic-ui-react'


// const GET_USER = gql`
//     query getUser ($userId: ID!) {
//         getUser (userId: $userId) {
//             firstName
//             lastName
//         }
//     }
// `

// const Friends = ({ }) => {

//     const { loading, data } = useQuery(GET_USER, {
//         variables: {
//             userId: auth.userId
//         }
//     })


//     if (loading) return <h4 align='center'>...Loading</h4>
//     const { firstName, lastName } = data.getUser;

//     return <Responsive>
//         <Header as='h2' icon textAlign='center'>
//             <Icon name='search' circular link onClick={() => props.setVisible(!props.visible)} />
//                 Search and Add
//                 <Header.Subheader>
//                 {firstName} {lastName}
//             </Header.Subheader>
//         </Header>
//         <Divider horizontal>
//             <Header as='h4'>
//                 <Icon color='green' name='user' />
//             </Header>
//         </Divider>
//         <br />

//         {/** todo: Add user search */}



//     </Responsive>
// }