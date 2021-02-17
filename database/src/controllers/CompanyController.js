const { Company } = require('../models')

module.exports = {
	async getCompanyLogo(req, res) {
		try {
			const company = await Company.findByPk(req.params.companyId, {
				attributes: ["logo"]
			});
			res.send(company)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch company logo.'
			})
		}
	},
	async getCompanyName(req, res) {
		try {
			const company = await Company.findByPk(req.params.companyId, {
				attributes: ["name"]
			});
			res.send(company)
		} catch (err) {
			res.status(500).send({
				error: 'An error occured when trying to fetch company logo.'
			})
		}
	}
}
