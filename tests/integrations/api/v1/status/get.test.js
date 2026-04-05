const HOST = "http://localhost:3000";

describe("GET /api/v1/status", () => {
  describe("As Anonymous User", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch(`${HOST}/api/v1/status`);
      expect(response.status).toBe(200);

      const responseBody = await response.json();
      const { version, opened_connections, max_connections } =
        responseBody.dependencies.database;

      expect(responseBody.update_at).toBe(
        new Date(responseBody.update_at).toISOString(),
      );

      expect(typeof version).toBe("string");
      expect(version).toBe("16.0");

      expect(typeof opened_connections).toBe("number");
      expect(opened_connections).toBe(1);

      expect(typeof max_connections).toBe("number");
      expect(max_connections).toBe(100);
    });
  });
});
