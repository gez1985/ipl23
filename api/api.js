const express = require("express");
const playersRouter = require("./players");
const teamsRouter = require("./teams");
const managersRouter = require("./managers");
const fixturesRouter = require("./fixtures");
const scoresRouter = require("./scores");
const leaguesRouter = require("./leagues");
const vidiprinterRouter = require("./vidiprinter");
const transfersRouter = require("./transfers");

const apiRouter = express.Router();

apiRouter.use("/players", playersRouter);
apiRouter.use("/managers", managersRouter);
apiRouter.use("/teams", teamsRouter);
apiRouter.use("/fixtures", fixturesRouter);
apiRouter.use("/scores", scoresRouter);
apiRouter.use("/leagues", leaguesRouter);
apiRouter.use("/vidiprinter", vidiprinterRouter);
apiRouter.use("/transfers", transfersRouter);

module.exports = apiRouter;
