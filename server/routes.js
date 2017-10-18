const express = require('express');
const Slack = require('@slack/client').WebClient;
const stringify = require('csv-stringify');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/download', (req, res, next) => {
  const { token } = req.query;
  const slack = new Slack(token);

  return slack.users.list()
    .then(({ members }) => {
      const headers = [
        'First name',
        'Last name',
        'username',
        'Email',
        'Title',
        'Image',
        'Phone',
        'Skype'
      ];
      const data = members.map(({
        profile: {
          first_name: firstName,
          last_name: lastName,
          title,
          skype,
          phone,
          email,
          image_512: imageUrl
        },
        name
      }) => ([
        firstName,
        lastName,
        name,
        email,
        title,
        imageUrl,
        phone,
        skype
      ]));
      const csvData = [
        headers,
        ...data
      ];
      return stringify(csvData, (err, csv) => {
        if (err) {
          return next(err);
        }
        res.writeHead(200, {
          'Content-Type': 'text/csv',
          'Content-disposition': 'attachment;filename=users.csv',
          'Content-Length': csv.length
        });
        res.end(Buffer.from(csv, 'utf-8'));
      });
    })
    .catch((err) => {
      let errorMessage;
      switch (err.message) {
        case 'not_authed':
          errorMessage = 'Please specify your token';
          break;
        case 'invalid_auth':
          errorMessage = 'Your token doesn\'t seem to be valid :(';
          break;
        default:
          errorMessage = 'Something went wrong :( Contact thomas@givebriq.com to know what\'s wrong';
      }
      res.render('index', { errorMessage, token });
    });
});

module.exports = router;
