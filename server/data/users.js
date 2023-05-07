const mongoCollections = require('../config/mongoCollections');
const validation = require('../helpers');
const users = mongoCollections.users;
const {ObjectId} = require('mongodb');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const getAllUsers = async () => {
    
    const userscollection = await users();
    const users_data = await userscollection.find({}).toArray();
    if(users_data.length===0) throw {error:'No users found', statusCode:404};
    
    return users_data;
  };
const getUserById = async (userId) => {
    if(validation.valid_id(userId,"ID"));
    userId = userId.trim();
    const userscollection = await users();
    const users_data = await userscollection.findOne({_id: new ObjectId(userId)});
    if(users_data === null) throw {error:'No user found with '+userId, statusCode:404};
  
    return users_data; 
  };

  const deleteUser = async (userId) => {
    if(validation.valid_id(userId,"ID"));
    userId = userId.trim();
    let getuser = await getUserById(userId);
    if(getuser !== null){
        const userscollection = await users();
        const user_removed = await userscollection.deleteOne({_id: new ObjectId(userId)});
        if(user_removed.deletedCount === 0 ) throw {error:'Internal Server Error ', statusCode:500};
            return await getAllUsers(userId);
        }
        else{
            throw {error:'User not found', statusCode:404};
        }
  };

const createUser = async (
    username,
    password,
    dob, 
    phone, 
    email, 
    country, 
    profilePic, 
    bio
  ) => {

  
  if(validation.createUser_validations(username,password));
  // const hashed_password = await bcrypt.hash(password, saltRounds);
  if(validation.phone_check(phone));
  const check = await validation.email_check(email);
  if(check){
    if(!check.result){
  
      throw check.failReason
    }
  }

  if(validation.dateformat(dob));
  // if(validation.string(bio,"Bio"));
  if(validation.string(country,"Country"));
  let createuser = {
    username:username.trim().toLowerCase(),
    // password: hashed_password,
    dob:dob.trim() || "Not Provided", 
    phone:phone.trim(), 
    email:email.trim(), 
    country:country.trim(), 
    profilePic:profilePic || "Not Provided", 
    bio:bio.trim() || "Not Provided", 
    isPremium:false,
    coins:0,
    followingTeamID:[],
    followingPlayerID:[]
  };
 
  const userscollection = await users();
  const users_all = await userscollection.find({}, {projection: {_id: 1, username: 1}}).toArray();
  if(users_all.length===0){
    //do nothing
  }
  else{
    users_all.forEach(element => {
      if(element.username.toLowerCase() === username.trim().toLowerCase()){
        throw {error:'Username already exists !',statusCode:400}
      }
    });
  }
  
  const insert_user = await userscollection.insertOne(createuser);
  if(!insert_user.insertedId || !insert_user.acknowledged) throw {error:'Unable to create user', statusCode:500};
  const created = insert_user.insertedId.toString();
  const data = await getUserById(created);
  
  return data;
  };

  const checkUser = async (username, password) => 
{ 
  if(validation.createUser_validations(username,password));
  let compare_password = false;
  const userscollection = await users();
  const users_data = await userscollection.findOne({username:username.trim().toLowerCase()});
  if(users_data.length===0) throw {error:"Either the username or password is invalid",statusCode:400};
  compare_password = await bcrypt.compare(password, users_data.password);
  if(compare_password){
    return getUserById(users_data._id);
  }
  else{
    throw {error:"Either the username or password is invalid",statusCode:400};
  }
};

const addTeamFollowing = async (userId,teamID) => {
  if(validation.valid_id(userId,"User ID"));
  userId = userId.trim();
  const userscollection = await users();
  const exists = await userscollection.findOne({_id:new ObjectId(userId)});
  if(!exists) throw {error:"User not found",statusCode:400};
  else{
    if(exists.followingTeamID.includes(teamID)) throw {error:"Team Already exist in following list", statusCode:400};
    const users_data = await userscollection.updateOne({ _id: new ObjectId(userId) },{ $push: { followingTeamID: teamID } })
    if (users_data.modifiedCount === 0) throw {error:'Cannot Add the team to following list ', statusCode:500};
    const data = await getUserById(userId);
    return data;
  }

};
const addPlayerFollowing = async (userId,playerID) => {
  if(validation.valid_id(userId,"User ID"));
  userId = userId.trim();
  const userscollection = await users();
  const exists = await userscollection.findOne({_id:new ObjectId(userId)});
  if(!exists) throw {error:"User not found",statusCode:400};
  if(exists.followingPlayerID.includes(playerID)) throw {error:"PLayer Already exist in following list", statusCode:400};
  const users_data = await userscollection.updateOne({ _id: new ObjectId(userId) },{ $push: { followingPlayerID: playerID } })
  if (users_data.modifiedCount === 0) throw {error:'Cannot Add the player to following list ', statusCode:500};
  const data = await getUserById(userId);
  return data;
};

const deleteTeamFollowing = async (userId,teamID) => {
  if(validation.valid_id(userId,"User ID"));
  userId = userId.trim();
  const userscollection = await users();
  const exists = await userscollection.findOne({_id:new ObjectId(userId)});
  if(!exists) throw {error:"User not found",statusCode:400};
  else{
    const users_data = await userscollection.updateOne({ _id: new ObjectId(userId) },{ $pull: { followingTeamID: teamID } })
    if (users_data.modifiedCount === 0) throw {error:'Cannot remove the team from following list ', statusCode:500};
    const data = await getUserById(userId);
    return data;
  }

};
const deletePlayerFollowing = async (userId,playerID) => {
  if(validation.valid_id(userId,"User ID"));
  userId = userId.trim();
  const userscollection = await users();
  const exists = await userscollection.findOne({_id:new ObjectId(userId)});
  if(!exists) throw {error:"User not found",statusCode:400};
  const users_data = await userscollection.updateOne({ _id: new ObjectId(userId) },{ $pull: { followingPlayerID: playerID } })
  if (users_data.modifiedCount === 0) throw {error:'Cannot remove the player from following list ', statusCode:500};
  const data = await getUserById(userId);
  return data;
};

  module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    createUser,
    checkUser,
    addTeamFollowing,
    addPlayerFollowing,
    deleteTeamFollowing,
    deletePlayerFollowing
  };