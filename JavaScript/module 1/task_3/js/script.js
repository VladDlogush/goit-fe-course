'use strict'

let country = prompt('Введите свою страну: ');

const priceChina = 100;
const priceSA = 250;
const priceAustralia = 170;
const priceIndia = 80;
const priceYamaica = 120;

if(country === null){
  console.log('Отмена');
}else{
  country = country.toLowerCase();
  switch (country) {
    case 'китай':
      console.log(`Доставка в ${country} будет стоить ${priceChina} кредитов`);
      break;
    case 'южная америка':
      console.log(`Доставка в ${country} будет стоить ${priceSA} кредитов`);
      break;
    case 'австралия':
      console.log(`Доставка в ${country} будет стоить ${priceAustralia} кредитов`);
      break;
    case 'индия':
      console.log(`Доставка в ${country} будет стоить ${priceIndia} кредитов`);
      break;
    case 'ямайка':
      console.log(`Доставка в ${country} будет стоить ${priceYamaica} кредитов`);
      break;
    default:
      console.log('В вашей стране доставка не доступна');

  }
}
