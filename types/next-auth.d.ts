import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string | null;
            name?: string | null;
            phone?: string | null;
        }
    }
}