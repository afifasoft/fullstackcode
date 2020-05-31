const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
module.exports = app => {
  app.post('/api/stripe', async (req, res) => {

    const charge = await stripe.charges.create({
        amount: 500,
        currency: 'inr',
        description: 'Rs.500 for 5 credits',
        source: req.body.id

      });

      console.log(charge);
      req.user.credits += 5;
      const user = await req.user.save();
      res.send(user);
  });

};
