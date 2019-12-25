// we mock the sendgrid node module so that we don't send emails and waste our quota when testing
module.exports = {
  setApiKey() {},
  send() {},
};
