import Router from "express-promise-router";
import axios from "axios";

const router = new Router();
// Exportem el router
export default router;

var randomN = (l) => {
  let n = Math.random()*l
  return Math.floor(n)
}

router.get("/", async (req, res) => {
  var apiKeys = ["3f4daa-8ef9bb",
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
  const url = `http://aviation-edge.com/v2/public/flights?key=${apiKeys[randomN(apiKeys.length)]}&status=en-route&limit=3000`
  const response = await axios.get(url)
  const data = response.data;
  let plane = data[randomN(data.length)];
  let plane_info = {};
  plane_info.geography = plane.geography;

  console.log(data.length);

  //var plane_info = {};
  //plane_info.icao24 = data[n][0]
  //plane_info.lonlat = [data[n][5], data[n][6]];

  res.send(data);
});
