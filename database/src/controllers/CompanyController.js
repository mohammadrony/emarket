const { Company } = require('../models')

module.exports = {
	async getCompanyLogo(req, res) {
		try {
			const logo = await Company.findByPk(req.params.companyId, {
				attributes: ["logo"]
			});
			res.send(logo)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch company logo.'
			})
		}
	}
}
