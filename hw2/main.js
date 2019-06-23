//Task 1
{
  let input;
  const numbers = [];
  let total = 0;

  do {
    input = prompt("Введите Ваше число");
    numbers.push(+input);
    if (isNaN(input)) {
      alert("Вы ввели не число! Попробуйте еще раз!");
    }
  } while (input !== null);

  for (let i = 0; i < numbers.length; i += 1) {
    total += numbers[i];
  }
  alert(`Общая сумма чисел равна ${total}`);
}

// Task 2
{
  const passwords = ["qwerty", "111qwe", "123123", "r4nd0mp4zzw0rd"];
  const attemptsLeft = 3;
  let message;
  let counter = 0;

  console.log(attemptsLeft);

  do {
    message = prompt("Введите свой пароль", "");
    if (!passwords.includes(message)) {
      alert("Пароль неверный, попробуйте еще раз!");
      counter = counter + 1;
      console.log(counter);
      if (counter === attemptsLeft) {
        alert(
          "Вы ввели неправильный пароль 3 раза, попытки ввода исчерпались!"
        );
      }
    } else if (passwords.includes(message)) {
      alert("Добро пожаловать!");
      break;
    }
  } while (counter < attemptsLeft);
}
