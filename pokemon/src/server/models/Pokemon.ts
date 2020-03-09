import { Model } from 'sequelize';
import {EvolutionDTO} from '../../shared/types/PokeType';
 
export default class Pokemon extends Model {
    public id!: number;
    public name!: string;
    public image!: string;
    public types!: Array<string>;
    public height!: number;
    public weight!: number;
    public regions!: string;
    public flavor_text!: string;
    public evolution!:Array<Array<EvolutionDTO>>;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

}
