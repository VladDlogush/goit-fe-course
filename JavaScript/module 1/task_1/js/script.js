'use strict'

const ADMIN_PASSWORD = 'm4ng0h4ckz';
let message;

const password = prompt('Введите пожалуйста свой пароль: ');

if (password === null) {
  message = 'Отменено пользователем!';
}else if (ADMIN_PASSWORD === password) {
  message = 'Добро пожаловать!';
}else{
  message = 'Доступ запрещен, неверный пароль!';
}

alert(message);
