const { Image } = require('../models')


module.exports = {
  async getImage(req, res) {
    try {
      const images = await Image.findAll()
      res.send(images)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to fetch images.'
      })
    }
  },
  async setImage(req, res) {
    try {
      req.body.image = req.file.path
      const image = await Image.create(req.body)
      res.send(image)
    } catch (err) {
      res.status(500).send({
        error: 'An error occured when trying to post an image.'
      })
    }
  },

}
