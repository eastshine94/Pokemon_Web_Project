import { Model } from 'sequelize';

export default class Board extends Model {
    public id!: number;
    public userID!: string;
    public title!: string;
    public contents!: string;
    
}