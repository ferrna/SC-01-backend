import { BuildOptions, DataTypes, Model, Sequelize } from "sequelize";

export interface ArticlesAttributes {
    id?: number;
    title: string;
    content: string | null;
    author: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface ArticlesModel extends Model<ArticlesAttributes>, ArticlesAttributes {}
export class Articles extends Model<ArticlesModel, ArticlesAttributes> {}

export type ArticlesStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): ArticlesModel;
};

export function ArticlesFactory (sequelize: Sequelize): ArticlesStatic {
    return <ArticlesStatic>sequelize.define("articles", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: new DataTypes.STRING(128),
            allowNull: false
        },
        content: {
            type: new DataTypes.TEXT(),
            allowNull: true
        },
        author: {
            type: new DataTypes.STRING(128),
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    });
}