//const {User,Post,subSpace} = require('../utils/database');

const User = require('../models/userModel');
const subSpace = require('../models/subspaceModel');

const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const { sequelize } = require('../utils/database');
require('dotenv').config();

const jwtsecret = process.env.jwtsecretkey1;

const newsubspace = async (req,res) => {

    try{
        const {name,about,rules} = req.body;

        if(!name){
            return res.status(400).json({success:false,msg:'Fill all input fields!'});
        }
        
        const user = req.user;

        if(!user)
            return res.status(400).json({success:false,msg:'User not found!'});

        const oldspace = await subSpace.findOne({
            where:{name}
        });

        if(oldspace) return res.status(400).json({success:false,msg:`${name} is already taken.`});

        let filepath = null;

        if(req.file!==undefined)
        filepath = 'uploads/' + req.file.filename;
        
        const space = await user.createSubspace({
            admin: user.user_name,
            name,
            about,
            rules,
            imgpath: filepath,
            createdAt: Date.now()
        });

        if(space){
            const addspace = await User.update({
                mysubspaces:sequelize.fn('array_append',sequelize.col('mysubspaces'),name)
            },{
                where:{user_name:user.user_name}
            });
            return res.status(201).json({success:true,msg:`created subspace ${name}`});
        }
        else
            return res.status(500).json({success:false,msg:'Error in creating subspace'});
    
    } catch (err){
        console.log(err);
        return res.status(500).json({success:false,msg:`${err}`});
    }
}

const search = async (req,res) => {
    try {
        const {text} = req.body;
        let subs = await subSpace.findAll({
            where:{
                name:{
                    [Op.like]:`%${text}%`
                }
            },
            attributes:['name']
        });
        
        if(!subs) return res.status(400).json({msg:'Not able to search.'});

        return res.status(200).json(subs);
    } catch (err) {
        console.log(err);
        return res.status(400).json({success:false,msg:`${err}`});
    }
}

module.exports = {
    newsubspace,
    search
}