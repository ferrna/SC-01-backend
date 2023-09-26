import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface GeneralDataAttributes {
  id?: number
  title: string
  content: string | null
  author: string | null
  createdAt?: Date
  updatedAt?: Date
}
export interface GeneralDataModel extends Model<GeneralDataAttributes>, GeneralDataAttributes {}
export class GeneralData extends Model<GeneralDataModel, GeneralDataAttributes> {}

export type GeneralDataStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): GeneralDataModel
}

export function GeneralDatasFactory(sequelize: Sequelize): GeneralDataStatic {
  return <GeneralDataStatic>sequelize.define('generalData', {
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
