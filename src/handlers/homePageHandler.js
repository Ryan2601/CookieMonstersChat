const fs = require('fs');
const path = require('path');
const cookie = require('cookie');
const { verify } = require('jsonwebtoken');

const SECRET = 'denis';

const filePathLogin = path.join(__dirname, '..', '..', 'output', 'login.html');
const filePathMain = path.join(__dirname, '..', '..', 'output', 'main.html');

/* homePageHandler will check if the user is already logged in to the system:
*  if so go to main.html
*  else go to login.html
*/
const homePageHandler = (request, response) => {
  // Checks if the user has an account
  console.log('In home page handler');

  let hasAccount = false;
  if (request.headers.cookie) {
    const { jwt } = cookie.parse(request.headers.cookie);
    verify(jwt, SECRET, (err) => {
      console.log(err);
      if (!err) {
        hasAccount = true;
      }
    });
  }

  if (hasAccount) {
    // if there is a valid cookie go to main.html
    fs.readFile(filePathMain, (error, file) => {
      if (error) {
        response.writeHead(500, { 'Content-Type': 'text/html' });
        response.end('<h1>Sorry, something went wrong</h1>');
      } else {
        response.writeHead(200, { 'Content-type': 'text/html' });
        response.end(file);
      }
    });
  } else {
    // if no redirect to login.html
    fs.readFile(filePathLogin, (error, file) => {
      if (error) {
        response.writeHead(500, { 'Content-Type': 'text/html' });
        response.end('<h1>Sorry, something went wrong</h1>');
      } else {
        response.writeHead(200, { 'Content-type': 'text/html' });
        response.end(file);
      }
    });
  }
};

module.exports = homePageHandler;
