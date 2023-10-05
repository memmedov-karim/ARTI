const accountSid = 'YOUR_ACCOUNT_SID';
const authToken = 'YOUR_AUTH_TOKEN';
const client = require('twilio')(accountSid, authToken);

client.messages
      .create({
         body: 'test message',
         from: 'whatsapp:+994702388838',
         to: 'whatsapp:+994702388838'
       })
      .then(message => console.log(message.sid))
      .done();
