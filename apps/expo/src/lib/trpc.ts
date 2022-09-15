import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "@app/server";
import type { inferProcedureOutput, inferProcedureInput } from "@trpc/server";
import superjson from "superjson";

export const trpc = createReactQueryHooks<AppRouter>();

export const transformer = superjson;

export type inferQueryOutput<
   TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;

export type inferQueryInput<
   TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureInput<AppRouter["_def"]["queries"][TRouteKey]>;

export type inferMutationOutput<
   TRouteKey extends keyof AppRouter["_def"]["mutations"]
> = inferProcedureOutput<AppRouter["_def"]["mutations"][TRouteKey]>;

export type inferMutationInput<
   TRouteKey extends keyof AppRouter["_def"]["mutations"]
> = inferProcedureInput<AppRouter["_def"]["mutations"][TRouteKey]>;

export type { AppRouter };
