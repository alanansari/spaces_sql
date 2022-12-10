const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
const Post = require('../models/postModel');
const subSpace = require('../models/subspaceModel');
//const Comment = require('../models/commentModel');
const {sequelize} = require('../utils/database');

require('dotenv').config();
const jwtsecret = process.env.jwtsecretkey1;

const newpost = async (req,res) => {
    try{
        const {subspace,heading,para} = req.body;

        let filepath = null;
        if(para==='') para=null;
        
        if(req.file !== undefined){
            filepath = 'uploads/' + req.file.filename;
        }

        const user = req.user;

        const post = await user.createPost({
            author:user.user_name,
            subspace,
            heading,
            para,
            imgpath : filepath,
            votes:0
        });
    
        return res.status(200).json({success:true,msg:'Posted!'});

    } catch (err) {
        console.log(err);
        return res.status(400).json({success:false,msg:`${err}`});
    }
}

const getfeed = async (req,res) => {
    try {
        
        const topcomm = await subSpace.findAll({
            order:[
                ['cntmembers','DESC']
            ],
            limit:5
        });

        const posts = await Post.findAll({
            order:[
                ["createdAt","DESC"]
            ]
        });

        return res.status(200).json({topcomm,posts});
    } catch (err) {
        console.log(err);
        return res.status(400).json({success:false,msg:`${err}`});
    }
}

module.exports = {
    newpost,
    getfeed
}