import { prisma } from "@/shared/lib/prisma";
import { User } from "../../../prisma/generated/client";

export async function createUser(data: { authId: string; username: string; email: string; image: string }): Promise<User> {
    try {
        return await prisma.user.create({ data });
    } catch (err) {
        throw err;
    }
}

export async function getUser(authId: string): Promise<User | null> {
    try {
        return await prisma.user.findUnique({ where: { authId } });
    } catch (err: any) {
        throw err;
    }
}
