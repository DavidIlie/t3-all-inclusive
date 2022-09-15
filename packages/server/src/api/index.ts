import superjson from "superjson";

import { createRouter } from "./context";

export const appRouter = createRouter()
   .transformer(superjson)
   .query("test", {
      resolve() {
         return "hello world from trpc world";
      },
   });

export type AppRouter = typeof appRouter;
