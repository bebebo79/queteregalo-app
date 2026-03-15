import { Sequelize } from "sequelize-typescript";
import dotenv from 'dotenv'
import Profile from "../models/Profile.model";
import Token from "../models/Token.model";
import User from "../models/User.model";
import Present from "../models/Present.model";
import Category from "../models/Category.model";



dotenv.config()

const url = process.env.URL_DATABASE!

export const db = new Sequelize(url,{
    
    dialect: 'postgres',
    dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }
  },
  define : {
    freezeTableName :true
  },
  logging : false,
  models : [User, Profile, Token, Category, Present]
})


export default db
