import z from "zod";
import { UserModelSchema } from "@schemas/pure";
import { initContract } from "@ts-rest/core";

const client = initContract();

export const userContract = client.router({
    validateJWT: {
        method: "GET",
        path: "/validateJWT",
        summary: "Validate the current user's JWT",
        responses: {
            200: z.object({ msg: z.literal("Your JWT is valid") }),
        },
    },
    getUser: {
        method: "GET",
        path: "/user",
        summary: "Retrieve the current user's account",
        responses: {
            200: UserModelSchema.omit({ transactions: true }),
        },
    },
});
