const { gql } = require("apollo-server");

const typeDefs = gql`
    type User
    {

        _id: ID!

        username: String!

        password : String!

        dob: String

        phone: String

        email: String!

        country: String

        profilePic: String

        bio: String

        isPremium: Boolean

        coins: Int

        followingTeamID : [String]

        followingPlayerID: [String]

    }
    type userLogin {
        userId: String
      }
    type Query 
    {
        getUserById(id: ID!): User
        getAllUsers: [User]
    }
    type Mutation
    {
        createUser(username:String!,password:String!, dob:String, phone:String!, email:String!, country:String!, profilePic:String, bio:String, isPremium:Boolean): User
        login(username:String!,password:String!):Boolean
        deleteUser(id: ID!): [User]
        addTeamFollowing(userId:ID!,teamID: ID!) : User
        addPlayerFollowing(userId:ID!,PlayerID: ID!) : User
        deleteTeamFollowing(userId:ID!,teamID: ID!) : User
        deletePlayerFollowing(userId:ID!,PlayerID: ID!) : User
    }
`;

module.exports = typeDefs;
