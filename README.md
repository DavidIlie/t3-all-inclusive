# t3-all-inclusive

Combination of [`create-t3-app`](https://create.t3.gg) and the recently created [`create-t3-turbo`](https://github.com/t3-oss/create-t3-turbo), but they don't have a project structure that I particularily like + it doesn't support NextAuth.js!

## About

This project is monorepo starter repo using [Turborepo](https://turborepo.org/) and contains:

```
apps
 |- expo
     |- Expo SDK 46
     |- React Native using React 18
     |- Tailwind using Nativewind
     |- Typesafe API calls using tRPC
     |- NextAuth.js (expo fixes added)
 |- next.js
     |- React 18
     |- TailwindCSS
     |- E2E Typesafe API Server & Client
     |- NextAuth.js
packages
 |- api
     |- tRPC router definitions
     |- Prisma instance
     |- NextAuth.js configuration + helper functions
patches - Contains patches for NextAuth.js to work with Expo
```

With all this mind, you can clone this repository and get started, read below for more guidance about how you can use this for yourself!

## NextAuth.js notes

All work for that needs to be awarded to [An Hoan](https://github.com/intagaming) and his excellent work with modifying NextAuth.js to support [Expo](https://github.com/intagaming/next-auth) where you can take a look at the `expo` folder to see what this does.

> Everything authentication related is at [`packages/server/auth`](https://github.com/DavidIlie/t3-all-inclusive/tree/master/packages/server/src/auth)

## Adding/modifying providers

The template provider used is Discord, but it can easily be changed with something else:

Before anything, you need to go to the [`packages/sever/auth/providers.ts`](https://github.com/davidilie/t3-all-inclusive/tree/master/packages/server/src/auth/providers.ts) file and modify a few constants:

-  First modify the `nativeProviders` variable to include your correct corresponding ID for the Expo counterpart (you will see how this works below, **use the Discord one as an example!!**)

```ts
export const nativeProviders = {
   discord: "discord-expo",
} as const;
```

-  Before creating the actual provider in the definition, you need to get the [oAuth discovery](https://www.oauth.com/oauth2-servers/indieauth/discovery/) URLs for your service, **use the Discord one as an example!!**:

```ts
export const nativeDiscoveryUrls = {
   discord: {
      authorizationEndpoint: "https://discord.com/api/oauth2/authorize",
      tokenEndpoint: "https://discord.com/api/oauth2/token",
      revocationEndpoint: "https://discord.com/api/oauth2/token/revoke",
   },
};
```

For any provider that you want to use both for the Next.JS application and the Expo application, you need to define two different instances of the same provider to work with the different redirect URLs needed:

```ts
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
```

> This could bring up account linking problems, [so a `signin` callback is used to fix it](https://github.com/davidilie/t3-all-inclusive/tree/master/packages/server/src/auth/index.ts#L38)

With all this done, you are able to use NextAuth.js as normal in your Expo and Next.js application with the same account/provider with the traditional functions that you are familiar with;

> WARNING: but except for importing from `next-auth/react` make sure to import from `next-auth/expo` when using it in the Expo application!!!

## Getting Started

Make sure to follow the NextAuth.js notes above for configured that part of this stack, but otherwise:

-  Make sure you copy the [`.env.template`](https://github.com/davidilie/t3-all-inclusive/tree/master/packages/server/env.template) from [`packages/server`](https://github.com/davidilie/t3-all-inclusive/tree/master/packages/server) to `packages/server/.env` and populate it with your values
   > If you want to change auth providers/add new ones, make sure to also edit [`packages/server/src/types/env.d.ts`](https://github.com/davidilie/t3-all-inclusive/tree/master/packages/server/src/types/env.d.ts) to reflect upon your type changes!
-  Make sure to modify the `dev` script in Expo ([`apps/expo`](https://github.com/davidilie/t3-all-inclusive/tree/master/apps/expo)) to match the platform you're using

```diff
// for IOS:
- "dev": "expo start",
+ "dev": "expo start --ios",

// for Android:
- "dev": "expo start",
+ "dev": "expo start --android",
```

## Feedback

I am very new with projects like these, so any problems that might arise, please create [an issue](https://github.com/davidilie/t3-all-inclusive/issues) and try and help if you can :)
