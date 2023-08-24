import {
    DataTypes, Model,
    Sequelize, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute,
  } from 'sequelize';
  
  const sequelize = new Sequelize('mysql://root:1234@localhost:3306/sc');
  
  class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare components: string[] | null;
    declare price: number | null;
  
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    /* get fullName(): NonAttribute<string> {
      return this.name;
    } */
  }
  
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: new DataTypes.STRING(128),
        allowNull: false
      },
      components: {
        type: new DataTypes.ARRAY(DataTypes.STRING(128)),
        allowNull: true
      },
      price: {
        type: new DataTypes.INTEGER(),
        allowNull: true
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      tableName: 'products',
      sequelize
    }
  );

  export { Product };