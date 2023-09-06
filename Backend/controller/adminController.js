
const User= require('../model/Users');
const bycrypt = require("bcrypt");

const getUserList = async (req, res) => {
    try {
        let userList = await User.find({},{
            password: 0
        });

        // userList= userList.filter(user => user.is_active==true)
        if(!userList) return res.status(404).json({message: 'User not found',result:false});

        res.status(200).json({
            data:userList,
            result:true,
            message: 'Data Fetched successfully'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            result:false,
            message:"Something went wrong!"
        })
    }
};

const updateUserStatus = async(req,res) =>{
    try{
        const {userId,is_active} = req.body;
        console.log(req.body)
        const updateData = await User.findByIdAndUpdate({_id:userId},{
            is_active
        });
        if(!updateData) return res.status(400).json({message:"Update failed!"});

        return res.status(200).json({
            result:true,
            message:"User status updated"
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            result:false,
            message:"Something went wrong!"
        })
    }
}

const updateUserRole = async(req,res) =>{
    try{
        const {userId,role} = req.body;
        const updateData = await User.findByIdAndUpdate({_id:userId},{
            role
        });
        if(!updateData) return res.status(400).json({message:"Update failed!"});

        return res.status(200).json({
            result:true,
            message:"User status updated"
        })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            result:false,
            message:"Something went wrong!"
        })
    }
}



module.exports = {getUserList,updateUserStatus,updateUserRole};
