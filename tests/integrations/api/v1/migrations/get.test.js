import getMigrationsNames from "tests/integrations/utils/getMigrationsNames";
import orchestrator from "tests/integrations/utils/orchestrator";

const API_HOST = process.env.API_HOST;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("GET /api/v1/status", () => {
  describe("As Anonymous User", () => {
    test("Retrieving pending migrations", async () => {
      const response = await fetch(`${API_HOST}/api/v1/migrations`);
      const responseBody = await response.json();
      const migrationsNames = getMigrationsNames();
      const receivedMigrationsName = responseBody.map(({ name }) => name);

      expect(Array.isArray(responseBody)).toBe(true);
      expect(receivedMigrationsName).toEqual(migrationsNames);
    });
  });
});
