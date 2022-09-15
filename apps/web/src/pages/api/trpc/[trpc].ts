import * as trpcNext from "@trpc/server/adapters/next";

import { appRouter } from "@app/server/backend";
import { createContext } from "@app/server/backend";

const createNextApiHandler = trpcNext.createNextApiHandler({
   router: appRouter,
   createContext,
});

export default createNextApiHandler;
