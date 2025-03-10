import jwt from 'jsonwebtoken'
import { NextRequest } from 'next/server';

export async function verifyuser(req: NextRequest): Promise<{ userId: string, username: string } | null> {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return null;
    }

    const token = authHeader.slice(7);
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string);
        return payload as { userId: string, username: string }
    } catch (error) {
        console.log(error);
        return null;
    }


}
