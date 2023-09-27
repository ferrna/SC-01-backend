import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface CategoriesAttributes {
  id?: number
  name: string
  createdAt?: Date
  updatedAt?: Date
}
export interface CategoriesModel extends Model<CategoriesAttributes>, CategoriesAttributes {}
export class Categories extends Model<CategoriesModel, CategoriesAttributes> {}

export type CategoriesStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CategoriesModel
}

export function CategoriesFactory(sequelize: Sequelize): CategoriesStatic {
  return <CategoriesStatic>sequelize.define('Categories', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
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
  })
}
