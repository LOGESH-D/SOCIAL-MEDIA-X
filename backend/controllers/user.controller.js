import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import bcrypt from "bcryptjs";


export const getProfile = async (req, res) => {
    try{
        const {username} = req.params;
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json({user});
    }
    catch(error){
        console.log(`Error in get user profile controller: ${error}`);
        res.status(500).json({error: "Internal server error"});
    }
}

export const followUnfollowUser = async (req, res) => {
    try{
        const {id} = req.params;
        const userToModify = await User.findById({_id : id});
        const currentUser = await User.findById({_id : req.user.id});
        if(id === req.user._id){
            return res.status(404).json({error: "You can't unfollow or follow yourself"});
        }
        if(!userToModify || !currentUser){
            return res.status(404).json({error: "User not found"});
        }
        const isFollowing = currentUser.following.includes(id);
        if(isFollowing){
            await User.findByIdAndUpdate(
                {_id: id},
                {$pull: {followers: req.user._id}},
            );
            await User.findByIdAndUpdate(
                {_id: req.user._id},
                {$pull: {following: id}}
            );
            res.status(200).json({message: "User unfollowed successfully"});
        }
        else{
            await User.findByIdAndUpdate(
                {_id: id},
                {$push: {followers: req.user._id}},
            );
            await User.findByIdAndUpdate(
                {_id: req.user._id},
                {$push: {following: id}}
            );
            const newNotification = new Notification({
                from: req.user._id,
                to: userToModify._id,
                type: "follow"
            });
            await newNotification.save();
            res.status(200).json({message: "User followed successfully"});
        }
    }
    catch(error){
        console.log(`Error in follow unfollow user controller: ${error}`);
        res.status(500).json({error: "Internal server error"});
    }
}

export const getSuggestedUsers = async (req, res) => {
    try{
        const userId = req.user._id;
        const userFollowedByMe = await User.findById({_id: userId}).select("-passore");
        const users = await User.aggregate([
            {
                $match : {
                    _id: {$ne: userId},
                }
            },
            {
                $sample: {
                    size: 10
                }
            }
        ])
        const filteredUsers = users.filter((user) => !userFollowedByMe.following.includes(user._id));
        const suggestedUsers = filteredUsers.slice(0,4);

        suggestedUsers.forEach((user) => (user.password = null));
        res.status(200).json({suggestedUsers});
    }
    catch(error){
        console.log(`Error in get suggested users controller: ${error}`);
        res.status(500).json({error: "Internal server error"});
    }
}

export const updateUser = async (req, res) => {
    try{
        const userId = req.user._id;
        const {username, fullname, email, currentPassword, newPassword, bio, link} = req.body;
        let user = await User.findById({_id : userId});
        let {profileImg, coverImg} = req.body;

        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        if((!newPassword && currentPassword) || (newPassword && !currentPassword)){
            return res.status(404).json({error: "Both current and new password are required to update password"});
        }
        if(newPassword && currentPassword){
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if(!isMatch){
                return res.status(404).json({error: "Current password is incorrect"});
            }
            if(newPassword.length < 6){
                return res.status(404).json({error: "New password must be at least 6 characters long"});
            }
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(newPassword, salt);
        }
        user.fullname = fullname || user.fullname;
        user.username = username || user.username;
        user.email = email || user.email;
        user.bio = bio || user.bio;
        user.link = link || user.link;
        user.profileImg = profileImg || user.profileImg;
        user.coverImg = coverImg || user.coverImg;
        user = await user.save();
        user.password = null;
        return res.status(200).json(user);
    }
    catch(error){
        console.log(`Error in update user controller: ${error}`);
        res.status(500).json({error: "Internal server error"});
    }
}