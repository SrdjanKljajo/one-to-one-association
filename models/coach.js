'use strict'
const { SequelizeSlugify } = require('sequelize-slugify')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Coach extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Team }) {
      // define association here
      this.belongsTo(Team, { foreignKey: 'teamId', as: 'team' })
    }

    // fields to not return
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }

  Coach.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Coach must have a first name' },
          len: {
            args: [2, 32],
            msg: 'First name must have 2 - 32 caracters.',
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Coach must have a last name' },
          len: {
            args: [2, 32],
            msg: 'Last name must have 2 - 32 caracters.',
          },
        },
      },
    },
    {
      sequelize,
      tableName: 'coaches',
      modelName: 'Coach',
    }
  )

  SequelizeSlugify.slugifyModel(Coach, {
    source: ['firstName'],
    overwrite: false,
  })

  return Coach
}
