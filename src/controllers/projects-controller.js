const { Project } = require('../db')
const { Sequelize, Op } = require('sequelize')

const getAllProjectsController = async (search, technology) => {
	let where = {
		// ...(title !== undefined && { title: title }),
		// ...(tags !== undefined && { tags: tags }),
		// ...(technology !== undefined && { technology: technology }),
	}
	try {
		if (search) {
			where[Op.or] = [
				{
					title: {
						[Op.like]: `%${search}%`,
					},
				},
				Sequelize.where(Sequelize.fn('array_to_string', Sequelize.col('tags'), ','), {
					[Op.like]: `%${search}%`,
				}),
			]
		}
		
		const projects = await Project.findAll({ where })
		return projects
	} catch (error) {
		throw error
	}
}

const getProjectByIdController = async (id) => {
	try {
		const project = await Project.findByPk(id)
		return project
	} catch (error) {
		throw error
	}
}

const createProjectController = async (title, description, tags, technology, image) => {
	try {
		const [project, created] = await Project.findOrCreate({
			where: {
				title,
				description,
				tags,
				technology,
				image,
			},
		})
		if (!created) throw new Error('This project already exists in DB!')

		return project
	} catch (error) {
		console.error('Error creating a project', error)
	}
}

module.exports = {
	getAllProjectsController,
	getProjectByIdController,
	createProjectController,
}
