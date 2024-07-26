const {
	createPreference,
	createStripePreference,
	paymentNotificationController,
	cancelSubscriptionController,
} = require('../controllers/mercadoPago-controller')
const { User, Plan } = require('../db')

const mercadoPagoPreference = async (req, res) => {
	try {
		const user = req.user
		const { title, quantity, unit_price } = req.body
		const response = await createPreference(title, quantity, unit_price, user)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}
const mercadoPagoNotification = async (req, res) => {
	try {
		const payment = req.body
		const response = await paymentNotificationController(payment)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const stripePreference = async (req, res) => {
	const { title, quantity, unit_price } = req.body
	try {
		const response = await createStripePreference(title, quantity, unit_price)

		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const stripeWebhook = async (req, res) => {
	const payment = req.body
	try {
		const response = await paymentNotificationController(payment)
		res.status(200).json(response)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const cancelSubscription = async (req, res) => {
	try {
		const user = req.user
		const response = await cancelSubscriptionController(user)
		return res.status(200).json(response)
	} catch (error) {
		return res.status(500).json(error.message)
	}
}

module.exports = {
	mercadoPagoPreference,
	mercadoPagoNotification,
	cancelSubscription,
	stripeWebhook,
	stripePreference,
}
