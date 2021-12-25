const { StatusCodes } = require('http-status-codes')
const { Coach, Team } = require('../models')
const CustomApiError = require('../errors')

// @desc      Get coachs
// @route     GET /api/v1/coaches
const getAllCoachs = async (req, res) => {
  const coachs = await Coach.findAll({ include: ['team'] })
  res.status(StatusCodes.OK).json({
    status: 'success',
    coachs,
    count: coachs.length,
  })
}

// @desc      Get single coach
// @route     GET /api/v1/coaches/:slug
const getCoach = async (req, res) => {
  const slug = req.params.slug
  const coach = await Coach.findOne({ where: { slug }, include: ['team'] })
  if (!coach) throw new CustomApiError.NotFoundError(`Coach  ${slug} not found`)

  res.status(StatusCodes.OK).json({
    status: 'success',
    coach,
  })
}

// @desc      Create coach
// @route     POST /api/v1/coaches
const createTeamCoach = async (req, res) => {
  const { teamSlug, firstName, lastName } = req.body
  const team = await Team.findOne({ where: { slug: teamSlug } })
  if (!team)
    throw new CustomApiError.NotFoundError(`Team  ${teamSlug} not found!`)
  const coach = await Coach.create({
    firstName,
    lastName,
    teamId: team.id,
  })

  res.status(StatusCodes.CREATED).json({
    status: 'success',
    coach,
  })
}

// @desc      Update coach
// @route     PUT /api/v1/coaches/:slug
const updateTeamCoach = async (req, res) => {
  const slug = req.params.slug
  const { teamSlug, oldCoachSlug } = req.body

  const team = await Team.findOne({ where: { slug: teamSlug } })
  const newCoach = await Coach.findOne({ where: { slug } })
  const oldCoach = await Coach.findOne({ where: { slug: oldCoachSlug } })

  if (!team || !newCoach || !oldCoach)
    throw new CustomApiError.NotFoundError(
      `Team or coach not exist! Check your input`
    )

  newCoach.teamId = team.id
  await oldCoach.destroy()
  await newCoach.save()

  res.status(StatusCodes.OK).json({
    status: 'success',
    newCoach,
  })
}

module.exports = {
  createTeamCoach,
  getAllCoachs,
  updateTeamCoach,
  getCoach,
}
