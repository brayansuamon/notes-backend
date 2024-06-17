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

  async sendEmail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: config.myEmail,
        pass: config.myPassword,
      },
    });
    await transporter.sendMail(infoMail);

    return { message: 'Email sent' };
  }

  async sendRecovery(email) {
    const jwtConfig = {
      expiresIn: '15min',
    };

    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, secret, jwtConfig);
    const link = `${config.frontUrl}/recovery?token=${token}`;
    await service.update(user.id, { recoveryToken: token });

    const mail = {
      from: `"Brayan Suarez 👻" <${config.myEmail}>`, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Email to recover password', // Subject line
      // text: 'How are you?', // plain text body
      html: `<b>Ingresa a este link => ${link} </b>`, // html body
    };

    const rta = await this.sendEmail(mail);
    return rta;
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, secret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      }
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { password: hash, recoveryToken: null });
      return { message: 'Password changed' };
    } catch (error) {
      throw boom.unauthorized();
    }
  }
}
module.exports = AuthService;
