'use strict'

const passwords = ['qwerty', '111qwe', '123123', 'r4nd0mp4zzw0rd'];
let attemptsLeft = 3;

while (attemptsLeft) {
    let inputPasswords = prompt ('Введите свой пароль: ');
    if (passwords.includes(inputPasswords)) {
        alert ('Добро пожаловать!');
        break;
    }
    if (inputPasswords === null) break;
        attemptsLeft --;
        if(!attemptsLeft){
           alert ('У вас закончились попытки, аккаунт заблокирован!');
           break;
        }
        alert (`Неверный пароль, у вас осталось ${attemptsLeft} попыток`);

}
