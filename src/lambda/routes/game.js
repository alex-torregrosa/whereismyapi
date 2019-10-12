import Router from "express-promise-router";
import axios from "axios";

const router = new Router();
// Exportem el router
export default router;

var randomPlane = (l) => {
  let n = Math.random()*l
  return Math.floor(n)
}

router.get("/", async (req, res) => {
  const response = await axios.get("https://opensky-network.org/api/states/all")
  const data = response.data["states"];
  let n = randomPlane(data.length);
  while (data[n][8] != false) {
    n = randomPlane(data.length);
  }
  var plane_info = {};
  plane_info.icao24 = data[n][0]
  plane_info.lonlat = [data[n][5], data[n][6]];

  res.send(plane_info);
});
