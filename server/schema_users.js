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
        GetUserById(id: ID!): User
        GetAllUsers: [User]
    }
    type Mutation
    {
        CreateUser(username:String!,password:String!, dob:String, phone:String!, email:String!, country:String!, profilePic:String, bio:String, isPremium:Boolean): User
        Login(username:String!,password:String!):Boolean
        DeleteUser(id: ID!): [User]
        AddTeamFollowing(userId:ID!,teamID: ID!) : User
        AddPlayerFollowing(userId:ID!,PlayerID: ID!) : User
        DeleteTeamFollowing(userId:ID!,teamID: ID!) : User
        DeletePlayerFollowing(userId:ID!,PlayerID: ID!) : User
    }
`;

module.exports = typeDefs;
