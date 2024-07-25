const { DataTypes } = require('sequelize')
const { User } = require('./User')

module.exports = (sequelize) => {
	sequelize.define('contract', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true,
		},
		senderId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
		},
		receiverId: {
			type: DataTypes.UUID,
			allowNull: false,
			references: {
				model: User,
				key: 'id',
			},
		},
		projectDescription: {
			type: DataTypes.TEXT,
			defaultValue: 'Descripción del proyecto',
			allowNull: false,
		},
		budget: {
			type: DataTypes.FLOAT,
			defaultValue: 1.0,
			allowNull: false,
		},
		availableTime: {
			type: DataTypes.STRING,
			defaultValue: 'Ahora',
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM('rejected', 'pending', 'accepted'),
			defaultValue: 'pending',
			allowNull: false,
		},
	})
}