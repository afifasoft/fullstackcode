const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    this.sgApi = sendgrid(keys.sendGridKey);
    this.from = new helper.Email('abdul.pesit@gmail.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    // Helper function
    this.recipients = this.formatAddresses(recipients);

    // Mailer Built in function
    this.addContent(this.body);
    // Helper function
    this.addClickTracking();
    // Helper function
    this.addRecipients();

  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true,true);

    trackingSettings.setClickTracking(clickTracking);
    // Mailer Built in functions
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });

    this.addPersonalization(personalize);
  }

  async send() {
    console.log('send');
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });
    console.log('request: ', request);
    const response = await this.sgApi.API(request);
    console.log('response: ', response);
    return response;
  }


}

module.exports = Mailer;
