declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      AUTH_DISCORD_CLIENT_ID: string;
      AUTH_DISCORD_CLIENT_SECRET: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      NEXTAUTH_EXPO_URL: string;
    }
  }
}

export {}
