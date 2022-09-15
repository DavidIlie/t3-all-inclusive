export const nativeProviders = {
   discord: "discord-expo",
} as const;

export const isValidProvider = (
   k: string
): k is keyof typeof nativeProviders => {
   return k in nativeProviders;
};

export const nativeDiscoveryUrls = {
   discord: {
      authorizationEndpoint: "https://discord.com/api/oauth2/authorize",
      tokenEndpoint: "https://discord.com/api/oauth2/token",
      revocationEndpoint: "https://discord.com/api/oauth2/token/revoke",
   },
};

export const getDiscoveryUrls = (provider: keyof typeof nativeProviders) => {
   if (!isValidProvider(provider))
      throw new Error(
         `Could not find discovery for ${provider} or the provider provided is not correct. Have you typed it in correctly? If you need to add a provider discovery check 'packages/server/src/auth/providers.ts'`
      );
   return nativeDiscoveryUrls[provider];
};
