'use strict'
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('coaches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: DataTypes.UUID,
      firstName: DataTypes.STRING,
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      lastName: DataTypes.STRING,
      teamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    })
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('coaches')
  },
}
