const bcrypt = require('bcrypt');

async function verifyPassword() {
  const mypassword = 'admin 123 222';
  const hash = '$2b$10$ayAX3F5aNy/TTy4hbmjx.ecBv1L/AyoUhQT0DaYPx7AupxZd7QeKe';
  const isMatch = await bcrypt.compare(mypassword, hash);

  //If the match is true, the password is correct
  console.log(isMatch);
}

verifyPassword();
