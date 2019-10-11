import Router from "express-promise-router";
import axios from "axios";

const router = new Router();
// Exportem el router
export default router;

router.get("/", async (req, res) => {
  const response = await axios.get("https://opensky-network.org/api/states/all")
  const data = response.data

  res.send({ msg: JSON.stringify(data,2) });
});
