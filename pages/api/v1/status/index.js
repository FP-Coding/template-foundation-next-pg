import database from "infra/database.js";

async function status(request, response) {
  const DB_NAME = process.env.POSTGRES_DB;

  const updateAt = new Date().toISOString();
  const resultVersion = await database.query("SHOW server_version;");
  const resultOpenedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity where datname=$1;",
    values: [DB_NAME],
  });
  const resultMaxConnections = await database.query("SHOW max_connections;");

  const version = resultVersion.rows[0].server_version;
  const openedConnections = resultOpenedConnections.rows[0].count;
  const maxConnections = resultMaxConnections.rows[0].max_connections;

  return response.status(200).json({
    update_at: updateAt,
    dependencies: {
      database: {
        version,
        opened_connections: openedConnections,
        max_connections: Number(maxConnections),
      },
    },
  });
}

export default status;
