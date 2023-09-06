
const User= require('../model/Users');
const bycrypt = require("bcrypt");
const {creatAuthToken} = require("../utils/auth");

const registerUser = async (req, res) => {
    try {
        const { username, email, phonenumber, password } = req.body;

        if (!username || !email || !phonenumber || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

    
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bycrypt.hash(password,12);
        const user = new User({
            username,
            email,
            phonenumber,
            password:hashedPassword,
            role:'user',
            is_active:true
        });
        await user.save();

        res.status(200).json({ message: 'User created successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the user' });
    }
};

const login = async (req, res) => {
    try {
        const {email, password } = req.body;
    
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        if(user.is_active == false){
            return res.status(400).json({ error: 'Contact admin not active!' });
        }

        const validPassword = await bycrypt.compare(password,user.password);
        if(!validPassword) {
            return res.status(400).json({ error: 'email or password incorrect' });
        }

        const token = await creatAuthToken(email,user.role, user._id);

        res.status(200).json({ message: 'Logged In successfully', token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
};
const updateUser = async (req, res) => {
    try {
        const { id } = req.params; 
        const { username, email, phonenumber } = req.body;

        // Find the user by ID
        const user = await User.findByIdAndUpdate(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        if (username) user.username = username;
        if (email) user.email = email;
        if (phonenumber) user.phonenumber = phonenumber;
    

        await user.save();

        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating the user' });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params; 
        console.log(req.params)

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while deleting the user' });
    }
};

const logout = async(req, res) => {
    response.clearCookie('jwtt');
    response.send("Logged out");
}

module.exports = {registerUser,login,updateUser,deleteUser,logout};

