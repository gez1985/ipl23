const cron = require("node-cron");
const buildData = require("./build-data");
const _ = require("lodash");
const makeTransfer = require("./make-transfer");

console.log("cron jobs file run");

const testCronString = "*/20 * * * * *";
const transferCronString = "0 20 * * Friday";

const makeTransfers = async () => {
  try {
    const { managers } = await buildData();
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

cron.schedule(transferCronString, async () => {
  console.log("MAKING TRANSFERS...");
  makeTransfers();
});
