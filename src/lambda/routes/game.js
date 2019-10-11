import Router from "express-promise-router";

const router = new Router();
// Exportem el router
export default router;

router.get("/", async (req, res) => {
  res.send({ msg: "Test ok" });
});
