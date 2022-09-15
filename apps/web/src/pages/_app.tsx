import { httpBatchLink } from "@trpc/client/links/httpBatchLink";
import { loggerLink } from "@trpc/client/links/loggerLink";
import { withTRPC } from "@trpc/next";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import type { AppRouter } from "@app/server";
import "../styles/globals.css";

const MyApp: AppType = ({
   Component,
   pageProps: { session, ...pageProps },
}) => {
   return (
      <SessionProvider session={session}>
         <Component {...pageProps} />
      </SessionProvider>
   );
};

export const getBaseUrl = () => {
   if (typeof window !== "undefined") return "";
   if (process.env.NEXT_PUBLIC_APP_URL)
      return `https://${process.env.NEXT_PUBLIC_APP_URL}`;
   return `http://localhost:${process.env.PORT ?? 3000}`;
};

export default withTRPC<AppRouter>({
   config() {
      const url = `${getBaseUrl()}/api/trpc`;
      return {
         links: [
            loggerLink({
               enabled: (opts) =>
                  process.env.NODE_ENV === "development" ||
                  (opts.direction === "down" && opts.result instanceof Error),
            }),
            httpBatchLink({ url }),
         ],
         url,
         transformer: superjson,
      };
   },
   ssr: false,
})(MyApp);
