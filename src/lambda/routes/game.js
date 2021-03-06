import Router from "express-promise-router";
import db from "../lib/firebase";
import { detectScrollType } from "normalize-scroll-left";
import { getPlaneInfo, calcScores } from "../lib/time_controller";

const router = new Router();
// Exportem el router
export default router;

router.get("/", async (req, res) => {
  await calcScores();
  await getPlaneInfo();
  res.send("currecta");
});
