'use strict'

let input;
const numbers = [];
let total = 0;

do {
  input = prompt('Введите число: ');
  if(input !== null && Number(input) ){
    numbers.push(input);
    for (let element of input) {
       total += Number(element);
    }
  }
  if (input === null) {
      console.log('Cancel');

      console.log(`Общая сумма чисел равна ${total}`);
  }else if (!Number(input)) {
      alert('Было введено не число, попробуйте еще раз');
  }
} while (input !== null);
