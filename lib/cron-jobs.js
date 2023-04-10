const cron = require("node-cron");
const pool = require("../db");
const camelCaseKeys = require("camelcase-keys");
const sortObjectsArray = require("sort-objects-array");
const buildData = require("./build-data");
const _ = require("lodash");
const makeTransfer = require("./make-transfer");

console.log("cron jobs file run");

const testCronString = "*/20 * * * * *";

const makeTransfers = async () => {
  try {
    const { managers, players } = await buildData();
    const sortedManagers = _.sortBy(
      managers,
      ["stage1Points", "topScorerPoints"],
      ["asc", "asc"]
    );
    for (const manager of sortedManagers) {
      if (manager.transferOutId && manager.transferOutId > -1) {
         const response = await makeTransfer(manager);
         console.log(response)
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

cron.schedule(testCronString, async () => {
  console.log("test cron job running...");
  makeTransfers();
});
