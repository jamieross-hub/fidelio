import { UserModelSchema } from "@schemas/pure";
import { initContract } from "@ts-rest/core";
import z from "zod";

const contract = initContract();

export const userContract = contract.router({
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
