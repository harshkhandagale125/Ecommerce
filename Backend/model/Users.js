const mongoose= require('mongoose')
const Schema=mongoose.Schema

const userSchema=new Schema({
    username:{
        type:'string'
    },
    email:{
       type:'string'
    },
    phonenumber:{
        type:Number
    },
    password:{
        type:'string'
    },
    role:{
        type:'string',
        required:true,
        enum:['admin', 'user'],
        default:'user'
    },
    is_active:{
        type:'boolean',

    }
  
})
module.exports = mongoose.model('User',userSchema);
