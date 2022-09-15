import withTM from "next-transpile-modules";

/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
   return config;
}

export default withTM(["@app/server"])(
   defineNextConfig({
      reactStrictMode: true,
      swcMinify: true,
   })
);
