'use strict'

let input;
const numbers = [];
let total = 0;

do {
  input = prompt('Введите число: ');
  if(input !== null && input !== "" && !Number.isNaN(Number(input)) ){
    numbers.push(input);
  }else if(Number.isNaN(Number(input))){
      alert('Было введено не число, попробуйте еще раз');
  }
} while (input !== null);
if (numbers.length){
  for (let element of numbers) {
     total += Number(element);
  }
  console.log(`Общая сумма чисел равна ${total}`);
}
