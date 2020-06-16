const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    this.from = new helper.Email('abdul.pesit@gmail.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    // Helper function
    this.recipients = this.formatAddresses(recipients);

    // Mailer Built in function
    this.addContent(this.body);
    // Helper function
    this.addClickTracking();
    this.addRecipients();

  }

  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    // Mailer Built in functions
    this.addTrackingSettings(trackingSettings);
  }


}

module.exports = Mailer;
