import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface ArticlesAttributes {
  id?: number
  title: string
  drophead: string
  author?: string | null
  introduction?: string | null
  body: string | null
  body2?: string | null
  image?: string | null
  createdAt?: Date
  updatedAt?: Date
}
export interface ArticlesModel extends Model<ArticlesAttributes>, ArticlesAttributes {}
export class Articles extends Model<ArticlesModel, ArticlesAttributes> {}

export type ArticlesStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ArticlesModel
}

export function ArticlesFactory(sequelize: Sequelize): ArticlesStatic {
  return <ArticlesStatic>sequelize.define('articles', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    drophead: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    author: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    introduction: {
      type: new DataTypes.TEXT(),
      allowNull: true,
    },
    body: {
      type: new DataTypes.TEXT(),
      allowNull: true,
    },
    body2: {
      type: new DataTypes.TEXT(),
      allowNull: true,
    },
    image: {
      type: new DataTypes.TEXT(),
      allowNull: true,
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
