const bcrypt = require('bcrypt');

async function hashPassword() {
  const mypassword = 'admin 123 222';
  //The number of rounds for encrypt the key is 10
  const hash = await bcrypt.hash(mypassword, 10);
  console.log(hash);
}

hashPassword();
