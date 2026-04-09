import { Client } from "pg";

const getNewDbClient = async () => {
  const clientConfig = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    ssl: getSSL(),
  };

  const client = new Client(clientConfig);

  await client.connect();

  return client;
};

const query = async (queryObject) => {
  let client;
  try {
    client = await getNewDbClient();
    const resultQuery = await client.query(queryObject);
    return resultQuery;
  } catch (err) {
    throw new Error(err);
  } finally {
    await client.end();
  }
};

const getSSL = () => {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV === "production";
};

const database = { getNewDbClient, query };

export default database;
