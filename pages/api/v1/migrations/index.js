import database from "infra/database";
import { runner } from "node-pg-migrate";
import { join } from "node:path";

async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  if (!allowedMethods.includes(request.method)) {
    return response
      .status(403)
      .json({ error: `O método ${request.method} não é permitido` });
  }

  let dbClient;
  try {
    dbClient = await database.getNewDbClient();

    const configurationRunner = {
      dbClient,
      dir: join("infra", "migrations"),
      migrationsTable: "pgmigrations",
      direction: "up",
      verbose: false,
    };

    if (request.method === "GET") {
      const pendingMigrations = await runner({
        ...configurationRunner,
        dryRun: true,
      });

      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const runnedMigrations = await runner({
        ...configurationRunner,
        dryRun: false,
      });
      return response.status(201).json(runnedMigrations);
    }
  } catch (err) {
    console.error(err);
    throw new Error(err);
  } finally {
    dbClient.end();
  }
}

export default migrations;
