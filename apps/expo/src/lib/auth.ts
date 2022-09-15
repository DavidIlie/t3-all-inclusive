import * as AuthSession from "expo-auth-session";
import { SigninResult, getSignInInfo } from "next-auth/expo";

import { nativeProviders, isValidProvider } from "@app/server";
import { getDiscoveryUrls } from "@app/server/src/auth/providers";

const socialLogin = async (
   baseProvider: keyof typeof nativeProviders
): Promise<SigninResult> => {
   const proxyRedirectUri = AuthSession.makeRedirectUri({ useProxy: true });

   let provider = isValidProvider(baseProvider)
      ? nativeProviders[baseProvider]
      : baseProvider;

   const signinInfo = await getSignInInfo({
      provider: provider,
      proxyRedirectUri,
   });

   if (!signinInfo) {
      throw new Error("Couldn't get sign in info from server");
   }

   const { state, codeChallenge, stateEncrypted, codeVerifier, clientId } =
      signinInfo;

   const request = new AuthSession.AuthRequest({
      clientId: clientId,
      scopes: ["identify", "email"],
      redirectUri: proxyRedirectUri,
      usePKCE: false,
   });

   const discovery = getDiscoveryUrls(baseProvider);

   request.state = state;
   request.codeChallenge = codeChallenge;
   await request.makeAuthUrlAsync(discovery);

   const result = await request.promptAsync(discovery, { useProxy: true });

   return {
      result,
      state,
      stateEncrypted,
      codeVerifier,
      provider,
   };
};

export default socialLogin;
