import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import type { Session } from "next-auth";

// import prisma from "../prisma";
// import getServerAuthSession from "../auth/getAuthSession";

// type CreateContextOptions = {
//    session: Session | null;
// };

// export const createContextInner = async (opts: CreateContextOptions) => {
//    return {
//       session: opts.session,
//       prisma,
//    };
// };

export const createContext = async (
   opts: trpcNext.CreateNextContextOptions
) => {
   const { req, res } = opts;

   // const session = await getServerAuthSession({ req, res });

   // return await createContextInner({
   //    session,
   // });

   return {};

   // return {
   //    req,
   //    res,
   //    prisma,
   //    // session,
   // };
};

export const createRouter = () =>
   trpc.router<trpc.inferAsyncReturnType<typeof createContext>>();

// export function createProtectedRouter() {
//    return createRouter().middleware(({ ctx, next }) => {
//       if (!ctx.session || !ctx.session.user) {
//          throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
//       }
//       return next({
//          ctx: {
//             ...ctx,
//             session: { ...ctx.session, user: ctx.session.user },
//          },
//       });
//    });
// }
