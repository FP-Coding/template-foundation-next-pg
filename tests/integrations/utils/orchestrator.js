import retry from "async-retry";
import database from "infra/database";

const API_HOST = process.env.API_HOST;

async function waitForAllServices() {
  await retry(getStatus, { minTimeout: 500, maxTimeout: 1000, retries: 100 });

  async function getStatus() {
    const resultRequest = await fetch(`${API_HOST}/api/v1/status`);
    if (resultRequest.status !== 200) throw new Error();
  }
}

async function clearDatabase() {
  await database.query(
    "DROP SCHEMA IF EXISTS public CASCADE; CREATE SCHEMA public;",
  );
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
};

export default orchestrator;
