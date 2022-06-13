import { Model } from 'sequelize';
import * as bcrypt from 'bcrypt-nodejs';

export default class User extends Model {
    public id!:number;
    public userID!: string;
    public password!: string;

    validPassword(password: string) {
        return bcrypt.compareSync(password, this.password);
    }
    public nickname!:string;
    public image!: string;
    
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}