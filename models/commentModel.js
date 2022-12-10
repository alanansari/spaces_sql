const Sequelize = require('sequelize');
const {sequelize} = require('../utils/database');

const Comment = sequelize.define('comment', {
    _id:{
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    author:{ 
        type: Sequelize.STRING,
        allowNull:false
    },
    text: {
        type: Sequelize.STRING,
        allowNull:false
    },
    votes:{
        type:Sequelize.BIGINT,
        defaultValue: 0
    },
    postId:{
        type:Sequelize.BIGINT
    }
});

module.exports = Comment;