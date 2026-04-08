import orchestrator from "tests/integrations/utils/orchestrator";

const API_HOST = process.env.API_HOST;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("As Anonymous User", () => {
    test("Retrieving pending migrations", async () => {
      const response = await fetch(`${API_HOST}/api/v1/migrations`);

      expect(Array.isArray(response)).toBe(true);
    });
  });
});
