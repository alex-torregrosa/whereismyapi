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
  "ba3851-e3cc69",
  "0a9260-7552c3",
  "01eae0-1d71ff",
  "476181-5888a1",
  "c7007a-5213ad",
  "3cb311-4bf358",
  "6bac5c-1c09cc",
  "088833-0c39a2",
  "523e2a-d6c11a",
  "ced340-291705",
  "522179-ae6dac",
  "721753-85b9da",
  "083bb5-582a2d",
  "43d32b-ab4f80",
  "271afd-3e9e95",
  "fcf305-f6f3b4",
  "e5a019-5642e2",
  "6c667a-7d6937",
  "2fb9e6-c68731",
  "ddf23c-8ebd23",
  "79f70e-0cf925",
  "da27d4-3d39e6",
  "0fcb48-a9ce30",
  "88a1e1-62a29f",
  "5fa937-8b06fd",
  "9ec8ac-94dd8e",
  "9ec8ac-94dd8e",
  "983f80-84a18c",
  "abb942-5e45d7",
  "28d2f2-27a9ee",
  "358b43-5a0dfc",
  "cf6cfa-19a319",
  "a897bb-34d227",
  "f84656-9be854",
  "de9bc2-3dd704",
  "4d525d-cd21e3",
  "4f6869-305cc6",
  "a17377-0c6648",
  "1e35fc-dcbf37",
  "82b50c-c818a5",
  "38a101-0d2f1b",
  "622d6a-1302b1",
  "26dbc0-f666b6",
  "0789b8-0a3c12",
  "05f97e-1990d1",
  "928980-aed056",
  "8b8136-acb685",
  "8028a7-780d6d",
  "a579b9-b134ce",
  "08cec9-01ccea",
  "164cef-34834b",
  "a8673d-67e460",
  "1b084b-803dc2",
  "a5d894-25f774",
  "15ae47-14d6ee"
];

export const getPlaneInfo = async () => {
  const url = `http://aviation-edge.com/v2/public/flights?key=${
    apiKeys[randomN(apiKeys.length)]
  }&status=en-route&limit=500`;
  console.log("R1_URL: " + url);
  const data = await request(url);
  console.log("R1_DATA: len=" + data.length);
  if (!data.length) {
    console.log("RECURSE!");
    return getPlaneInfo();
  }
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
    let starti = randomN(data.length);
    let endi = starti - 1;
    while (!(plane = data[starti]) || !successQuery2) {
      starti = (starti + 1) % data.length;
      if (starti === endi) return getPlaneInfo();
      if (
        !(
          !plane ||
          !plane.geography ||
          !plane.flight.icaoNumber ||
          !plane.departure.iataCode ||
          !plane.arrival.iataCode
        )
      ) {
        successQuery2 = true;
      }
    }

    var plane_info = plane_info_get(plane);

    const url2 = `http://aviation-edge.com/v2/public/timetable?key=${
      apiKeys[randomN(apiKeys.length)]
    }&flight_icao=${plane_info.planeIcao}&dep_iataCode=${
      plane_info.departureIata
    }`;
    console.log("R2_URL: " + url2);
    let data2 = await request(url2);
    console.log("R2_DATA: " + JSON.stringify(data2));
    if (!data2.error) {
      successQuery = true;
      data2 = data2[0];
      plane_info.departureTime = data2.departure.scheduledTime;
      plane_info.arrivalTime = data2.arrival.scheduledTime;
    }

    limit--; //Per si no en troba cap que funcioni, just in case
  }

  const url3 = `https://aviation-edge.com/v2/public/airportDatabase?key=${
    apiKeys[randomN(apiKeys.length)]
  }&codeIataAirport=${plane_info.departureIata}`;
  console.log("R3_URL: " + url3);
  const data3 = (await request(url3))[0];
  console.log("R3_DATA: " + JSON.stringify(data3));
  if (!data3) return getPlaneInfo();
  plane_info.departureAirport = data3.nameAirport;
  plane_info.departureAirportGeography = {
    latitude: parseFloat(data3.latitudeAirport),
    longitude: parseFloat(data3.longitudeAirport)
  };

  const url4 = `https://aviation-edge.com/v2/public/airportDatabase?key=${
    apiKeys[randomN(apiKeys.length)]
  }&codeIataAirport=${plane_info.arrivalIata}`;
  console.log("R4_URL: " + url4);
  const data4 = (await request(url4))[0];
  console.log("R4_DATA: " + JSON.stringify(data4));
  if (!data4) return getPlaneInfo();
  plane_info.arrivalAirport = data4.nameAirport;
  plane_info.arrivalAirportGeography = {
    latitude: parseFloat(data4.latitudeAirport),
    longitude: parseFloat(data4.longitudeAirport)
  };

  console.log("PLANE_INFO", plane_info);

  var ref = db.ref("/gameState");
  ref.remove();
  ref.set({
    startTime: Date.now() + 2000,
    endTime: Date.now() + 22000,
    planeDeparture:
      new Date(plane_info.departureTime).getTime() - data3.GMT * 3600000,
    planeArrival:
      new Date(plane_info.arrivalTime).getTime() - data4.GMT * 3600000,
    startAirport: plane_info.departureAirport,
    endAirport: plane_info.arrivalAirport,
    startIata: plane_info.departureIata,
    endIata: plane_info.arrivalIata,
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
    let userCount = 0;
    for (const user in users[gate]) {
      userCount += 1;
      tempScore += users[gate][user];
    }
    users[gate].score = Math.floor(tempScore / userCount);
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
