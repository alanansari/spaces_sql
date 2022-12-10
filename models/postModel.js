const Sequelize = require('sequelize');
const {sequelize} = require('../utils/database');

const Post = sequelize.define('post', {
    _id:{
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    subspace:{
        type: Sequelize.STRING,
        allowNull: false
    },
    heading:{
        type: Sequelize.STRING,
        allowNull: false
    },
    para: {
        type: Sequelize.STRING,
        defaultValue: null
    },
    imgpath: {
        type: Sequelize.STRING,
        defaultValue:null
    },
    votes:{
        type:Sequelize.BIGINT,
        defaultValue: 0
    }
});

module.exports = Post;