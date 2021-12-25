const { StatusCodes } = require('http-status-codes')
const { Team, Coach } = require('../models')
const CustomApiError = require('../errors')

// @desc      Get teams
// @route     GET /api/v1/teams
const getAllTeams = async (req, res) => {
  const teams = await Team.findAll({ include: ['coach'] })
  res.status(StatusCodes.OK).json({
    status: 'success',
    teams,
    count: teams.length,
  })
}

// @desc      Get single team
// @route     GET /api/v1/teams/:slug
const getTeam = async (req, res) => {
  const slug = req.params.slug
  const team = await Team.findOne({ where: { slug }, include: ['coach'] })
  if (!team) throw new CustomApiError.NotFoundError(`Team  ${slug} not found`)

  res.status(StatusCodes.OK).json({
    status: 'success',
    team,
  })
}

// @desc      Create team
// @route     team /api/v1/teams
const createTeam = async (req, res) => {
  const { teamName, city, country } = req.body
  const team = await Team.create({ teamName, city, country })
  res.status(StatusCodes.CREATED).json({
    status: 'success',
    msg: `Team ${teamName.toUpperCase()} is created`,
    team,
  })
}

// @desc      Update team
// @route     PUT /api/v1/teams/:slug
const updateTeam = async (req, res) => {
  const slug = req.params.slug
  const { teamName } = req.body

  const team = await Team.findOne({ where: { slug }, include: ['coach'] })
  if (!team) throw new CustomApiError.NotFoundError(`Team  ${slug} not found!`)

  team.teamName = teamName
  await team.save()

  res.status(StatusCodes.OK).json({
    status: 'success',
    msg: `Team name is updated to ${teamName.toUpperCase()}`,
    team,
  })
}

// @desc      Delete team
// @route     DELETE /api/v1/teams/:slug
const deleteTeam = async (req, res) => {
  const slug = req.params.slug
  const team = await Team.findOne({ where: { slug } })
  if (!team)
    throw new CustomApiError.NotFoundError(`Team with slug ${slug} not found`)

  await Coach.destroy({ where: { teamId: team.id } })
  await team.destroy()
  res.status(StatusCodes.NO_CONTENT).send()
}

module.exports = {
  createTeam,
  deleteTeam,
  getAllTeams,
  updateTeam,
  getTeam,
}
