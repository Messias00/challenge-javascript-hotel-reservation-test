let dateFormated = require("./datesMoment/datesFormated.js");
let getHotels = require('./dates/hotels.js');

//recebe a reserva com tipo de cliente e suas respectivas dadas
let getCheapestHotel = function (reservation) { //DO NOT change the function's name.
    let partReservation = reservation.split(":");
    let client = partReservation[0];
    let daysFormatted = partReservation[1].split(",").map(data => dateFormated(data));

    return _getCheapestHotel(client, daysFormatted);
}

let _getCheapestHotel = function(client, daysFormatted) {
    let options = getHotels();

    let result = [];
    for (let i = 0; i < options.length; i++) {
        let currentHotels = options[i];
        let daily = calculationsdaily(client, daysFormatted, currentHotels);
        result.push({nome: currentHotels.nome, classificacao: currentHotels.classificacao, daily: daily, valueTotal: daily.reduce((a, b) => a + b, 0)});
    }
    return getBestHotel(result).nome;
}

let calculationsdaily = function(client, daysFormatted, hotelsx) {
    let daily = [];

    daysFormatted.forEach(dia => {
        switch (dia.day()) {
            case 0:
            case 6:
                if (client === "Fidelidade") {
                    daily.push(hotelsx.fidelidade.finalDeSemana);
                } else {
                    daily.push(hotelsx.regular.finalDeSemana);
                }
                break;
            default:
                if (client === "Fidelidade") {
                    daily.push(hotelsx.fidelidade.diaDeSemana);
                } else {
                    daily.push(hotelsx.regular.diaDeSemana);
                }
        }
    });
    return daily;
}

function getBestHotel(simulation) {
    let smallerCost = simulation[0];

    for (let i = 1; i < simulation.length; i++) {
        let simulationActual = simulation[i];

        if (simulationActual.valueTotal < smallerCost.valueTotal ||
            simulationActual.valueTotal === smallerCost.valueTotal && simulationActual.classificacao > smallerCost.classificacao) {
            smallerCost = simulationActual;
        }
    }
    return smallerCost;
}

module.exports = getCheapestHotel;
