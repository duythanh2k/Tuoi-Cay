const db=require('./db');
const User=require('./user.model');
const Post=require('./post.model');
const { Sequelize,DataTypes,Deferrable } = require('sequelize');
const PostReact=db.define('PostReacts',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    text:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: User,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    post_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: Post,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    }
},
{     
    index: [
        {
            name: 'index_postr1',
            fields: ['user_id']
        },{
            name: 'index_postr2',
            fields: ['post_id']
        }],
    timestamps: false,
    underscored: true
});
PostReact.sync({ force: false });
module.exports=PostReact;