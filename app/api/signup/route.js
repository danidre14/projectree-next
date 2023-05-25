// import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
// import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { makeString } from '@utils/helperUtils';

// const registerUserSchema = z.object({
//     username: z.string().regex(/^[a-z0-9_-]{3,15}$/g, 'Invalid username'),
//     password: z.string().min(5, 'Password should be minimum 5 characters'),
// });
// const prisma = new PrismaClient();
import prisma from "@prisma/context";

// export default async function registerUser(
//     req,
//     res
// ) {
//     const { username, password } = registerUserSchema.parse(req.body);
//     const user = await prisma.user.findUnique({
//         where: { username },
//     });

//     if (user !== null) {
//         return res.send({ user: null, message: 'User already exists' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = await prisma.user.create({
//         data: {
//             username,
//             password: hashedPassword,
//         },
//     });

//     return res.send({ user: newUser, message: 'User created successfully' });
// }

// import { connectToDB } from "@utils/database";

// import Prompt from "@models/prompt";

export const POST = async (req, res) => {
    let { firstName = "", lastName = "", username = "", email1 = "", email2 = "", password1 = "", password2 = "" } = await req.json();

    try {
        //         await connectToDB();
        //         const newPrompt = new Prompt({
        //             creator: userId,
        //             prompt,
        //             tag
        //         });

        //         await newPrompt.save();

        //         return new Response(JSON.stringify(newPrompt), { status: 201 });
        //     } catch (error) {
        //         console.log(error);
        //         return new Response("Failed to create a new prompt", { status: 500 });
        //     }
        // }

        // router.post("/signup", async (req, res) => {
        //     if (req.isAuthenticated()) {
        //         return {
        //             success: true,
        //             message: "User signed up.",
        //             lightReroute: "/dashboard"
        //         }
        //     }
        //     try {
        //         let { firstName = "", lastName = "", username = "", email1 = "", email2 = "", password1 = "", password2 = "" } = req.body;

        // validate information

        firstName = makeString(firstName);
        lastName = makeString(lastName);
        username = makeString(username).toLowerCase();
        email1 = makeString(email1).toLowerCase();
        email2 = makeString(email2).toLowerCase();
        password1 = makeString(password1);
        password2 = makeString(password2);

        let errorMessage = [];

        if (!firstName) {
            errorMessage.push("First name field required");
        }
        if (!lastName) {
            errorMessage.push("Last name field required");
        }

        if (!username) {
            errorMessage.push("Username field required");
        }
        if (username.length < 4 || username.length > 15) {
            errorMessage.push("Username must be 4-15 characters long");
        } else {
            if (username.charAt(0).match(/^[a-z]+$/ig) === null) {
                errorMessage.push("Username must start with a letter\n");
            } else if (username.match(/^[a-z][a-z\d]+$/ig) === null) {
                errorMessage.push("Symbols/Spaces not allowed in username");
            }
        }

        if (!email1 || !email2) {
            errorMessage.push("Email fields required");
        }

        if (!password1 || !password2) {
            errorMessage.push("Password fields required");
        }
        if (password1.length < 8) {
            errorMessage.push("Password must be 8 or more characters\n");
        }
        if (password1.search(/\d/) === -1) {
            errorMessage.push("Password must contain at least one number\n");
        }
        if (password1.search(/[A-Z]/) === -1) {
            errorMessage.push("Password must contain at least one uppercase letter\n");
        }

        if (email1 !== email2) {
            errorMessage.push("Emails do not match");
        }

        if (password1 !== password2) {
            errorMessage.push("Passwords do not match");
        }

        if (errorMessage.length) {
            return new Response(JSON.stringify({
                user: null,
                message: errorMessage.join("\n")
            }), { status: 201 });
        }

        // check user exists

        const userByUsername = await prisma.user.findFirst({
            where: {
                username
            }, select: {
                id: true,
            }
        });

        if (userByUsername) {
            return new Response(JSON.stringify({
                user: null,
                message: "Username already exists."
            }), { status: 201 });
        }

        const userByEmail = await prisma.user.findFirst({
            where: {
                email: email1
            }, select: {
                id: true,
            }
        });

        if (userByEmail) {
            return new Response(JSON.stringify({
                user: null,
                message: "Email already exists."
            }), { status: 201 });
        }

        // create user

        const hashedPassword = await bcrypt.hash(password1, 10);

        const user = await prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                email: email1,
                firstName,
                lastName
            }
        });

        return new Response(JSON.stringify({
            user: user,
            message: "Accout created successfully."
        }), { status: 201 });
    } catch (err) {
        console.error("Error creating user: ", err);
        return new Response("Failed to create an account.", { status: 500 });
    }
};