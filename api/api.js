const express = require('express');
const playersRouter = require('./players');
const teamsRouter = require('./teams');
const managersRouter = require('./managers');
const fixturesRouter = require('./fixtures');
const scoresRouter = require('./scores');
const leaguesRouter = require('./leagues');
const vidiprinterRouter = require('./vidiprinter');


const apiRouter = express.Router();

apiRouter.use('/players', playersRouter);
apiRouter.use('/managers', managersRouter);
apiRouter.use('/teams', teamsRouter);
apiRouter.use('/fixtures', fixturesRouter);
apiRouter.use('/scores', scoresRouter);
apiRouter.use('/leagues', leaguesRouter);
apiRouter.use('/vidiprinter', vidiprinterRouter);


module.exports = apiRouter;