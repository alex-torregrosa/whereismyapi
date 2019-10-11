import game from "./game";

const base = "/.netlify/functions/api";

export default app => {
  app.use(base + "/game", game);
};
