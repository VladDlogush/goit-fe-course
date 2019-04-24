'use strict'

let input;
const numbers = [];
let total = 0;

do {
  input = prompt('Введите число: ');
  if(input !== null && input !== "" && isNaN(input) === false){
    numbers.push(input);
  }else if(isNaN(Number(input))){
      alert('Было введено не число, попробуйте еще раз');
  }
  if (input === null) {
      console.log('Cancel');
  }
} while (input !== null);
if (numbers.length !== 0){
  for (let element of numbers) {
     total += Number(element);
  }
  console.log(`Общая сумма чисел равна ${total}`);
}
