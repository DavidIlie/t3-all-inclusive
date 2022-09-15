import type { NextPage } from "next";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import { trpc } from "@/lib/trpc";

const Hello: NextPage = () => {
   const { data } = trpc.useQuery(["test"]);
   const { data: authSession, status } = useSession();

   return (
      <div className="m-2">
         <code className="bg-gray-100 font-mono rounded-md p-1">{data}</code>
         <div className="mt-2">
            {status === "loading" ? (
               <div>Loading...</div>
            ) : status === "unauthenticated" ? (
               <button
                  onClick={() => signIn("discord")}
                  className="bg-blue-500 hover:bg-blue-600 py-2 px-1 rounded-md font-medium text-white duration-150"
               >
                  test discord auth
               </button>
            ) : (
               <div>
                  Logged in as:{" "}
                  <span className="font-medium text-red-500">
                     {authSession?.user?.name}
                  </span>
                  ,{" "}
                  <span
                     className="hover:underline cursor-pointer hover:text-blue-500 duration-150"
                     onClick={() => signOut()}
                  >
                     Log Out
                  </span>
               </div>
            )}
         </div>
      </div>
   );
};

export default Hello;
