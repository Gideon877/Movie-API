const { gql } = require('apollo-server');

module.exports = gql`
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        username: String!
        password: String
        email: String!
        active: Boolean!
        lastSeen: String!
        createdMovies: [Movie!]!
    }

    type Movie {
        _id: ID!
        adult: Boolean!
        backdropPath: String
        originalLanguage: String!
        overview: String!
        popularity: Float
        posterPath: String
        releaseDate: String!
        title: String!
        creator: User!
        voteAverage: Float
        createdAt: String!
    }

    type Playlist {
        _id: ID!
        movies: [Movie!]!
        user: User!
        createdAt: String!
        updatedAt: String!
    }

    input MovieInput {
        adult: Boolean!
        backdropPath: String
        originalLanguage: String!
        overview: String!
        popularity: Float
        posterPath: String!
        releaseDate: String!
        title: String!
        userId: ID!
        voteAverage: Float
    }


    input UserInput {
        firstName: String!
        lastName: String!
        username: String!
        password: String
        email: String!
    }

    type Auth {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    type RegisteredUser {
        _id: ID!
        username: String!
        # password: String
    }

    type Query {
        movies: [Movie!]!
        playlists: [Playlist!]!
        # findUserPlaylists: [Playlist!] //Todo: add auth
        # getPlaylistById(playlistId: ID!): Playlist! //Todo: add auth
        users: [User!]! #only admin
        getUser(userId: ID!): User!
        findUserMovies(movieId: ID!): Movie!
    }

    type Mutation {
        createMovie(movie: MovieInput): Boolean
        createUser(user: UserInput): Boolean
        signIn(username: String!, password: String!): Auth!
        updateUser(user: UserInput): Boolean
        removeMovie(movieId: ID!, userId: ID!): Boolean
    }

    type Subscription {
        onLogin: User
        # onRegister: RegisteredUser
    }

    schema {
        query: Query,
        mutation: Mutation,
        subscription: Subscription
    }
`