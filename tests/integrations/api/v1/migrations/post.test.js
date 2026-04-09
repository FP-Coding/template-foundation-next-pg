import getMigrationsNames from "tests/integrations/utils/getMigrationsNames";
import orchestrator from "tests/integrations/utils/orchestrator";

const API_HOST = process.env.API_HOST;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("POST /api/v1/migrations", () => {
  describe("As Anonymous User", () => {
    test("Running pending migrations when has pending migrations to run", async () => {
      const response = await fetch(`${API_HOST}/api/v1/migrations`, {
        method: "POST",
      });
      const responseBody = await response.json();
      const migrationsNames = getMigrationsNames();
      const runnedMigrations = responseBody.map(({ name }) => name);

      expect(Array.isArray(responseBody)).toBe(true);
      expect(migrationsNames).toEqual(runnedMigrations);
    });
    test("Running pending migrations when has NO pending migrations to run", async () => {
      const response = await fetch(`${API_HOST}/api/v1/migrations`, {
        method: "POST",
      });
      const responseBody = await response.json();

      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody).toEqual([]);
    });
  });
});
