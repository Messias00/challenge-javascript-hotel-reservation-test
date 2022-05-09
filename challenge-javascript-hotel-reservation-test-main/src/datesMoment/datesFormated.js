//datas formatadas
let datesMoment = require('moment');

let dateFormated = function (dates) {
    return datesMoment(dates, 'DDMMMYYYY(ddd)');
}

module.exports = dateFormated;