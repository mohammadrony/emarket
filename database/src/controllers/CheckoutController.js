// const _ = require('lodash')
// const { Cart, Product } = require('../models')
const stripeSecretKey = process.env.STRIPE_SECRET_KEY
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY
const stripe = require('stripe')(stripeSecretKey);
// console.log(stripeSecretKey)
module.exports = {
  async createCheckoutSession(req, res) {
    const checkoutProduct = req.body.checkoutProduct
    var i;
    var item1 = []
    for(i=0;i<checkoutProduct.length;i++){
      item1.push(checkoutProduct[i])
    }
    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:8080/success-payment',
      // success_url: 'http://localhost:8080/payment-succeeded?id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:8080/cancel-payment',
      // cancel_url: 'http://localhost:8080/payment-canceled',
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: item1,
      // line_items: [{
      //   name: "laptop",
      //   currency: "USD",
      //   amount: 1000,
      //   quantity: 1,
      // },
      // {
      //   name: "mobile",
      //   currency: "USD",
      //   amount: 1000,
      //   quantity: 2,
      // }
      // ]
    });
    res.json({
      id: session.id,
    })
  },
}
