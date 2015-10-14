'use strict';

var phoneBook = [];

function UserData(name, phone, email) {
    this.name = name;
    this.phone = phone;
    this.email = email;
}

module.exports.add = function add(name, phone, email) {
    if (isDataCorrect(name, phone, email)) {
        phoneBook.push(new UserData(name, phone, email));
        console.log('** Запись ' + name + ' добавлена');
        return true;
    } else {
        console.log('** Невозможно добавить запись. Запись ' + name + ' некорректна.');
        return false;
    }
};

function findIndex(query) {
    var goodIndex = [];
    phoneBook.forEach(function (item, i, phoneBook) {
        if (item.name.indexOf(query) +
        item.phone.indexOf(query) +
        item.email.indexOf(query) > -3) {
            goodIndex.push(i);
        };
    });
    return goodIndex;
};

module.exports.find = function find(query) {
    if (query == '') {
        for (var i = 0; i < phoneBook.length; i++) {
            printLine(i);
        };
    } else {
        var index = findIndex(query);
        for (var item = 0; item < index.length; item++) {
            printLine(index[item]);
        };
    }
};

module.exports.remove = function remove(query) {
    var index = findIndex(query);
    index = index.reverse();
    for (var i = 0; i < index.length; i++) {
        phoneBook.splice(i, 1);
    };
    console.log('** Удален ' + index.length + ' контакт');
};

module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');
    var counter = 0;
    data = data.split('\r\n');
    for (var i = 0; i < data.length; i++) {
        var tmp = data[i].split(';');
        if (module.exports.add(tmp[0], tmp[1], tmp[2])) {
            counter++;
        };
    };
    console.log('** Импортировано ' + counter + ' контактов из ' + filename + '.');
};

module.exports.showTable = function showTable(filename) {

};

function printLine(index) {
    console.log(phoneBook[index].name +
    ' ' + phoneBook[index].phone +
    ' ' + phoneBook[index].email);
}
function isDataCorrect(name, phone, email) {
    var phoneRegExp = /^\+?\d{1,11} ?-?((\(\d{3}\))|(\d{3})) ?-?\d{1,3} ?-?\d{1,3} ?-?\d{1,3}$/;
    var emailRegExp = /^\w*\@[\-a-zA-Zа-яА-Я]+(\.[\-a-zA-Zа-яА-Я]{2,})+$/;
    return emailRegExp.test(email) && phoneRegExp.test(phone);
};
