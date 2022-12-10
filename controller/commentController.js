const User = require('../models/userModel');
const subSpace = require('../models/subspaceModel');
const Post = require('../models/commentModel');
const Comment = require('../models/commentModel');


const comment = async(req,res)=>{
    try {
        const {postId,text} = req.body;

        const user = req.user;

        if(!postId) return res.status(400).json({success:true,msg:'Give post id'});

        const post = Post.findByPk(postId);

        if(!post) return res.status(404).json({success:true,msg:'Post not found'});

        if(!text) return res.status(400).json({success:true,msg:'Give comment content'});

        const comment = await user.createComment({
            postId,
            author: user.user_name,
            text
        });

        return res.status(200).json({success:true,msg:'Posted Comment'});
    } catch (err) {
        console.log(err);
        return res.status(400).json({success:false,msg:`${err}`});
    }
}

module.exports = {
    comment
}