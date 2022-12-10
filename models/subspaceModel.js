const Sequelize = require('sequelize');
const {sequelize} = require('../utils/database');

const subSpace = sequelize.define('subspace',{
    _id:{
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    admin:{
        type: Sequelize.STRING,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false,   
    },
    about: {
        type: Sequelize.STRING
    },
    rules: {
        type: Sequelize.STRING
    },
    imgpath:{
        type: Sequelize.STRING,
        defaultValue: null
    },
    members:{
        type: Sequelize.BIGINT,
        defaultValue:1
    }
});

module.exports = subSpace;