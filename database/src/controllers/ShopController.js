const { Shop } = require('../models')

module.exports = {
	async getShopLogo(req, res) {
		try {
			const logo = await Shop.findByPk(req.params.shopId, {
				attributes: ["logo"]
			});
			res.send(logo)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch shop logo.'
			})
		}
	}
}
