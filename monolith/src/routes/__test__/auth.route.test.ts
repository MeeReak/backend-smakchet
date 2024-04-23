import request from "supertest";
import app from "../../app";
import { Auth } from "../../databases/models/auth.model";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongoServer: MongoMemoryServer | undefined;

// Before run testing
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

// after run testing
afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer?.stop();
});

describe("POST /sign-up", () => {
  afterEach(async () => {
    try {
      await Auth.deleteMany({});
    } catch (error) {
      console.error("Error during cleanup:", error);
      throw error;
    }
  });
  it("should return 400 if email is already in use", async () => {
    // Create a mock existing user in the in-memory database
    await Auth.create({ email: "existing@gmail.com" , isVerify : true});

    const userData = {
      email: "existing@gmail.com",
      role: "volunteer",
      username: "testuser",
      password: "password123",
    };

    const response = await request(app).post("/sign-up").send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Email already use , Please use another email",
    });
  });

  it("should create a new user and return 201 on successful sign-up", async () => {
    const userData = {
      email: "newuser@gmail.com",
      role: "volunteer",
      username: "newuser",
      password: "password123",
    };

    const response = await request(app).post("/sign-up").send(userData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
        message: "User created successfully. Verification email sent.",
        status: "success"
      });

    // Verify that the user was created in the in-memory database
    const createdUser = await Auth.findOne({ email: "newuser@gmail.com" });
    expect(createdUser).toBeTruthy();
  });

  it("should return 400 if user exists but is not verified", async () => {
    // Create a mock existing unverified user in the in-memory database
    await Auth.create({ email: "unverified@gmail.com", isVerify: false });

    const userData = {
      email: "unverified@gmail.com",
      role: "host",
      username: "testuser",
      password: "password123",
    };

    const response = await request(app).post("/sign-up").send(userData);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Please verify your email.",
    });
  });
});
