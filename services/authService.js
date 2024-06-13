const UserService = require('../services/usersService');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require('nodemailer');

const service = new UserService();
const secret = config.jwtSecret;

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    //Authenticate the user
    return user;
  }

  signToken(user) {
    const jwtConfig = {
      expiresIn: '7d',
    };
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, secret, jwtConfig);
    return {
      user,
      token,
    };
  }

  async sendEmail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: config.myEmail,
        pass: config.myPassword,
      },
    });
    await transporter.sendMail({
      from: `"Brayan Suarez 👻" <${config.myEmail}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'This is my first mail', // Subject line
      text: 'How are you?', // plain text body
      html: '<b>How are you?</b>', // html body
    });

    return { message: 'Email sent' };
  }
}
module.exports = AuthService;
