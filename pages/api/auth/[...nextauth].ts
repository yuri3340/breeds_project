import { prisma } from "@/lib/prismaClient";
import { supabase } from "@/lib/supabaseClient";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialProvider({
            name: "Email & Password",
            credentials: {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password" }
            },

            async authorize(credentials) {
                const email = credentials?.email;
                const password = credentials?.password;

                if (!email || !password) {
                    throw new Error("Email and password are required");
                }

                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                });

                if (error || !data.user) {
                    throw new Error(error?.message || "Login failed");
                }

                return {
                    id: data.user.id,
                    email: data.user.email,
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (token?.sub) {
                session.user.id = token.sub;
            }

            const profile = await prisma.profiles.findUnique({
                where: { id: token.sub}
            })

            if (profile) {
                session.user.name = profile.name;
                session.user.phone = profile.phone;
            }

            return session;
        }
    },
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    }
}

export default NextAuth(authOptions);