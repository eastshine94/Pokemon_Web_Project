import { Sequelize, DataTypes } from 'sequelize';
import config from '../config';
import Pokemon from './Pokemon';
import User from './User';
import Board from './Board';
import Notice from './Notice';
import * as bcrypt from 'bcrypt-nodejs';
export function init(): Sequelize {
    const sequelize = new Sequelize(config.db.url);

    Pokemon.init({
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: new DataTypes.STRING(30),
          unique: true,
          autoIncrement: false,
          allowNull: false,
        },
        image: {
          type: new DataTypes.STRING(150),
          allowNull: false,
        },
        types: {
          type: DataTypes.JSON,
          allowNull: false,
        },
        height: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        weight: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        regions: {
          type: new DataTypes.STRING(50),
          allowNull: false,
        },
        flavor_text: {
          type: new DataTypes.STRING(500),
          allowNull: false,
        },
        evolution:{
          type: DataTypes.JSON,
          allowNull: false
        }
      }, {
        sequelize,
        tableName: 'pokemons',
        engine: 'InnoDB',
        charset: 'utf8',
        indexes: [
          {
            unique:true,
            fields: ['name'],
          },
        ],
      });
      

      //User
      User.init({
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        userID: {
          type: new DataTypes.STRING(20),
          unique: true,
          allowNull: false,
        },
        password: {
          type: new DataTypes.STRING(150),
          allowNull: false,
        },
        nickname: {
          type: new DataTypes.STRING(20),
          allowNull: true,
        },
        image: {
          type: new DataTypes.STRING(100),
          allowNull: true,
        }
      }, {
        sequelize,
        tableName: 'users',
        engine: 'InnoDB',
        charset: 'utf8',
        indexes: [
          {
            fields: ["userID"]
          }
        ],
        hooks: {
          beforeCreate: (user) => {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
          }
        }
      });

      //Board
      Board.init({
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        userID: {
          type: new DataTypes.STRING(20),
          allowNull: false,
        },
        title: {
          type: new DataTypes.STRING(30),
          allowNull: false,
        },
        
        contents: {
          type: new DataTypes.STRING(1000),
          allowNull: false,
        },
    
        
      }, {
        sequelize,
        tableName: 'board',
        engine: 'InnoDB',
        charset: 'utf8',
      });
    
      User.hasMany(Board, {
        sourceKey: 'userID',
        foreignKey: 'userID',
        as: 'board',
      });
    Notice.init({
      id:{
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      category:{
        type: new DataTypes.STRING(20),
        allowNull: false,
      },
      title: {
        type: new DataTypes.STRING(100),
        allowNull: false,
      },
      contents: {
        type: new DataTypes.STRING(1000),
        allowNull: false,
      },
    },{
      sequelize,
      tableName: 'notice',
      engine: 'InnoDB',
      charset: 'utf8',
    })
    return sequelize;
}


