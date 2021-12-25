'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'coaches',
      [
        {
          uuid: 'ab7a72b4-9428-4053-8e38-060601f41913',
          firstName: 'Voislav',
          lastName: 'Kljajević',
          teamId: 1,
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
          slug: 'voislav',
        },
        {
          uuid: 'ab7a72b4-9428-4053-8e38-060601f41914',
          firstName: 'Ivica',
          lastName: 'Osim',
          teamId: 2,
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
          slug: 'ivica',
        },
        {
          uuid: 'ab7a72b4-9428-4053-8e38-060601f41915',
          firstName: 'Roberto',
          lastName: 'Carlos',
          teamId: 3,
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
          slug: 'roberto',
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('coaches', null, {})
  },
}
