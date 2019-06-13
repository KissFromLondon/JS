// Task 3
const message = prompt('В какую страну Вы хотите оформить доставку?', '');
const userCountry = +message;
const countries = {
  Китай: 100,
  'Южная Америка': 250,
  Австралия: 170,
  Индия: 80,
  Ямайка: 120,
};
// const keys = Object.keys(countries);
const noDelivery = 'В вашей стране доставка не доступна';
// if (userCountry == Object.keys(countries)) {
// if (userCountry === keys) {
// for (userCountry in countries) {
//   const INFO = `Доставка в ${userCountry} будет стоить ${countries[userCountry]} кредитов`;
//   alert(INFO);
// }
// } else {
//   message = noDelivery;
// }
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

switch (userCountry) {
  case userCountry === 'Китай': // почему даже так не проходит проверку? И почему userCountry не строка, если мы привели к строке?
    alert(`Доставка в ${message} будет стоить ${countries.Китай} кредитов`);
    break;
  case userCountry === (getKeyByValue(countries, 250)): // и так не сработало...
    alert(`Доставка в ${message} будет стоить ${countries['Южная Америка']} кредитов`);
    break;
  case userCountry === countries[2]:
    alert(`Доставка в ${message} будет стоить ${countries.Австралия} кредитов`);
    break;
  case userCountry === countries[3]:
    alert(`Доставка в ${message} будет стоить ${countries.Индия} кредитов`);
    break;
  case userCountry === countries[4]:
    alert(`Доставка в ${message} будет стоить ${countries.Ямайка} кредитов`);
    break;
  default:
    alert(noDelivery);
    break;
}

// console.log(Object.keys(countries[0])); так хотелось, чтобы сработало :(
// console.log(getKeyByValue(countries, 100)); //
