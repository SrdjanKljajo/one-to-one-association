'use strict'
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      uuid: DataTypes.UUID,
      teamName: DataTypes.STRING,
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      city: DataTypes.STRING,
      country: DataTypes.STRING,
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
    await queryInterface.dropTable('teams')
  },
}
