import { apiContract } from "@api-contract";
import type { AppRouteImplementationOrOptions, RouterImplementation } from "@ts-rest/express/src/lib/types";

type UserRouter = RouterImplementation<typeof apiContract.users>;

const validateJWT: UserRouter["validateJWT"] = async () => {
    return {
        status: 200,
        body: { msg: "Your JWT is valid" },
    };
};

const getUser: UserRouter["getUser"] = async ({ req }) => {
    return {
        status: 200,
        body: req.user!,
    };
};

export const userRouter: UserRouter = {
    validateJWT,
    getUser,
};
