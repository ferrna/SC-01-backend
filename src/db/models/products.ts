import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface ProductsAttributes {
  id: number
  name: string
  components: string | null
  price: number | null
  createdAt?: Date
  updatedAt?: Date
}
export interface ProductsModel extends Model<ProductsAttributes>, ProductsAttributes {}
export class Products extends Model<ProductsModel, ProductsAttributes> {}

export type ProductsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductsModel
}

export function ProductsFactory(sequelize: Sequelize): ProductsStatic {
  return <ProductsStatic>sequelize.define('products', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: new DataTypes.TEXT(),
      allowNull: true,
    },
    components: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      get() {
        const stringValue = this.getDataValue('components')
        return stringValue ? stringValue.split(',') : null
      },
      set(value: string[] | null) {
        const arrayValue = value ? value.join(',') : ''
        this.setDataValue('components', arrayValue)
      },
    },
    image: {
      type: new DataTypes.TEXT(),
      allowNull: true,
    },
    price: {
      type: new DataTypes.INTEGER(),
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
