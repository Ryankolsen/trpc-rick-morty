// src/pages/api/trpc/[trpc].ts
import { inferProcedureOutput } from "@trpc/server";
import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "../../../env/server.mjs";
import { appRouter, AppRouter } from "../../../server/router";
import { createContext } from "../../../server/router/context";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
});

//added helper function to infer types from trpc
//format ------  type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">
// const PokemonListing: React.FC<{pokemon: PokemonFromServer}> = (props) => {return()}
export type inferQueryResponse<
  TRouteKey extends keyof AppRouter["_def"]["queries"]
> = inferProcedureOutput<AppRouter["_def"]["queries"][TRouteKey]>;
