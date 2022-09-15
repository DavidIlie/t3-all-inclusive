export { default } from "./src/auth";
export { appRouter } from "./src/api";
export { createContext } from "./src/api/context";

import prismaClient from "./src/prisma";
export const prisma = prismaClient;
