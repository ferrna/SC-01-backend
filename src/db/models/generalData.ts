import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface GeneralDatasAttributes {
  id?: number
  name: string
  content: string
  createdAt?: Date
  updatedAt?: Date
}
export interface GeneralDatasModel extends Model<GeneralDatasAttributes>, GeneralDatasAttributes {}
export class GeneralDatas extends Model<GeneralDatasModel, GeneralDatasAttributes> {}

export type GeneralDatasStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): GeneralDatasModel
}

export function GeneralDatasFactory(sequelize: Sequelize): GeneralDatasStatic {
  return <GeneralDatasStatic>sequelize.define('generalDatas', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    content: {
      type: new DataTypes.TEXT(),
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
