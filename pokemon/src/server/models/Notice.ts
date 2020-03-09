import { Model } from 'sequelize';
import { NoticeCategory } from '../../shared/types/NoticeType';
export default class Notice extends Model {
    public id!: number;
    public category!: NoticeCategory;
    public title!: string;
    public contents!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}