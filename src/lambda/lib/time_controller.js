import db from "../lib/firebase";
import axios from "axios";

const randomN = l => {
  let n = Math.random() * l;
  return Math.floor(n);
};

const request = async url => {
  const response = await axios.get(url);
  return response.data;
};

var apiKeys = [
  "3f4daa-8ef9bb",
  "7abdbe-7bc4d5",
  "265fc9-805b4e",
  "867897-8dd8c7",
  "be2b29-75503d",
  "55c09f-c57571",
  "910b22-481ab1",
  "6ad67b-6bc63e",
  "5f3103-c46f6",
  "947141-f81b3c",
  "adc404-03a34d",
  "049fce-d4361b"
];

export const getPlaneInfo = async () => {
  const url = `http://aviation-edge.com/v2/public/flights?key=${
    apiKeys[randomN(apiKeys.length)]
  }&status=en-route&limit=3000`;
  const data = await request(url);

  let plane_info_get = ({
    geography,
    flight: { icaoNumber: planeIcao },
    departure: { iataCode: departureIata },
    arrival: { iataCode: arrivalIata }
  }) => ({
    geography,
    planeIcao,
    departureIata,
    arrivalIata
  });

  let successQuery = false;
  let limit = 3000;

  while (!successQuery && limit > 0) {
    let plane = false;
    let successQuery2 = false;
    while (!(plane = data[randomN(data.length)]) || !successQuery2) {
      console.log(
        plane.geography,
        plane.flight.icaoNumber,
        plane.departure.iataCode,
        plane.arrival.iataCode
      );
      if (
        !(
          !plane.geography ||
          !plane.flight.icaoNumber ||
          !plane.departure.iataCode ||
          !plane.arrival.iataCode
        )
      ) {
        successQuery2 = true;
        console.log("m'agrada");
      }
    }

    var plane_info = plane_info_get(plane);

    const url2 = `http://aviation-edge.com/v2/public/timetable?key=${
      apiKeys[randomN(apiKeys.length)]
    }&flight_icao=${plane_info.planeIcao}&dep_iataCode=${
      plane_info.departureIata
    }`;
    let data2 = await request(url2);
    if (!data2.error) {
      // console.log(data2.error);
      successQuery = true;
      data2 = data2[0];
      plane_info.departureTime = data2.departure.scheduledTime;
      plane_info.arrivalTime = data2.arrival.scheduledTime;
    }
    console.log("data2", successQuery ? "funciona" : data2);

    limit--; //Per si no en troba cap que funcioni, just in case
  }

  const url3 = `https://aviation-edge.com/v2/public/airportDatabase?key=${
    apiKeys[randomN(apiKeys.length)]
  }&codeIataAirport=${plane_info.departureIata}`;
  const data3 = (await request(url3))[0];
  console.log("request3", data3);
  plane_info.departureAirport = data3.nameAirport;
  plane_info.departureAirportGeography = {
    latitude: parseFloat(data3.latitudeAirport),
    longitude: parseFloat(data3.longitudeAirport)
  };

  const url4 = `https://aviation-edge.com/v2/public/airportDatabase?key=${
    apiKeys[randomN(apiKeys.length)]
  }&codeIataAirport=${plane_info.arrivalIata}`;
  const data4 = (await request(url4))[0];
  console.log("request4", data4);
  plane_info.arrivalAirport = data4.nameAirport;
  plane_info.arrivalAirportGeography = {
    latitude: parseFloat(data4.latitudeAirport),
    longitude: parseFloat(data4.longitudeAirport)
  };

  var ref = db.ref("/gameState");
  ref.remove();
  ref.set({
    startTime: Date.now() + 2000,
    endTime: Date.now() + 22000,
    plainDeparture: new Date(plane_info.departureTime).getTime(),
    plainArrival: new Date(plane_info.arrivalTime).getTime(),
    startAirport: plane_info.departureAirport,
    endAirport: plane_info.arrivalAirport,
    icao: plane_info.planeIcao,
    latitude: plane_info.geography.latitude,
    longitude: plane_info.geography.longitude,
    departureAirportGeography: plane_info.departureAirportGeography,
    arrivalAirportGeography: plane_info.arrivalAirportGeography
  });
};

export const calcScores = async () => {
  const usersRef = db.ref("/users");
  const scoresRef = db.ref("/scores");

  let users = (await usersRef.once("value")).val();

  for (const gate in users) {
    let tempScore = 0;
    for (const user in users[gate]) {
      tempScore += users[gate][user];
    }
    users[gate].score = tempScore;
  }

  const gateScores = (await scoresRef.once("value")).val();
  for (const gate in users) {
    // Si existeix sumem, si no (o es 0), asignem
    if (gateScores[gate]) gateScores[gate] += users[gate].score;
    else gateScores[gate] = users[gate].score;
  }
  await scoresRef.set(gateScores);
  await usersRef.remove();
};
