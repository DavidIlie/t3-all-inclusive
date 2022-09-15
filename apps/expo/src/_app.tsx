import { registerRootComponent } from "expo";
import { View, Text } from "react-native";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { transformer, trpc } from "./lib/trpc";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { SessionProvider, useSession } from "next-auth/expo";

import Main from "./views";
import { serverUrl } from "./lib/constants";

const InnerApp = () => {
   const [queryClient] = useState(() => new QueryClient());
   const [trpcClient] = useState(() =>
      trpc.createClient({
         url: `${serverUrl}/api/trpc`,
         async headers() {
            return {};
         },
         transformer,
      })
   );

   const { status } = useSession();

   return (
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
         <QueryClientProvider client={queryClient}>
            <SafeAreaProvider>
               {status === "loading" ? (
                  <View className="h-screen flex justify-center items-center">
                     <Text>Loading...</Text>
                  </View>
               ) : (
                  <Main />
               )}
               <StatusBar />
            </SafeAreaProvider>
         </QueryClientProvider>
      </trpc.Provider>
   );
};

const App = () => {
   return (
      <SessionProvider baseUrl={serverUrl}>
         <InnerApp />
      </SessionProvider>
   );
};

registerRootComponent(App);
