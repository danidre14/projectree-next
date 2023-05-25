
import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { PrismaClient, User } from '@prisma/client';

import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from 'bcryptjs';

// import User from "@models/user";
// import { connectToDB } from "@utils/database";

// const prisma = new PrismaClient();
import prisma from "@prisma/context";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                name: { label: "Name", type: "text", placeholder: "username@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { name, password } = credentials;
                try {
                    const user = await prisma.user.findFirst({
                        where: {
                            OR: [
                                {
                                    username: name
                                },
                                {
                                    email: name
                                }
                            ]
                        },
                        select: {
                            id: true,
                            email: true,
                            password: true,
                            username: true
                        }
                    });
                    if (!user)
                        throw new Error("User does not exist");

                    const isPasswordValid = await bcrypt.compare(password, user.password);

                    if (!isPasswordValid)
                        throw new Error("Username or password incorrect");
                    const authedUser = { id: user.id, username: user.username, email: user.email };
                    return authedUser;
                } catch (err) {
                    console.error(err);
                    throw err
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.username = token.username;

            return session;
        },
        // async session({ session }) {
        //     const sessionUser = await User.findOne({
        //         email: session.user.email
        //     });

        //     session.user.id = sessionUser._id.toString();

        //     return session;
        // },
        // async signIn({ profile }) {
        //     try {
        //         // serverless -> lambda -> dynamodb
        //         await connectToDB();

        //         // check if a user already exists
        //         const userExists = await User.findOne({
        //             email: profile.email
        //         });

        //         // if not, create new user
        //         if (!userExists) {
        //             await User.create({
        //                 email: profile.email,
        //                 username: profile.name.replaceAll(" ", "").toLowerCase(),
        //                 image: profile.picture
        //             });
        //         }

        //         return true;
        //     } catch (error) {
        //         console.log(error);
        //         return false;
        //     }
        // },
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;
                token.id = user.id
                token.username = user.username;
            }
            return token
        }, async redirect({ url, baseUrl, ...rest }) {
            // Allows relative callback URLs
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
    pages: {
        signIn: "/",
        error: "/signin",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
    }
});

export { handler as GET, handler as POST };