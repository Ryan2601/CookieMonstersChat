'use strict';

/* global login */
/* eslint-disable no-param-reassign */

var userNameElement = document.getElementById('username');
var passwordElement = document.getElementById('password');
var loginBtnElement = document.getElementById('loginBTN');

var usernameErr = document.getElementById('usernameErr');
var passwordErr = document.getElementById('passwordErr');

function displayErr(errElem, errMsg) {
  errElem.innerText = errMsg;
}

var validateLogin = function validateLogin(userName, passwordOf) {
  var userDetails = { username: userName, password: passwordOf };
  // const userDetails = { username: '1234', password: '1234' };
  login(userDetails, function (errMsg) {
    if (errMsg === 'passwords do not match') {
      displayErr(passwordErr, errMsg);
    } else {
      displayErr(usernameErr, errMsg);
    }
  });
};

loginBtnElement.addEventListener('click', function (event) {
  event.preventDefault();
  displayErr(passwordErr, '');
  displayErr(usernameErr, '');
  validateLogin(userNameElement.value, passwordElement.value);
});