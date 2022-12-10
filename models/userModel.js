const Sequelize = require('sequelize');
const {sequelize} = require('../utils/database');

const User = sequelize.define('user', {
    _id:{
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    user_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password: { 
        type: Sequelize.STRING
    },
    email_verify: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    displaypic:{
        type: Sequelize.STRING,
        defaultValue: null
    },
    mailedOTP: {
        type: Sequelize.STRING
    },
    expiryOTP: {
        type: Sequelize.BIGINT
    },
    mysubspaces:{
        type: Sequelize.ARRAY(Sequelize.STRING)
    }
});

module.exports = User;