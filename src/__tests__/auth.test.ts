import { createMocks } from "node-mocks-http";
import { POST as loginHandler } from "../app/api/auth/route";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Mock Prisma
jest.mock("@prisma/client", () => {
  const mockUser = {
    id: "user-id",
    email: "user@example.com",
    password: bcrypt.hashSync("SenhaForte123", 10),
  };
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        findUnique: jest.fn(({ where: { email } }) => {
          if (email === mockUser.email) return Promise.resolve(mockUser);
          return Promise.resolve(null);
        }),
      },
    })),
  };
});

describe("🔐 Autenticação", () => {
  it("✅ Valida e-mail com formato válido", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: { email: "user@example.com", senha: "SenhaForte123" },
    });
    const response = await loginHandler(req);
    expect(response.status).toBe(200);
  });

  it("✅ Retorna erro com e-mail inválido", async () => {
    const { req } = createMocks({
      method: "POST",
      body: { email: "", senha: "SenhaForte123" },
    });
    const response = await loginHandler(req);
    expect(response.status).toBe(400);
  });

  it("✅ Compara senha e hash corretamente", async () => {
    const password = "SenhaForte123";
    const hashed = await bcrypt.hash(password, 10);
    const match = await bcrypt.compare(password, hashed);
    expect(match).toBe(true);
  });

  it("✅ Retorna erro se senha estiver errada", async () => {
    const { req } = createMocks({
      method: "POST",
      body: { email: "user@example.com", senha: "SenhaErrada" },
    });
    const response = await loginHandler(req);
    expect(response.status).toBe(401);
  });

  it("✅ Retorna erro se e-mail não existir", async () => {
    const { req } = createMocks({
      method: "POST",
      body: { email: "naoexiste@example.com", senha: "qualquer" },
    });
    const response = await loginHandler(req);
    expect(response.status).toBe(401);
  });
});
