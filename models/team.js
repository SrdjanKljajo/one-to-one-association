'use strict'
const { SequelizeSlugify } = require('sequelize-slugify')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Coach }) {
      // define association here
      this.hasOne(Coach, { foreignKey: 'teamId', as: 'coach' })
    }

    // fields to not return
    toJSON() {
      return { ...this.get(), id: undefined }
    }
  }

  Team.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Team must have a name' },
          len: {
            args: [2, 32],
            msg: 'Team name must have 2 - 32 caracters.',
          },
        },
      },
      slug: {
        type: DataTypes.STRING,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'City must have a name' },
          len: {
            args: [2, 60],
            msg: 'City name must have 2 - 60 caracters.',
          },
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'Country must have a name' },
          len: {
            args: [2, 60],
            msg: 'Country name must have 2 - 60 caracters.',
          },
        },
      },
    },
    {
      sequelize,
      tableName: 'teams',
      modelName: 'Team',
    }
  )

  SequelizeSlugify.slugifyModel(Team, {
    source: ['teamName'],
    overwrite: false,
  })

  return Team
}
