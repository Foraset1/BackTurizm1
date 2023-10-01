const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' })); // Устанавливаем origin: '*' для разрешения запросов от всех источников

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'poptrebko@gmail.com',
    pass: 'oocnacbxcqissafe',
  },
});

app.options('/send-email', cors()); // Обработка OPTIONS запросов для /send-email

app.post('/send-email', (req, res) => {
  const { to } = req.body;

  const mailOptions = {
    from: 'poptrebko@gmail.com',
    to: to,
    subject: 'Zapoluj na wakacje',
    html: 'Verification code "12414"',
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).json({ error: 'Ошибка при отправке письма' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Письмо успешно отправлено' });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
