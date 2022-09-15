import { Text, View, Pressable } from "react-native";
import { useSession, signOut, signIn } from "next-auth/expo";

import { trpc } from "../lib/trpc";
import socialLogin from "../lib/auth";

const Home = () => {
   const { data: response } = trpc.useQuery(["test"]);
   const { status, data } = useSession();

   return (
      <View className="flex justify-center items-center h-full">
         <View className="mx-auto">
            <Text className="text-red-500 font-medium mb-2 text-center">
               {response}
            </Text>
            {status === "loading" ? (
               <Text>Loading</Text>
            ) : status === "unauthenticated" ? (
               <Pressable
                  className="mx-auto mt-2 bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md"
                  onPress={() => signIn(() => socialLogin("discord"))}
               >
                  <Text className="text-white font-medium">Log In</Text>
               </Pressable>
            ) : (
               <>
                  <Text>
                     You are currently logged in as{" "}
                     <Text className="text-red-500 font-medium">
                        {data?.user?.name}
                     </Text>
                  </Text>
                  <Pressable
                     className="mx-auto mt-2 bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-md"
                     onPress={signOut}
                  >
                     <Text className="text-white font-medium">Log Out</Text>
                  </Pressable>
               </>
            )}
         </View>
      </View>
   );
};

export default Home;
