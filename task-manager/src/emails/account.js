const sgMail = require("@sendgrid/mail");

const sendgridAPIkey = "";
sgMail.setApiKey(sendgridAPIkey);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "kevinlabtani@gmail.com",
    subject: "Welcome to my task manager app :)",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "kevinlabtani@gmail.com",
    subject: "Sad to see you leave :(",
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
