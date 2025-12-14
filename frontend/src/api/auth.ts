import authContract from "@stelan/auth-contract";
import { initClient, tsRestFetchApi, type ApiFetcherArgs } from "@ts-rest/core";
import z from "zod";

export const authClient = initClient(authContract, {
    baseUrl: process.env.NODE_ENV === "development" ? "http://localhost:9090" : "https://auth.cinewhere.co.uk",
    api: async (args: ApiFetcherArgs) => {
        const response = (await tsRestFetchApi(args)) as any;

        if (response.status === 400 && response?.body?.name === "ValidationError") {
            throw new z.ZodError(response.body.issues);
        }

        if ((response.status < 200 || response.status > 299) && response?.body) {
            throw response.body;
        }

        return response;
    },
});
