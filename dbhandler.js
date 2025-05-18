const { Sequelize, DataTypes} = require('sequelize')
const handler = new Sequelize('receptData','root','',{
    dialect:'mysql',
    host:'localhost'
})

exports.table = handler.define('nemtudom',{
    'id':{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    'username':{
        type:DataTypes.STRING,
        allowNull:false
    },
    'password':{
        type:DataTypes.STRING,
        allowNull:false
    },
    'recipe':{
        type:DataTypes.STRING,
        allowNull:false
    }
})