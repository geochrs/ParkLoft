import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("Health Check API", () => {
  it("should return 200 and message", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Server is up and running!");
  });
});