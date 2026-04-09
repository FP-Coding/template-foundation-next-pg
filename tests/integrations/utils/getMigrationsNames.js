import fs from "node:fs";
import { join } from "node:path";

function getMigrationsNames() {
  const migrationsFiles = fs.readdirSync(join("infra", "migrations"));
  const migrationsNames = migrationsFiles.map((file) => {
    return file.split(".")[0];
  });

  return migrationsNames;
}

export default getMigrationsNames;
