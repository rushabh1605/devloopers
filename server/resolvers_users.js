const { gql } = require("apollo-server");
const data = require("./data");
const { deleteUser } = require("./data/users");
const user = data.users;
const resolvers = {
    Query:{
        GetAllUsers: async () => {
            
                const user_list = await user.getAllUsers();
                if(user_list.errors){
                    return user_list.errors[0].message
                }
                else{
                    return (user_list);
                }
                
             

        },
        GetUserById: async (_, args) => {
            
                const oneUser = await user.getUserById(args.id);
                if(oneUser.errors){
                
                    return oneUser.errors[0].message
                }
                else{
                    return (oneUser);
                }
                
             
        }
    },
    Mutation:{
        CreateUser: async (_, args) => {
            
                const oneUser = await user.createUser(args.username,args.password,args.dob,args.phone, 
                    args.email, 
                    args.country, 
                    args.profilePic, 
                    args.bio, 
                    args.isPremium );
                if(oneUser.errors){
                        return oneUser.errors[0].message
                }
                else{
                    return (oneUser);
                }
               
              
        },
        DeleteUser: async(_,args)=>{
            const deleteone = await user.deleteUser(args.id);
                if(deleteone.errors){
                
                    return deleteone.errors[0].message
                }
                else{
                    return (deleteone);
                }
        },
        Login: async(_,args)=>{
            const loggedIn = await user.checkUser(args.username,args.password);
                if(loggedIn.errors){
                
                    return loggedIn.errors[0].message
                }
                else{
                    return (loggedIn);
                }
        },
        AddTeamFollowing: async(_,args)=>{
            const addTeam = await user.addTeamFollowing(args.userId,args.teamID);
                if(addTeam.errors){
                
                    return addTeam.errors[0].message
                }
                else{
                    return (addTeam);
                }
        },
        AddPlayerFollowing: async(_,args)=>{
            const addPlayer = await user.addPlayerFollowing(args.userId,args.PlayerID);
                if(addPlayer.errors){
                
                    return addPlayer.errors[0].message
                }
                else{
                    return (addPlayer);
                }
        },
        DeleteTeamFollowing: async(_,args)=>{
            const deleteTeam = await user.deleteTeamFollowing(args.userId,args.teamID);
                if(deleteTeam.errors){
                
                    return deleteTeam.errors[0].message
                }
                else{
                    return (deleteTeam);
                }
        },
        DeletePlayerFollowing: async(_,args)=>{
            const deletePlayer = await user.deletePlayerFollowing(args.userId,args.PlayerID);
                if(deletePlayer.errors){
                
                    return deletePlayer.errors[0].message
                }
                else{
                    return (deletePlayer);
                }
        },
    },
}

module.exports = resolvers;
