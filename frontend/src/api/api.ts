import { contract } from "@api-contract";
import { initClient, tsRestFetchApi, type ApiFetcherArgs } from "@ts-rest/core";
import z from "zod";

export function getAuthToken() {
    const jwt = localStorage.getItem("jwt") ?? "";

    if (jwt !== null) {
        return `Bearer ${jwt}`;
    }

    return "";
}

export function getApiUrl() {
    switch (process.env.NODE_ENV) {
        case "production":
            return "https://api.fidelio.club";
        case "staging":
            return "https://api.staging.fidelio.club";
        case "development":
            return "http://localhost:8080";
    }
}

export const apiClient = initClient(contract, {
    baseUrl: getApiUrl(),
    baseHeaders: {
        authorization: () => getAuthToken(),
    },
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
