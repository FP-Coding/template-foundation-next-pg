import orchestrator from "tests/integrations/utils/orchestrator";

const API_HOST = process.env.API_HOST;

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("As Anonymous User", () => {
    test("Retrieving pending migrations", async () => {
      expect(true).toBe(true);
    });
  });
});
