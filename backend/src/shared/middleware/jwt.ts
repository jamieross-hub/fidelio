import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { defaultUserImage } from "../lib/firebase/storage";
import { EmailSenders, sendEmail } from "../emails";
import WelcomeEmail from "../emails/templates/onboarding/Welcome";
import { UnauthorisedError } from "@api-contract";
import { createUser, getUser } from "../../features/users";

export function authenticateJWT(request: Request, _response: Response, next: NextFunction): void {
    const token = request.headers.authorization?.split(" ")[1];

    try {
        if (!token) {
            throw new UnauthorisedError("No JWT provided");
        }

        jwt.verify(token, process.env.JWT_KEY as jwt.Secret, async (err, JWT) => {
            if (err) {
                throw new UnauthorisedError("Invalid JWT provided");
            }

            try {
                if (JWT && typeof JWT === "object") {
                    let user = await getUser(JWT.userId);

                    if (!user) {
                        user = await createUser({
                            authId: JWT.userId,
                            username: JWT.name,
                            email: JWT.email,
                            image: JWT.image || defaultUserImage,
                        });

                        const { html, subject } = WelcomeEmail({ name: user.username! });

                        sendEmail({
                            from: EmailSenders.NOREPLY,
                            to: user.email,
                            subject,
                            html,
                        });
                    }

                    request.user = user;
                }

                next();
            } catch (err) {
                next(err);
            }
        });
    } catch (error) {
        next(error);
    }
}
