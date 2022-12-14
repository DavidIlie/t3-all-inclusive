import NextAuth, { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import DiscordProvider from "next-auth/providers/discord";

import prisma from "../prisma";
import { isValidProvider, nativeProviders } from "./providers";

const adapter = PrismaAdapter(prisma);

export const authOptions: NextAuthOptions = {
   adapter,
   providers: [
      DiscordProvider({
         clientId: process.env.AUTH_DISCORD_CLIENT_ID as string,
         clientSecret: process.env.AUTH_DISCORD_CLIENT_SECRET as string,
      }),
      {
         ...DiscordProvider({
            name: "Discord Expo",
            checks: ["state"],
            clientId: process.env.AUTH_DISCORD_CLIENT_ID as string,
            clientSecret: process.env.AUTH_DISCORD_CLIENT_SECRET as string,
            token: {
               async request(context) {
                  const tokens = await context.client.oauthCallback(
                     process.env.NEXTAUTH_EXPO_URL,
                     context.params,
                     context.checks
                  );
                  return { tokens };
               },
            },
            id: nativeProviders.discord,
         }),
      },
   ],
   callbacks: {
      async signIn({ account }) {
         const userByAccount = await adapter.getUserByAccount({
            providerAccountId: account.providerAccountId,
            provider: account.provider,
         });
         if (!userByAccount) {
            const provider = account.provider;
            if (isValidProvider(provider)) {
               const counterpart = nativeProviders[provider];
               const userByAccount = await adapter.getUserByAccount({
                  providerAccountId: account.providerAccountId,
                  provider: counterpart,
               });
               if (userByAccount) {
                  await adapter.linkAccount({
                     ...account,
                     userId: userByAccount.id,
                  });
               }
            }
         }
         return true;
      },
   },
};

export default NextAuth(authOptions);
