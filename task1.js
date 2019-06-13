// Task 1
const ADMIN_PASSWORD = 'm4ng0h4ckz';
let message = prompt('Введите Ваш пароль');
const CANCEL = 'Отменено пользователем!';
const WELCOME = 'Добро пожаловать!';
const WRONG_PASS = 'Доступ запрещен, неверный пароль!';

if (message === null) {
  message = CANCEL;
} else if (message === ADMIN_PASSWORD) {
  message = WELCOME;
} else {
  message = WRONG_PASS;
}
alert(message);
