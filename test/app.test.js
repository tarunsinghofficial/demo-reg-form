const request = require("supertest");
const app = require("../app");

describe("User Registration API", () => {
  test("GET / should serve the registration form", async () => {
    const response = await request(app).get("/").expect(200);

    expect(response.text).toContain("User Registration");
  });

  test("GET /health should return system status", async () => {
    const response = await request(app).get("/health").expect(200);

    expect(response.body.status).toBe("OK");
    expect(response.body.usersCount).toBeDefined();
  });

  test("POST /register should create a new user with valid data", async () => {
    const userData = {
      fullName: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      age: 25,
      country: "us",
    };

    const response = await request(app)
      .post("/register")
      .send(userData)
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.userId).toBeDefined();
  });

  test("POST /register should reject invalid data", async () => {
    const invalidData = {
      fullName: "A", // Too short
      email: "invalid-email", // Invalid format
      phone: "123", // Too short
      age: 15, // Too young
      country: "select", // Not selected
    };

    const response = await request(app)
      .post("/register")
      .send(invalidData)
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.errors.length).toBeGreaterThan(0);
  });

  test("GET /users should return registered users list", async () => {
    const response = await request(app).get("/users").expect(200);

    expect(response.body.users).toBeDefined();
    expect(Array.isArray(response.body.users)).toBe(true);
  });
});
