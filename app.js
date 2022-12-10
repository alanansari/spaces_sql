const express = require('express');
const {sequelize} = require('./utils/database');
const User = require('./models/userModel');
const subSpace = require('./models/subspaceModel');
const Post = require('./models/postModel');
const Comment = require('./models/commentModel');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const subspaceRoutes = require('./routes/subspaceRoutes');
const commentRoutes = require('./routes/commentRoutes');

const fs = require('fs');

if (!fs.existsSync('./uploads')){
  fs.mkdirSync('./uploads');
}

require('dotenv').config();

const app = express();

const cors=require('cors');

app.use(cors({origin:true}));

app.use(express.json());

subSpace.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(subSpace);

Post.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Post);

Comment.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Comment);

const connectdb = async ()=>{
    try {
        const result = await sequelize.sync();
        console.log('DB Connection has been established successfully.');
        app.listen(process.env.PORT);
        console.log(`Listening on port ${process.env.PORT}`);
      } catch (err) {
        console.error('Unable to connect to the database:', err);
      }
}

connectdb();

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

app.use('/s',subspaceRoutes);
app.use('/p',postRoutes);
app.use('/c',commentRoutes);
app.use(authRoutes);