const db=require('./db');
const Post=require('./post.model');
const { Sequelize,DataTypes,Deferrable } = require('sequelize');
const Image=db.define('Images',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true
    },
    path:{
        type:DataTypes.STRING,
        allowNull:false
    },
    caption:{
        type:DataTypes.TEXT,
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
            name: 'index_image',
            fields: ['post_id']
        }],
    timestamps: false,
    underscored: true
});
Image.sync({ force: false });
module.exports=Image;