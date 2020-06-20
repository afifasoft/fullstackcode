const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.post('/api/surveys', requireLogin, requireCredits, async(req, res) => {
    const { title, subject, body, recipients } = req.body;
    console.log('survey');
    const survey = new Survey({
      title: title,
      subject: subject,
      body: body,
      recipients: recipients.split(',').map(email => { return { email: email.trim() }}),
      _user: req.user.id,
      dateSent: Date.now()

    });
    console.log('req: ', survey);

    // Great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    mailer.send();
  })
};
