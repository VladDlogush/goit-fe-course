'use strict';

const credits = 23580; // кредити
const pricePerDroid = 3000; // Цена одного дроида

const droidAmount = prompt('Сколько вы хочете дроидов: ');

if(droidAmount === null){
  console.log('Отменено пользователем!');
}else { // общая цена заказа
  let totalPrice = droidAmount * pricePerDroid; // и сохраняет в переменной totalPrice
    if (totalPrice >= credits) {
      console.log('Недостаточно средств на счету!');
    }else {
      alert(`Вы купили ${droidAmount} дроидов, на счету осталось ${credits - totalPrice} кредитов.`);
    }
}
