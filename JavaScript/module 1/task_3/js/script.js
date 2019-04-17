'use strict'

const country = prompt('Введите свою страну: ').toLowerCase();
let message;
const priceChina = 100;
const priceSA = 250;
const priceAustralia = 170;
const priceIndia = 80;
const priceYamaica = 120;

switch (country) {
  case 'китай':
    message = confirm(`Доставка в ${country} будет стоить ${priceChina} кредитов`);
    break;
  case 'южная америка':
    message = confirm(`Доставка в ${country} будет стоить ${priceSA} кредитов`);
    break;
  case 'австралия':
    message = confirm(`Доставка в ${country} будет стоить ${priceAustralia} кредитов`);
    break;
  case 'индия':
    message = confirm(`Доставка в ${country} будет стоить ${priceIndia} кредитов`);
    break;
  case 'ямайка':
    message = confirm(`Доставка в ${country} будет стоить ${priceYamaica} кредитов`);
    break;
  default:
    alert('В вашей стране доставка не доступна');
}
