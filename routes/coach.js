const express = require('express')

const router = express.Router()
const {
  getAllCoachs,
  getCoach,
  createTeamCoach,
  updateTeamCoach,
  deleteCoach,
} = require('../controllers/coach')

router.route('/').get(getAllCoachs).post(createTeamCoach)
router.route('/:slug').get(getCoach).put(updateTeamCoach).delete(deleteCoach)

module.exports = router
