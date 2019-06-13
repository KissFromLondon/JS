// Task 2
const credits = 23580;
const pricePerDroid = 3000;
let message = prompt('Как количество дроидов Вы желаете приобрести?', 0);
const userNum = +message;
const CANCEL = 'Отменено пользователем!';
const notEnoughMoney = 'Недостаточно средств на счету!';
const totalPrice = userNum * pricePerDroid;
const remainder = totalPrice - credits;
const SUCCESS = `Вы купили ${userNum} дроидов, на счету осталось ${remainder} кредитов.`;

if (message === null) {
  message = CANCEL;
} else if (totalPrice > credits) {
  message = notEnoughMoney;
} else {
  message = SUCCESS;
}
alert(message);
