import Router from "express-promise-router";
import axios from "axios";
import db from "../lib/firebase";

const router = new Router();
// Exportem el router
export default router;

var randomN = l => {
  let n = Math.random() * l;
  return Math.floor(n);
};

router.get("/", async (req, res) => {
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
  const url = `http://aviation-edge.com/v2/public/flights?key=${
    apiKeys[randomN(apiKeys.length)]
  }&status=en-route&limit=3000`;
  const response = await axios.get(url);
  const data = response.data;

  let plane = data[randomN(data.length)];
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

  console.log(plane_info);

  const response2 = await axios.get(url2);
  const data2 = response2.data[0];

  console.log(url2);
  console.log(data2);

  plane_info.departureTime = data2.departure.scheduledTime;
  plane_info.arrivalTime = data2.arrival.scheduledTime;

  var ref = db.ref("/gameState");
  ref.set({
    startTime: new Date(plane_info.departureTime).getTime(),
    endTime: new Date(plane_info.arrivalTime).getTime(),
    startAirport: plane_info.departureIata,
    endAirport: plane_info.arrivalIata,
    icao: plane_info.planeIcao,
    latitude: plane_info.geography.latitude,
    longitude: plane_info.geography.longitude
  });

  res.send(plane_info);
});
