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

  const plane = data[randomN(data.length)];
  let plane_info = (({
    geography,
    flight: { icaoNumber: planeIcao },
    departure: { iataCode: departureIata },
    arrival: { iataCode: arrivalIata }
  }) => ({
    geography,
    planeIcao,
    departureIata,
    arrivalIata
  }))(plane);

  const url2 = `http://aviation-edge.com/v2/public/timetable?key=${
    apiKeys[randomN(apiKeys.length)]
  }&flight_icao=${plane_info.planeIcao}&dep_iataCode=${
    plane_info.departureIata
  }`;
  let data2 = await request(url2);

  console.log(data2);

  data2 = data2[0];
  plane_info.departureTime = data2.departure.scheduledTime;
  plane_info.arrivalTime = data2.arrival.scheduledTime;

  const url3 = `https://aviation-edge.com/v2/public/airportDatabase?key=${
    apiKeys[randomN(apiKeys.length)]
  }&codeIataAirport=${plane_info.departureIata}`;
  const data3 = (await request(url3))[0];
  plane_info.departureAirport = data3.nameAirport;
  plane_info.departureAirportGeography = {
    latitude: parseFloat(data3.latitudeAirport),
    longitude: parseFloat(data3.longitudeAirport)
  };

  const url4 = `https://aviation-edge.com/v2/public/airportDatabase?key=${
    apiKeys[randomN(apiKeys.length)]
  }&codeIataAirport=${plane_info.arrivalIata}`;
  const data4 = (await request(url4))[0];
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

// haversine :: (Num, Num) -> (Num, Num) -> Num
const haversine = ([lat1, lon1], [lat2, lon2]) => {
  // Math lib function names
  const [pi, asin, sin, cos, sqrt, pow, round] = [
      "PI",
      "asin",
      "sin",
      "cos",
      "sqrt",
      "pow",
      "round"
    ].map(k => Math[k]),
    // degrees as radians
    [rlat1, rlat2, rlon1, rlon2] = [lat1, lat2, lon1, lon2].map(
      x => (x / 180) * pi
    ),
    dLat = rlat2 - rlat1,
    dLon = rlon2 - rlon1,
    radius = 6372.8; // km
  // km
  return (
    round(
      radius *
        2 *
        asin(
          sqrt(
            pow(sin(dLat / 2), 2) +
              pow(sin(dLon / 2), 2) * cos(rlat1) * cos(rlat2)
          )
        ) *
        100
    ) / 100
  );
};

export const calcScores = async () => {
  const users = (await db.ref("/users").once("value")).val();

  console.log(users);
};
