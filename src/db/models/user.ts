import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface UserAttributes {
  id?: number
  username: string
  hash: string
  salt: string
  isAdmin: boolean
  createdAt?: Date
  updatedAt?: Date
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel
}

export function UserFactory(sequelize: Sequelize): UserStatic {
  return <UserStatic>sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    hash: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
    salt: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
    isAdmin: {
      type: new DataTypes.BOOLEAN(),
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
