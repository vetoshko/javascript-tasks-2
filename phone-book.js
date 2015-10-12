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

function find_index(query) {
    var good_index = [];
    phoneBook.forEach(function (item, i, phoneBook) {
        if (item.name.indexOf(query) +
        item.phone.indexOf(query) +
        item.email.indexOf(query) > -3) {
            good_index.push(i);
        };
    });
    return good_index;
};

module.exports.find = function find(query) {
    if (query == '') {
        for (var i = 0; i < phoneBook.length; i++) {
            print_line(i);
        };
    } else {
        var id_x = find_index(query);
        for (var item = 0; item < id_x.length; item++) {
            print_line(id_x[item]);
        };
    }
};

module.exports.remove = function remove(query) {
    var id_x = find_index(query);
    id_x = id_x.reverse();
    for (var i = 0; i < id_x.length; i++) {
        phoneBook.splice(i, 1);
    };
    console.log('** Удален ' + id_x.length + ' контакт');
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

function print_line(index) {
    console.log(phoneBook[index].name +
    ' ' + phoneBook[index].phone +
    ' ' + phoneBook[index].email);
}
function isDataCorrect(name, phone, email) {
    var phone_re = /^\+?\d{1,11} ?-?((\(\d{3}\))|(\d{3})) ?-?\d{1,3} ?-?\d{1,3} ?-?\d{1,3}$/;
    var email_re = /^\w*\@[\-a-zA-Zа-яА-Я]+(\.[\-a-zA-Zа-яА-Я]{2,})+$/;
    return email_re.test(email) && phone_re.test(phone);
};
