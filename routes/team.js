const express = require('express')

const router = express.Router()
const {
  getAllTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
} = require('../controllers/team')

router.route('/').get(getAllTeams).post(createTeam)
router.route('/:slug').get(getTeam).put(updateTeam).delete(deleteTeam)

module.exports = router
