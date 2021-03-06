const { sign } = require('jsonwebtoken');
const { checkNameAndPassword } = require('../query/checkUserAndPassword');

const SECRET = 'denis';
const loginHandler = (request, response) => {
  let allData = '';
  request.on('data', (chunk) => {
    allData += chunk;
  });
  request.on('error', (error) => {
    console.log(error);
  });

  request.on('end', () => {
    const body = JSON.parse(allData);
    checkNameAndPassword(body, (err, result) => {
      if (err) {
        console.log(err);
      } else if (result === 'user do not exist') {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end(result);
      } else if (result === 'passwords do not match') {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end(result);
      } else {
        const cookieDetails = { user_id: result.id, name: result.name };
        const cookie = sign(cookieDetails, SECRET);
        response.writeHead(200, { 'Set-Cookie': `jwt=${cookie}; HttpOnly` });
        response.end();
      }
    });
  });
};

module.exports = loginHandler;
