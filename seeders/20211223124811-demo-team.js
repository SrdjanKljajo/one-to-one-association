'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'teams',
      [
        {
          uuid: 'ab7a72b4-9428-4053-8e38-060601f41923',
          teamName: 'FAP',
          city: 'Priboj',
          country: 'Serbia',
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
          slug: 'fap',
        },
        {
          uuid: 'ab7a72b4-9428-4053-8e38-060601f41924',
          teamName: 'Napredak',
          city: 'Kruševac',
          country: 'Serbia',
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
          slug: 'napredak',
        },
        {
          uuid: 'ab7a72b4-9428-4053-8e38-060601f41925',
          teamName: 'Totenhem',
          city: 'London',
          country: 'England',
          updatedAt: '2021-12-23T13:00:38.885Z',
          createdAt: '2021-12-23T13:00:38.885Z',
          slug: 'totenhem',
        },
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('teams', null, {})
  },
}
