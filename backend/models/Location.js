  import { DataTypes } from 'sequelize';
  import sequelize from '../config/config.js';

  const Location = sequelize.define(
    'Location',
    {
      location_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: 'locations',
      timestamps: false,
    }
  );

  export default Location;
